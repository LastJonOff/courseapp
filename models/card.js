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

module.exports.getCardByName = function(name, callback){
  const query = {
    name: name
  };
  Card.findOne(query, callback); //finding card with name
};

module.exports.getCardByRating = function(rating, callback){
  const query = {
    rating: rating
  };
  Card.find({rating: {$eq : rating}}, callback); //finding card with rating
};

module.exports.getCardById = function(id, callback){
  Card.findById(id, callback); //finding user with id
};

module.exports.addCard = function(newCard, callback){
    newCard.save(callback); //save card to db
};
module.exports.deleteCard = function(id, callback){
  Card.remove({_id: id},callback); //delete card from db
};
