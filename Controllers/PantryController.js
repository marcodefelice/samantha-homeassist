'use strict';
var mongoose = require('mongoose'),
Pantry = require('../Models/Pantry'),
PantryHome = require('../Models/PantryHome'),
PantryFreezer = require('../Models/PantryFreezer'),
PantryFridge = require('../Models/PantryFridge');

var Pantry = mongoose.model('Pantry');


//https://cloud.google.com/dialogflow-enterprise/docs/reference/rest/v2beta1/WebhookResponse

module.exports = {
    insertFood: function(req,response) {
      let param = req.body.queryResult.parameters;

      switch(param.where) {
        case "home":
          return insertToHome(param.what,param.number);
          break;
        case "freezer":
          return insertToFreezer(param.what,param.number);
          break;
        case "fridge":
          return insertToFridge(param.what,param.number);
          break;
        default:
          return insertToPantry(param.what,param.number);
          break;
      }
    }
}

function insertToHome(what,qty) {
    var error = false

    var pantry = new PantryHome({
      element: what,
      location: "home",
      insertdate: new Date(),
      quantity: qty
    });

    //save
    pantry.save(function(err,res) {
      if (err) {
        error = true;
        console.log(err);
      } else {
        error = false;
        console.log(res);
      }
    });

    //return a response
    return reply(error,what,"casa da qualche parte");
}

function insertToFreezer(what,qty) {
    var error = false

    var pantry = new PantryFreezer({
      element: what,
      location: "freezer",
      insertdate: new Date(),
      quantity: qty
    });

    //save
    pantry.save(function(err,res) {
      if (err) {
        error = true;
        console.log(err);
      } else {
        error = false;
        console.log(res);
      }
    });

    //return a response
    return reply(error,what,"freezer");
}

function insertToFridge(what,qty) {
    var error = false

    var pantry = new PantryFridge({
      element: what,
      location: "fridge",
      insertdate: new Date(),
      quantity: qty
    });

    //save
    pantry.save(function(err,res) {
      if (err) {
        error = true;
        console.log(err);
      } else {
        error = false;
        console.log(res);
      }
    });

    //return a response
    return reply(error,what,"frigo");
}

function insertToPantry(what,qty) {
    var error = false

    var pantry = new Pantry({
      element: what,
      location: "pantry",
      insertdate: new Date(),
      quantity: qty
    });

    //save
    pantry.save(function(err,res) {
      if (err) {
        error = true;
        console.log(err);
      } else {
        error = false;
        console.log(res);
      }
    });

    //return a response
    return reply(error,what,"cantina");
}

function reply(error,what,where) {
    if(error) {
      console.log(error);
      return response.json({
          fulfillmentText: 'Si è verificato un errore'
      });
    } else {
      return {
          fulfillmentText: 'Bene ho salvato '+what+' in '+where
      };
    }

  }
