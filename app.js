//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _=require("lodash");

const app = express();
app.use( express.static('images'))
app.set('view engine', 'ejs');
//body passer
app.use(bodyParser.urlencoded({extended: true}));
// app.use(express.static("public"));
//code starts
app.get("/",function(req,res){
  res.render("home");
}); 
//code ends
app.listen(3000, function() {
  console.log("Server started on port 3000");
});