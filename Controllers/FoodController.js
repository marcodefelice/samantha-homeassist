'use strict';
var mongoose = require('mongoose'),
Pantry = require('../Models/Pantry'),
PantryHome = require('../Models/PantryHome'),
PantryFreezer = require('../Models/PantryFreezer'),
PantryFridge = require('../Models/PantryFridge');

var Pantry = mongoose.model('Pantry');
var PantryHome = mongoose.model('PantryHome');
var PantryFreezer = mongoose.model('PantryFreezer');
var PantryFridge = mongoose.model('PantryFridge');

module.exports = {
  whatEat: function(req,res) {
    return whatCanIEat();
  },
  getFood: function(req,res) {
    return res.json({
        fulfillmentText: 'Verifico cosa puoi',
    });
  },
  whatDrink: function(req,res) {
    return whatCanIDrink();
  },
}

function whatCanIEat(req) {
  let param = req.body.queryResult.parameters;
  var info = getInformation("fridge");
}

function whatCanIDrink(req){
  let param = req.body.queryResult.parameters;
  getInformation(Pantry,param.what);

}

function getInformation(db,what) {
  var result = db.find({emelemt:what});
  console.log(result)
}
