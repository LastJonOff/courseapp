const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/db');

 //create Schema
const UserSchema = mongoose.Schema({
  name: {
    type: String
  },
  email: {
    type: String,
    required: true
  },
  login: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

const User = module.exports = mongoose.model('User', UserSchema); //export object based on userSchema

module.exports.getUserByLogin = function(login, callback){
  const query = {
    login: login
  };
  User.findOne(query, callback); //finding user with login
};

module.exports.getUserById = function(id, callback){
  User.findById(id, callback); //finding user with id
};

module.exports.addUser = function(newUser, callback){
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(newUser.password, salt, (err, hash) =>{
      if (err) throw err;
      newUser.password = hash; //hash password
      newUser.save(callback); //save user to db
    });
  });
};

module.exports.comparePass = function(passFromUser, userDBPass, callback){
  bcrypt.compare(passFromUser, userDBPass, (err, isMatch) => {
    if (err) throw err;
    callback(null, isMatch);//return result
  });
};
