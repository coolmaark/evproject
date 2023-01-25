// const passport = require("passport");

const LocalStratergy = require("passport-local").Strategy;
const User = require("User.js");

exports.initializingPassport = (passport) =>{
    passport.use(new LocalStratergy(async (username,password,done ) =>{
    try{    
        const user = await User.findOne({username});
        if(!user) return done(null, false);

        if(user.password != password) return done(null,false);

        return done(null, user);
    }
    catch(err){
        return done(err, false);
    }
    }));

    passport.serializeUser ( async(id, done) =>{
        done(null, user.id);
    });
    passport.deserializeUser ( async(id, done) =>{
        try{    
            const user = await User.findOne({username});
           
            return done(null, user);
        }
        catch(err){
            return done(err, false);
        }
    });
};
