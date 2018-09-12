'use_strict'    
var request = require("request");
config = require("../config");

module.exports = {
  serviceRecipe: function(param,callBack) {

    var options = { method: 'POST',
      url: config.api_svuotafrigo,
      qs: { page: '0' },
      headers: 
       { 'Postman-Token': '70f3cff9-d824-449f-b0cd-4d1db2f95afa',
         'Cache-Control': 'no-cache',
         'Content-Type': 'application/json',},
      formData: { ingredients: JSON.stringify(param) } };
    
      request(options, function (error, response, body) {
      if (error) throw new Error(error);
    
     callBack(body)
     
    });
  },

  serviceInspireMe: function() {
    request({
      url: config.api_inspireMe,
      method: 'GET',
      json : true,
    }, function(err, res, body) {
      console.log(body);
    });;
  }
}
