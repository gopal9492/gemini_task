const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const userSchema= new Schema({
    uId:{
      type:String,
      default:""
    },
    firstname: {
      type: String,
      default:""
    },
    lastname: {
      type: String,
     default:""
    },
    email: {
      type: String,
      required: true,

    },
    password: {
      type: String,
      default:""
    },
    deviceid :{
      type:String,
      default:""
    },
    appid:{
      type:String,
      default:""
    },
    referid:{
        type: String,
        default:""
    },
    referredby:{
        type:String,
        default:""
    }

 },
 {
   versionKey: false
 });
  
  module.exports = mongoose.model("referal", userSchema);