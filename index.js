const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const path = require('path');
const config = require('./config/db');
const account = require('./routes/account');

const app = express(); //app

const port = process.env.PORT || 8080 ; //port

app.use(passport.initialize());//initialize passport
app.use(passport.session());

require('./config/passport')(passport);

app.use(cors()); //connect to other sites (vk or anything else)

app.use(bodyParser.json()); //data from forms in json formst

app.use(express.static(path.join(__dirname, 'public')));//static folder

mongoose.connect(config.db, { useNewUrlParser: true ,useUnifiedTopology: true });//connecting to db

mongoose.connection.on('connected', () =>{  //success connect to db
  console.log("Мы успешно подключились к БД");
});

mongoose.connection.on('error', (err) =>{
  console.log("Мы не подключились к БД " + err);
});

app.get('/', (req, res) =>{ //urls listen
  res.send('Главная страница сайта!!'); //sending answer to browser
});

app.use('/account',  account);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
})

app.listen(port, () => { //listen server
  console.log("Сервер был запущен по порту: ", port);
})
