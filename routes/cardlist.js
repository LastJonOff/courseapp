const express = require( 'express');
const router = express.Router();
const Card = require('../models/card');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/db');

router.post('/add', (req, res) =>{ //urls listen
  let newCard = new Card({
    name: req.body.name,
    title: req.body.title,
    imagesrc: req.body.imagesrc,
    rating: req.body.rating,
  });
  Card.addCard(newCard, (err, user) => {
    if(err){
      res.json({success: false, msg: "Ошибка в добавлении карты"});
    } else{
      res.json({success: true, msg: "Карта добавлена"});
    }
  });
});

router.post('/', (req, res) =>{
  Card.find({},[],{ sort: { _id: -1 } },(err, doc) => {
    if(err) throw err;
    return res.status(200).json({
      status: 'success',
      data: doc
    });
  });
});

router.post('/update', (req, res) =>{ //urls listen
//  let newCard = new Card({
//    name: req.body.name,
//    title: req.body.title,
//    imagesrc: req.body.imagesrc,
//    rating: req.body.rating,
//  });
  console.log(req.body);
  Card.updateOne({_id: req.body.id_card}, {
    name: req.body.name,
    title: req.body.title,
    imagesrc: req.body.imagesrc,
    rating: req.body.rating,
  }, (err, user) => {
    if(err){
      res.json({success: false, msg: "Ошибка в изменении карты"});
    } else{
      res.json({success: true, msg: "Карта изменена"});
    }
  });
});

router.post('/getcard', (req, res) =>{
  Card.findOne({_id: req.body.id },(err, card) => {
    if(err) throw err;
    return res.status(200).json({
      status: 'success',
      data: card
    });
  });
});

router.delete('/delete', (req, res) =>{
  //Card.remove({_id: {$eq: req.body.id}});
  Card.getCardById(req.body.id, (err, card) => {
    if (err) throw err;
    if (!card){
      return res.json({success: false, msg: "Такая карта была не найдена"});
    } else{
      Card.deleteCard(req.body.id, (err, result) => {
        if (err) throw err;
        return res.json({success: true, msg: "Карта успешно удалена"});
      });
    }
  });
});


module.exports = router; //export to other files
