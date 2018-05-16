'use strict';
var mongoose = require('mongoose');
Pantry = require('../Models/Pantry');
Pantry = require('../Models/PantryHome');
Pantry = require('../Models/PantryFreezer');
Pantry = require('../Models/PantryFridge');

var Pantry = mongoose.model('Pantry');


//https://cloud.google.com/dialogflow-enterprise/docs/reference/rest/v2beta1/WebhookResponse

module.exports = {
    getFood: function(req,res) {
      return res.json({
          fulfillmentText: 'Verifico cosa puoi',
      });
    },
    insertFood: function(req,response) {
      let param = req.body.queryResult.parameters;

      switch(param.where) {
        case "home":
          insertIntoHome(param.what,param.qty);
          break;
        case "freezer":
          insertToFreezer(param.what,param.qty);
          break;
        case "fridge":
          insertToFridge(param.what,param.qty);
          break;
        default:
          insertToPantry(param.what,param.qty);
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
    reply(error);
}

function insertToFreezer(what,qty) {
    var error = false

    var pantry = new PantryFreezer({
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
    reply(error);
}

function insertToFridge(what,qty) {
    var error = false

    var pantry = new PantryFridge({
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
    reply(error);
}

function insertToPantry(what,qty) {
    var error = false

    var pantry = new Pantry({
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
    reply(error);
}

function reply(error) {
    if(error) {
      console.log(error);
      return response.json({
          fulfillmentText: 'Si è verificato un errore'
      });
    } else {
      return {
          fulfillmentText: 'Bene ho salvato '+what
      };
    }

  }
}
