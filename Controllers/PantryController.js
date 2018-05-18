'use strict';
var mongoose = require('mongoose'),
Pantry = require('../Models/Pantry'),
PantryHome = require('../Models/PantryHome'),
PantryFreezer = require('../Models/PantryFreezer'),
PantryFridge = require('../Models/PantryFridge');

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

      if(param.number == "un") {
        param.number = 1;
      }

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
          return insertToPantry(param.what,param.number,param.where);
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

    find(PantryHome,what,function(resp) {

      if(resp.result) {
        var numbers = parseInt(qty) + parseInt(resp.qty)
        var query = { _id: resp._id }
        pantry.update(
          query,
          {quantity: numbers},
          null,
          null
        )
      } else {
        pantry.save(function(err,res) {
          if (err) {
            error = true;
            console.log(err);
          } else {
            error = false;
            console.log(res);
          }
        });
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

    find(PantryFreezer,what,function(resp) {

      if(resp.result) {
        var numbers = parseInt(qty) + parseInt(resp.qty)
        var query = { _id: resp._id }
        pantry.update(
          query,
          {quantity: numbers},
          null,
          null
        )
      } else {
        pantry.save(function(err,res) {
          if (err) {
            error = true;
            console.log(err);
          } else {
            error = false;
            console.log(res);
          }
        });
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
    find(PantryFridge,what,function(resp) {

      if(resp.result) {
        var numbers = parseInt(qty) + parseInt(resp.qty)
        var query = { _id: resp._id }
        pantry.update(
          query,
          {quantity: numbers},
          null,
          null
        )
      } else {
        pantry.save(function(err,res) {
          if (err) {
            error = true;
            console.log(err);
          } else {
            error = false;
            console.log(res);
          }
        });
      }

    });

    //return a response
    return reply(error,what,"frigo");
}

function insertToPantry(what,qty,where) {
    var error = false

    var pantry = new Pantry({
      element: what,
      location: where,
      insertdate: new Date(),
      quantity: qty
    });

    find(Pantry,what,function(resp) {

      if(resp.result) {
        var numbers = parseInt(qty) + parseInt(resp.qty)
        var query = { _id: resp._id }
        pantry.update(
          query,
          {quantity: numbers},
          null,
          null
        )
      } else {
        pantry.save(function(err,res) {
          if (err) {
            error = true;
            console.log(err);
          } else {
            error = false;
            console.log(res);
          }
        });
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

  function find(db,what,callback) {
    var qty = 0;
    var result = false;
    db.findOne({ element: what })
        .select('quantity')
        .exec(function(err, txs) {
              if(txs.length != 0) {
              qty = txs.quantity;
              result = true;
            } else {
              result = false;
            }

            var response = {
              result: result,
              qty: qty,
              _id: txs._id
            }

            callback(response);

        });
  }

  function remove(db,what) {
      db.find({ element: what }, function(err, result) {
        if (err) throw err;

        // delete him
        user.remove(function(err) {
          if (err) throw err;

          console.log(result);
        });
      });
  }
