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

    findOne(db,what,function(resp) {

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
            console.error(err);
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
    checkpantry: function(req,res) {
      let param = req.body.queryResult.parameters;
      return checkPantryFunc(req,param);

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

    findOne(db,what,function(resp) {

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
            console.error(err);
          } else {
            error = false;
            console.log(res);
          }
        });
      }

    });

    //return a response
    return reply(error,what,where,'Bene ho salvato ');
}

function reply(error,what,where,reply) {
  if(error) {
    console.log("error:",error);
    return {
        fulfillmentText: 'Si è verificato un errore'
    };
  } else {
    console.log("REPLY:",reply+' '+what+' in '+where)
    return {
        fulfillmentText: reply+' '+what+' in '+where
    };
  }

}

function findOne(db,what,callback) {
  var qty = 0;
  var result = false;
  db.findOne({ element: what })
      .select('quantity')
      .exec(function(err, txs) {
          if(txs != null) {
            qty = txs.quantity;
            result = true;
            var response = {
              result: result,
              qty: qty,
              _id: txs._id
            }
          } else {
            var response = {
              result: result
            }
            result = false;
          }

          return callback(response);

      });
}

function remove(what,db) {
    db.findOne({ element: what }, function(err, result) {
      if (err) throw err;
      // delete him
      user.remove(function(err) {
        if (err) throw err;
      });
    });
}

/**
/ start funcion for checkPantryFunc
**/

function checkPantryFunc(req,p) {
  var response = 'Non ho trovato '+p.what
  var result = false;
  var dbObj = [Pantry,PantryHome,PantryFridge,PantryFreezer]
  var where = ["cantina","casa","frigo","freezer"]

  var qui = Pantry.findOne({element:p.what}).select('quantity').exec()
  qui.then(function(txs) {
    console.log(txs)
  })

  /*for(var x = 0; x < dbObj.length; x++) {
    findOne(dbObj[0],p.what, function(res) {
      if(res.result) {
          response = 'Hai '+ res.qty + ' di '+ p.what
          result = true
          reply(false,p.what,where[0],'Ho trovato '+p.qty)
          x = 5
      }
    })
  }*/
}
