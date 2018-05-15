'use strict';
var pantry = require('./PantryController');

//https://cloud.google.com/dialogflow-enterprise/docs/reference/rest/v2beta1/WebhookResponse

exports.processRequest = function(req, res) {
if (req.body.queryResult.action == "food") {
    pantry.getFood(req,res);
  }
};
