var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var PantryFreezer = new Schema({
insertdate:{
 type:Date,
 required:true
},
element:{
 type:String,
 required:true
},
expireddate:{
 type:String,
 required:false
},
location: {
  type: String,
  required:true
},
numberelements: {
  type: Number,
  required:false,
  default:1
}
});
module.exports = mongoose.model('PantryFreezer', PantryFreezer);
