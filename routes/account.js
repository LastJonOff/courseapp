const express = require( 'express');
const router = express.Router();
const User = require('../models/user');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/db');
//router.get('/reg', (req, res) =>{ //urls listen
//  res.send('Страница регистрации!!'); //sending answer to browser
//});

router.post('/reg', (req, res) =>{ //urls listen
  let newUser = new User({
    name: req.body.name,
    email: req.body.email,
    login: req.body.login,
    password: req.body.password,
  });
  User.addUser(newUser, (err, user) => {
    if(err){
      res.json({success: false, msg: "Пользователь не добавлен"});
    } else{
      res.json({success: true, msg: "Пользователь был добавлен"});
    }
  });
});

router.post('/auth', (req, res) =>{ //urls listen
  const login = req.body.login;
  const password = req.body.password;

  User.getUserByLogin(login, (err, user) =>{
    if (err) throw err;
    if (!user){
      return res.json({success: false, msg: "Такой пользователь был не найден"});
    }
    User.comparePass(password, user.password, (err, isMatch) => {
      if (err) throw err;
      if (isMatch){
        const token = jwt.sign(user.toJSON(), config.secret, {
          expiresIn: 3600 * 24//time to disconnect user
        });
        res.json({
          success: true,
          token: "JWT" + token,
          user: {
            id: user._id,
            name: user.name,
            login: user.login,
            email: user.email
          }
        });
      }else{
        return res.json({success: false, msg: "Пароли не совпадают"});
      }
    });
  });
});

router.get('/dashboard', passport.authenticate('jwt', {session: false}), (req, res) =>{ //urls listen
  res.send('Кабинет пользователя!!'); //sending answer to browser
});

module.exports = router; //export to other files
