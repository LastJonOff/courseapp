const mongoose = require('mongoose');
const config = require('../config/db');

 //create Schema
const CardSchema = mongoose.Schema({
  name: {
    type: String
  },
  title: {
    type: String,
  },
  imagesrc:{
    type: String
  },
  rating: {
    type: Number,
  }
});

const Card = module.exports = mongoose.model('Card', CardSchema); //export object based on userSchema

module.exports.getCardByname = function(name, callback){
  const query = {
    name: name
  };
  Card.findOne(query, callback); //finding card with name
};

module.exports.getCardByRating = function(rating, callback){
  const query = {
    rating: rating
  };
  User.findOne(rating, callback); //finding user with id
};

module.exports.addCard = function(newCard, callback){
    newCard.save(callback); //save card to db
};
