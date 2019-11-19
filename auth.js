const passport = require('passport');
const LocalStrategy=require('passport-local').Strategy;
const UserModel=require('./UserModel');

//auth. users against the db

passport.use(new LocalStrategy({usernameField:'username'},async(username,password,done)=>{

  try{

    const user=await UserModel.findOne({username:username}).exec();
    if(!user){
      return done(null,false,{message:'Invalid username or password'})
    }

    const passwordOK=await user.comparePassword(password)
    if(!passwordOK){
      return done(null,false,{message:'Invalid username or password'})
    }

    return done(null,user); 

  }catch(err){
    return done(err);
  }
}))
//will look for username and username and pass in the bod by default. make sure to set to email add or other desired


//best: store userID and use to retrieve user data form db 
//serialization,deserialization

passport.serializeUser((user, done)=>{

  return done(null,user._id)
})

passport.deserializeUser(async(id,done)=>{

  try{
   const user = await UserModel.findById(id).exec();
   return done(null,user); // in case user was deleted to from,pp would not be able to deserialize user, and thus not be able to auth.
  }catch(err){
    return done(err);
  }

});

//pp is now set up to auth users against db, store and retrieve them using a session

module.exports = {
  initialize: passport.initialize(),
  session: passport.session(),
  setUser: (req,res, next)=>{
    res.locals.user = req.user //pp will give us current user if a user is logged in
    return next(); //always call for midware
  },

  //diff auth strategies npm install --save passport-local



};

