require('dotenv').config({path:'my-app/.env'});
const url = require('url')
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
var crypto = require("crypto");

const connectionString=process.env.MONGODB_URI;

const db=require('../lib/db')
var app = express();
var variable=[];
var videos=[];
var playlist=[];
var HTTP_PORT = process.env.PORT || 3000;
var loggedInUser;

// call this function after the http server starts listening for requests

function onHttpStart() {
  console.log("Express http server listening on: " + HTTP_PORT);
  db.connect(connectionString)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error(err);
  });

  embed="";
  }

app.engine('.hbs',hbstempl({extname:'.hbs'}))
app.set('views',__dirname+'/views');
app.set('view engine','.hbs');


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
  store: new MongoStore({mongooseConnection: mongoose.connection}),
}))


app.get('/',(req,res)=>{
  
  console.log(" hit: '/' get ");

  // if (req.session.data.length==0) {
  //   req.session.data = [];
  // }

  tempPlayList=[];

  if(req.session.data)tempPlayList.push(req.session.data);

  console.log("req.session.data length:" + req.session.data.length)

  console.log("req.session.data:" + req.session.data);

  console.log("tempPlayList:" + JSON.parse(JSON.stringify(tempPlayList)));

  // if(req.sessions.data && req.query.selectedVideos){

  //   console.log("query route hit");

  //   console.log("length: selected Videos: " + req.query.selectedVideos.length)
  //   console.log("selected Videos: " + req.query.selectedVideos)
  
  //     for(i=0;i<tempPlayList.length;i++){

  //         console.log("hit: for loop")

  //       for(j=0;j<req.query.selectedVideos.length;j++){

  //         if(tempPlayList[i].includes(req.query.selectedVideos[j])){
  //           tempPlayList.splice(i,1);
  //         }

  //       }
  //     }
    
  //   return res.redirect('/');

  // }

    return res.render('index',{tempPlayList:tempPlayList,error:req.query.error,layout:false})

  // else {

  // console.log("req.session.data:" + req.session.data)
  // console.log("req.query.selectedVideos:" + req.query.selectedVideos)

  // if (req.session.data.length==0) {
  //   req.session.data = [];
  //   console.log("rendering: empty index");
  //   return res.render('index',{tempPlayList:JSON.stringify(req.session.data),error:req.query.error,layout:false})
  // } else {

  
  // }

});



app.post('/',(req,res)=>{

  console.log("post '/' hit ")

  var link=req.body.link;

  if (!req.session.data) {
    req.session.data = [];
  }

  var sliceBeg=link.indexOf("width");

  var stringHalf=link.slice(0,sliceBeg);
  var string2ndHalf=link.slice(sliceBeg);
  
  var itemId = crypto.randomBytes(20).toString('hex');

  var finalEmbedCode="<div class='video'><input type='checkbox' class='deletionIndicator' name='selectedVideos' value='"+itemId+"'><br><div class='embed-responsive embed-responsive-16by9'>"+stringHalf+">class='embed-responsive-item'" +string2ndHalf +"</div><br></div>"

  req.session.data.push(finalEmbedCode);

  console.log(itemId + " : " + finalEmbedCode )

  link="";

  finalEmbedCode="";

  return res.redirect('/');

})

app.get('/login',(req,res,next)=>{
  return res.render('login',{layout:false});
});


app.post('/login',
  passport.authenticate('local'),
  function(req, res) {
    // If this function gets called, authentication was successful.
    // `req.user` contains the authenticated user.
    loggedInUser=req.user.username;
    console.log("login post route hit");
    return res.redirect('/home/' + req.user.username);
  }, 
  // By default, if auth fails, pp will respond with a 401 status. 
);

app.get('/favicon.ico',(req,res)=>{
  return res.redirect('/');
})

app.post('/registration', async (req,res,next)=>{

  console.log("hit post route, trying to save "+ req.body.username);

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

app.get('/registration',(req,res)=>{

  res.render('registration',{layout:false})
  
});

app.get('/logout',(req,res)=>{
  //passport automatically add function logout to req object. simple call it. It will clear the login session
  req.logout();
  loggedInUser="";
  return res.redirect('/');

})


app.get('/home/:username',(req,res)=>{
  if (loggedInUser===req.params.username) {

  //update data
      if(req.query && req.query.selectedVideos){

      console.log("query route hit");

      if(typeof req.query.selectedVideos === 'object'){

      req.query.selectedVideos.forEach(function find(video){
      console.log("this is one video" + video);
      UserModel.findOneAndUpdate(
        {username:req.params.username},
        {$pull:{videos:{"1":video}}},
        {useFindAndModify:false},
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
          {$pull:{videos:{"1":req.query.selectedVideos}}},
          {useFindAndModify:false},
          function(err) {
            if(err){
            console.log(err);
            }else{
            console.log("deleted")
            }
          }
        )

      }

      return res.redirect('/home/' + req.params.username);

    }

  UserModel.find(
    {username:req.params.username },
    function(err, user) {
    console.log("loading videos")
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
      playlist.push("<div class='video'><input type='checkbox' class='deletionIndicator' name='selectedVideos' value='"+item[1]+"'><br>"+ item[0] +"<br></div>");
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

  var videoId = crypto.randomBytes(20).toString('hex');

  var link=req.body.link;
  
  var sliceBeg=link.indexOf("width");
  
  var stringHalf=link.slice(0,sliceBeg);
  var string2ndHalf=link.slice(sliceBeg);
    
  var finalEmbedCode="<div class='embed-responsive embed-responsive-16by9'>"+stringHalf+" class='embed-responsive-item' " +string2ndHalf +"</div>"
  
   UserModel.findOneAndUpdate(
     {username:req.params.username},
      {$push:{videos:{"0":finalEmbedCode,"1":videoId}}},
      {useFindAndModify:false},
      function(err, doc) {
          if(err){
          console.log(err);
          }else{ 
          console.log("updated")
          return res.redirect('/home/' + req.params.username);
          }
      }
    );
    
})


app.post('/home',(req,res)=>{

  res.sendFile('home.html',{root:__dirname})

});


//Error Page: if no other route matches...
app.use((req,res,next)=>{
  return next(createError(404,'File not found'))
})


app.use((err,req, res, next)=>{
  return res.render('error',{layout:false})
})

// setup http server to listen on HTTP_PORT
app.listen(HTTP_PORT, onHttpStart);
