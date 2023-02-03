const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/rivews",function(err){
    if(err){
        console.log("no db");
    }
    else{
        console.log("db");
    }
});

const Schema= new mongoose.Schema({
    username : {
        type : String,
        unique : false
    },
    email : {
        type : String,
        unique : false
    },
    rivew : {
        type : String,
        unique : false
    }
});

const Rivew = mongoose.model("rivew",Schema);

module.exports = Rivew;