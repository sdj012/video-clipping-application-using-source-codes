const express = require("express");
const createError=require('http-errors');
const passport = require('passport');
const UserModel=require('./UserModel');
const bodyParser = require('body-parser');
const mongoose=require('mongoose');
const session=require('express-session'); 
const MongoStore=require('connect-mongo')(session);
const cookieParser=require('cookie-parser');
const auth = require('./auth');
const hbstempl=require('express-handlebars');

// const config=require('./config')[process.env.NODE_ENV || 'development'];
const db=require('./lib/db')
var app = express();
var variable=[];
var videos=[];
playlist=[];
var HTTP_PORT = process.env.PORT || 5000;
var loggedInUser;
// call this function after the http server starts listening for requests

function onHttpStart() {
  console.log("Express http server listening on: " + HTTP_PORT);
  // db.connect("mongodb+srv://dbUser:Daeun11Dance@cluster0-tjyzj.mongodb.net/shakespace?retryWrites=true&w=majority")
  db.connect("mongodb+srv://dbUser:Daeun11Dance@cluster0-tjyzj.mongodb.net/shakespace?retryWrites=true&w=majority")
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error(err);
  });
}
app.engine('.hbs',hbstempl({extname:'.hbs'}))
app.set('view engine','.hbs');


app.get('/',(req,res,next)=>{
  res.render('index',{layout:false});
});


app.use(bodyParser.urlencoded({ extended: true }));
app.unsubscribe(cookieParser());
app.use(express.static(__dirname))

app.use(auth.initialize)
app.use(auth.session);
app.use(auth.setUser);

app.use(session({
  secret:'very secret', //sign the sessions to prevent tamperings
  resave: true,//if wans't changed, stays active
  saveUninitialized:false,//to avoid getting empty objects in db
  store: new MongoStore({mongooseConnection: mongoose.connection})
}))


app.get('/login',(req,res)=>{res.render('index',{error:req.query.error,layout:false})});

app.post('/login',
  passport.authenticate('local'),
  function(req, res) {
    loggedInUser=req.user.username;
    // If this function gets called, authentication was successful.
    // `req.user` contains the authenticated user.
    res.redirect('/home/' + req.user.username);
  } 
  // By default, if auth fails, pp will respond with a 401 status. 
);




app.get('/logout',(req,res)=>{
  //passport automatically add function logout to req object. simple call it. It will clear the login session
  req.logout();
  loggedInUser="";
  return res.redirect('/');

})

app.get('/home/:username',(req,res)=>{

  if (loggedInUser===req.params.username) {

  //store user data in variable.

  if(req.query && req.query.selectedVideos){

  console.log("query route hit");
  console.log(req.query.selectedVideos);

  if(typeof req.query.selectedVideos === 'object'){

  req.query.selectedVideos.forEach(function find(video){
  console.log("this is one video" + video);
  UserModel.findOneAndUpdate(
    {username:req.params.username},
    {$pull:{videos:{"0":video}}},
    function(err) {
      if(err){
      console.log(err);
      }else{
      console.log("deleted")
      }
    }
  )})

  } else {

    UserModel.findOneAndUpdate(
      {username:req.params.username},
      {$pull:{videos:{"0":req.query.selectedVideos}}},
      function(err) {
        if(err){
        console.log(err);
        }else{
        console.log("deleted")
        }
      }
    )

  }
  }

  UserModel.find({ username:req.params.username },function(err, user) {
    
    if (err) throw err;
    variable=user[0];
    videos=[];
    playlist=[];

    if(user[0]){
    var data=JSON.parse(JSON.stringify(user[0]))

    function addToArray(item){
      videos.push(item);
    }

    function addToPlaylist(item){
      playlist.push("<div class='video'><input type='checkbox' class='deletionIndicator' name='selectedVideos' value='"+item[0]+"'<br>"+ item[0] +"<br></div>");
    };


    if(data.videos){
    data.videos.forEach(addToArray);
    videos.forEach(addToPlaylist);
    }
  }
  res.render('home',{playlist:playlist, data:variable,layout:false});
  })

  } else {
    res.redirect("/"); 
  }

})



app.post('/home/:username',(req,res,next)=>{

 UserModel.findOneAndUpdate(
   {username:req.params.username},
    {$push:{videos:{"0":req.body.link}}},
    {useFindAndModify:false},
    function(err, doc) {
        if(err){
        console.log(err);
        }else{
        console.log("updated")
        console.log(req.body.link);
        return res.redirect('/home/' + req.params.username);
        }
    }
  );
  
})

app.post('/home',(req,res)=>{

res.sendFile('home.html',{root:__dirname})

});

app.post('/registration', async (req,res,next)=>{

  try{

    var user = {};
    user=new UserModel({

      username: req.body.username,
      email:req.body.email,
      password:req.body.password,
      videos:{},

    })
    const savedUser=await user.save();
    if(savedUser)return res.redirect('/');
    return next(new Error('Failed to save user for unknown reasons'));

  }catch(err){
    return next(err);
  }

})

//Error Page: if no other route matches...
app.use((req,res,next)=>{
  return next(createError(404,'File not found'))
})

app.use((err,req, res, next)=>{
  // res.local.message=err.message;
  // const status=err.status || 500;
  // res.locals.status=status;
  // res.status(status);
  return res.render('error',{layout:false})
})
// setup http server to listen on HTTP_PORT
app.listen(HTTP_PORT, onHttpStart);
