'use strict';
var mongoose = require('mongoose');
var Pantry = mongoose.model('Pantry');


//https://cloud.google.com/dialogflow-enterprise/docs/reference/rest/v2beta1/WebhookResponse

module.exports = {
    getFood: function(req,res) {
      return res.json({
          fulfillmentText: 'Verifico cosa puoi',
      });
    },
    insertFood: function(req,response) {
      let ObjectID = mongoose.ObjectID;
      let param = req.body.queryResult.parameters;

      mongoose.set('debug', true)

      var pantry = new Pantry({
        element: param.what,
        location: param.where,
        insertdate: new Date()
      });


      var error = false

      pantry.save(function(err,res) {
        if (err) {
          error = true;
          console.log(err);
        } else {
          error = false;
          console.log(res);
        }
      });

      if(error) {
        console.log(error);
        return response.json({
            fulfillmentText: 'Si è verificato un errore'
        });
      } else {
        console.log('Saved successfully! ( pantry )');
        return {
            fulfillmentText: 'Bene ho messo '+param.what+' in '+param.where
        };
      }

    }

}
