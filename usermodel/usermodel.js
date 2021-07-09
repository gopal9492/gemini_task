const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const userSchema= new Schema({
    firstname: {
      type: String,
     
    },
    lastname: {
      type: String,
     
    },
    email: {
      type: String,
      required: true,

    },
    password: {
      type: String,
  
    },
    deviceid :{
      type:String,
    },
    appid:{
      type:String,
    },
    referid:{
        type: String,
    },
    referredby:{
        type:String,
    }

 },
 {
   versionKey: false
 });
  
  module.exports = mongoose.model("referal", userSchema);