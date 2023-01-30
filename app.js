require("dotenv").config()
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _=require("lodash");
const bcrypt = require("bcrypt")
const Rivew = require("./lib/rivews");
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
);

//DB
const users = []
const app = express();
app.use( express.static('public'))
app.set('view engine', 'ejs');
app.use(methodOverride("_method"))
app.use(flash())
app.use(bodyParser.urlencoded({extended: true}));
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize()); 
app.use(passport.session());


//for title case
function sentenceCase (str) {
  if ((str===null) || (str===''))
      return false;
  else
  str = str.toString();
  return str.replace(/\w\S*/g,
  function(txt){return txt.charAt(0).toUpperCase() +
      txt.substr(1).toLowerCase();});
}

//getting routes
app.get("/",checkAuthenticated, function(req,res){res.render("home",{name: sentenceCase(req.user.name)});}); 

app.get("/contactus",checkAuthenticated ,function(req,res){res.render("contactus");}); 

app.get("/login",checkNotAuthenticated , function(req,res){res.render("login");}); 

app.get("/book",checkAuthenticated, function(req,res){res.render("every");}); 

app.get("/register",checkNotAuthenticated, function(req,res){res.render("register");});

app.get("/hyundai", function(req,res){res.render("hyundai");});

app.get("/morrisgarages",checkAuthenticated, function(req,res){res.render("morrisgarages");});

app.get("/tata",checkAuthenticated, function(req,res){res.render("tata");});

app.get("/kia",checkAuthenticated, function(req,res){res.render("kia");});

app.get("/rivews",checkAuthenticated, function(req, res){res.render("rivews");});
app.get("/mercedes",checkAuthenticated, function(req, res){res.render("mercedes");});
app.get("/bmw",checkAuthenticated, function(req, res){res.render("bmw");});

app.get("/thankyou",checkAuthenticated, function(req, res){res.render("thankyou");});
//getting routes ends here

//posting routes
app.post("/login",checkNotAuthenticated, passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: true
}))
app.post("/register",checkNotAuthenticated, async (req, res) => {
  
  try {
      const hash = await bcrypt.hash(req.body.password, 10)
      users.push({
          id: Date.now().toString(), 
          name: req.body.username,
          email: req.body.email,
          password: hash,
      })
      // console.log(users); 
      res.redirect("/login")
      
  } catch (e) {
      console.log(e);
      res.redirect("/register")
  }
});
app.post("/rivews",checkAuthenticated,function(req,res){
  const newrivew = new Rivew({
    username : req.body.username,
    email : req.body.email,
    rivew : req.body.rivew
  });
  
  newrivew.save(function(err){
    if(err){
      console.log(err);
      res.redirect("/");
    }
    else{
      res.redirect("/thankyou");

    }
  });
})
//posting routes ends here

//deleting routes
app.delete("/logout", (req, res) => {
  req.logout(req.user, err => {
      if (err){
        // console.log(err);
        return next(err);
      }
    
    });
    res.redirect("/login")
});
//deleting routes ends here

//checing authentication
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
//checking authentication


app.listen(process.env.PORT, function() {
  console.log("Server started on http://localhost:"+process.env.PORT);
});