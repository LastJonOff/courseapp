const express = require( 'express');
const router = express.Router();
const User = require('../models/user');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/db');
router.get('/cardlist', (req, res) =>{ //urls listen
  res.send('Страница регистрации!!'); //sending answer to browser
});


module.exports = router; //export to other files
