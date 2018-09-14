'use strict';
var mongoose = require('mongoose'),
serviceRecipe = require('../Services/RecipesServices');

module.exports = {
    getRecipe: function(req,res) {
        getRecipe(req,res)
    }
}

function getRecipe(req,response) {
    if(req.queryResult.parameters.ingredients) {
      serviceRecipe.serviceRecipe([
          "uova sode","patate","piselli"
        ], function(res,reply) {
            var res = JSON.parse(res)
          if(res.status == 0) {
              var string = 'Ecco cosa ho trovato:'
              var x = 0
                  string += res.results[x].nome
                       + ' Difficoltà '+ res.results[x].difficolta
                       + ' Tempo di preparazione ' + res.results[x].tempoPreparazione
                       + ' Tempo di preparazione ' + res.results[x].difficolta
                       + ' Link della ricetta ' + res.results[x].url;

              response.json({
                  fulfillmentText: "In totale ho trovato "+ res.results.length +" ricette, ecco la prima",
                  fulfillmentMessages: [{
                    text : {
                      text : [string]
                    },
                  }]
              });

          } else {
              response.json({
                  fulfillmentText: 'Si è verificato un errore'
              });
          }
        });
    } else {
      serviceRecipe.serviceInspireMe(
          function(res,reply) {
            var res = JSON.parse(res)
            if(res.status == 0) {
              var string = "Cosa ne pensi di preparare " + res.results.nome
              response.json({
                  fulfillmentText: string
              });
            } else {
                response.json({
                    fulfillmentText: 'Si è verificato un errore'
                });
            }
        });
    }
}
