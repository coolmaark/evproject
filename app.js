const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _=require("lodash");
const { allowedNodeEnvironmentFlags } = require("process");

const app = express();
app.use( express.static('public'))
app.set('view engine', 'ejs');
//body passer
app.use(bodyParser.urlencoded({extended: true}));
//code starts
app.get("/",function(req,res){
  res.render("home");
}); 
app.get("/contactus",function(req,res){
  res.render("contactus");
  
  }); 
app.get("/login",function(req,res){
  res.render("login");
}); 
app.get("/book",function(req,res){
  res.render("book");
}); 
//code ends
app.listen(3000, function() {
  console.log("Server started on port 3000");
});