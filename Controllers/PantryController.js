'use strict';
var mongoose = require('mongoose'),
Pantry = require('../Models/Pantry'),
PantryHome = require('../Models/PantryHome'),
PantryFreezer = require('../Models/PantryFreezer'),
PantryFridge = require('../Models/PantryFridge');

function insert(db,what,qty,where) {
    var error = false

    var pantry = new db({
      element: what,
      location: "home",
      insertdate: new Date(),
      quantity: qty
    });

    find(db,what,function(resp) {

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
    return reply(error,what,where);
}
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

      let action = param.action

      switch(param.where) {
        case "casa":
          if(action == "rimuovi") {
            return delete(param.what,PantryHome);
          }
          return insert(PantryHome,param.what,param.number,param.where);
          break;
        case "freezer":
          if(action == "rimuovi") {
            return delete(param.what,PantryFreezer);
          }
          return insert(PantryFreezer,param.what,param.number,param.where);
          break;
        case "frigo":
          if(action == "rimuovi") {
            return remove(param.what,PantryFridge);
          }
          return insert(PantryFridge,param.what,param.number,param.where);
          break;
        default:
          return insert(Pantry,param.what,param.number,param.where);
          break;
      }
    }
}

function insert(db,what,qty,where) {
    var error = false

    var pantry = new db({
      element: what,
      location: "home",
      insertdate: new Date(),
      quantity: qty
    });

    find(db,what,function(resp) {

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
    return reply(error,what,where);
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

function remove(what,db) {
    db.find({ element: what }, function(err, result) {
      if (err) throw err;
      // delete him
      user.remove(function(err) {
        if (err) throw err;
        console.log(result);
      });
    });
}
