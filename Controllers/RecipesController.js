'use strict';
var mongoose = require('mongoose'),
serviceRecipe = require('../Services/RecipesServices');

module.exports = {
    getRecipe: function(req,res) {
        getRecipe(req,res)
    }
}

function getRecipe(req,response) {
    var request = serviceRecipe.serviceRecipe([
        "uova sode","patate","piselli"
      ], function(res,reply) {
          var res = JSON.parse(res)
        if(res.status == 0) {
            var string = 'Ecco cosa ho trovato:'

            //todo: implementare ricette successive se questa non va bene
            // verrà passato un paramentro +1 per recuperare la ricetta successiva
            var x = 0
                string += res.results[x].nome
                     + ' Difficoltà '+ res.results[x].difficolta
                     + ' Tempo di preparazione ' + res.results[x].tempoPreparazione
                     + ' Tempo di preparazione ' + res.results[x].difficolta
                     + ' Link della ricetta ' + res.results[x].url;

            response.json({
                fulfillmentText: "In totale ho trovato "+ res.results.length +" ricette",
                fulfillmentMessages: {
                  text : [
                    string
                  ],
                }
                imgae: {
                  imageUri : [
                    res.results[x].urlImage
                  ],
                }
            });

        } else {

            response.json({
                fulfillmentText: 'Si è verificato un errore'
            });
        }
      });


}
