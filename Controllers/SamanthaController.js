'use strict';
var pantry = require('./PantryController'),
recipe = require('./RecipesController');

//https://cloud.google.com/dialogflow-enterprise/docs/reference/rest/v2beta1/WebhookResponse

exports.processRequest = function(req, res) {
console.info("Welcome to Samantha");
console.info("Calling action: "+req.body.queryResult.action);

switch(req.body.queryResult.action) {
  case "food":
    pantry.getFood(req,res);
    break;
  case "recipe":
  recipe.getRecipe(req,res);
  return res
    break;
  case "insertpantry":
    var response = pantry.insertFood(req);
    break;
  case "checkpantry":
    var response = pantry.checkpantry(req);
    break;
  default:
    console.error("Could not finde any action with name: "+req.body.queryResult.action);
    return res.json({
        fulfillmentText: 'Mi dispiace in questo momento non riesco ad aiutarti'
    });
    break;
  };

  return res.json(response);
}
