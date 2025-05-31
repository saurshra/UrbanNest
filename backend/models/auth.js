const mongoose = require('mongoose');

const authSchema = new mongoose.Schema({
  name:{
    type:String,
    required:true
  },
  email:{
    type:String,
    required:true,
    unique:true
  },
  password:{
    type:String,
    required:true
  }
})

const Auth = mongoose.model('auths',authSchema);
module.exports = Auth;