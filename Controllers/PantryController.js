'use strict';
var mongoose = require('mongoose');

//https://cloud.google.com/dialogflow-enterprise/docs/reference/rest/v2beta1/WebhookResponse

module.exports = {
    getFood: function(req,res) {
      return res.json({
          fulfillmentText: 'Verifico',
      });
    }
}
