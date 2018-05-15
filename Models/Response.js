'use strict';

module.exports = {
  ModalResponse: function() {
    var json = '{"responseId":"4330de0f-f720-4ba3-bfee-ae950635322c","queryResult":{"queryText":"welcome","parameters":{},"allRequiredParamsPresent":true,"fulfillmentText":"cosa posso fare per te?","fulfillmentMessages":[{"text":{"text":["cosa posso fare per te?"]}}],"intent":{"name":"projects/samantha-185316/agent/intents/0ffc7566-65ec-479f-bf36-8b44914cea90","displayName":"Benvenuta"},"intentDetectionConfidence":1,"diagnosticInfo":{},"languageCode":"it"}}';
    return JSON.parse(json);
  }
}
