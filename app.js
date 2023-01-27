if (process.env.NODE_ENV !== "production") {
  require("dotenv").config()
}



const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _=require("lodash");
const bcrypt = require("bcrypt")
// var User = require("./lib/User");
const passport = require("passport")
const initializePassport = require("./passport-config")
const flash = require("express-flash")
const session = require("express-session")
const { allowedNodeEnvironmentFlags } = require("process");
const methodOverride = require("method-override");
initializePassport(
  passport,
  email => users.find(user => user.email === email),
  id => users.find(user => user.id === id)
  )


const users = []
const app = express();

app.use( express.static('public'))

app.set('view engine', 'ejs');
app.use(methodOverride("_method"))
//body passer
app.use(bodyParser.urlencoded({extended: true}));


app.use(flash())
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false, // We wont resave the session variable if nothing is changed
    saveUninitialized: false
}))
app.use(passport.initialize()) 
app.use(passport.session())
// app.use(methodOverride("_method"))

// Configuring the register post functionality
app.post("/login",checkNotAuthenticated, passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/register",
    failureFlash: true
}))



//code starts
app.get("/",checkAuthenticated, function(req,res){
  res.render("home",{name: req.user.name});
}); 

app.get("/contactus",checkAuthenticated ,function(req,res){
  res.render("contactus");
  
  }); 

  app.get("/login",checkNotAuthenticated , function(req,res){
  res.render("login");
}); 

app.get("/hyundai",function(req, res){
  res.render("hyundai");
});

app.get("/book",checkAuthenticated, function(req,res){
  res.render("book");
}); 

app.get("/register",checkNotAuthenticated, function(req,res){
  res.render("register");
}); 
app.get("/hy", function(req,res){
  res.render("hy");
});
app.get("/mg", function(req,res){
  res.render("mg");
});
app.get("/tata", function(req,res){
  res.render("tata");
});
app.get("/kia", function(req,res){
  res.render("kia");
});
app.get("/every",function(req,res){
  res.render("every");
});

app.post("/register",checkNotAuthenticated, async (req, res) => {

  try {
      const hashedPassword = await bcrypt.hash(req.body.password, 10)
      users.push({
          id: Date.now().toString(), 
          name: req.body.username,
          email: req.body.email,
          password: hashedPassword,
      })
      console.log(users); // Display newly registered in the console
      res.redirect("/login")
      
  } catch (e) {
      console.log(e);
      res.redirect("/register")
  }
})
//code ends

app.delete("/logout", (req, res) => {
  req.logout(req.user, err => {
      if (err) return next(err)
      res.redirect("/")
  })
})
function checkAuthenticated(req, res, next){
  if(req.isAuthenticated()){
      return next()
  }
  res.redirect("/login")
}

function checkNotAuthenticated(req, res, next){
  if(req.isAuthenticated()){
      return res.redirect("/")
  }
  next()
}

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
