const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://user:Ynbf9984@cluster0.hkpddu2.mongodb.net/rivews?retryWrites=true&w=majority",function(err){
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
