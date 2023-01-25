const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const session = require("express-session");
const passport = require("passport");
const passportLocalMongoose = require('passport-local-mongoose');

mongoose.connect('mongodb://127.0.0.1/usersDB',{ useNewUrlParser: true, useUnifiedTopology: true },function(err){
  if(err){
      console.log("NO DB");
  }
  else{
      console.log("DB");
  }
})
mongoose.set('strictQuery', false);

const userSchema = new mongoose.Schema({
    username : {
      type : String,
      required : true,
      // unique :true
    },
    email : {
      type : String,
      required : true,
      unique : true
    },
    password : {
      type :String,
      required : true
    }
  
  })
  userSchema.plugin(passportLocalMongoose);
var User = mongoose.model("User", userSchema);

module.exports = User;