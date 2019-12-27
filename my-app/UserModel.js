const mongoose = require('mongoose');

const emailValidator = require('email-validator');

const bcrypt = require('bcrypt');
const SALT_ROUNDS=12;

const UserSchema=mongoose.Schema({
  username:{
    type:String,
    required:true,
    trim:true, //removes trailing spaces
    index:{unique:true},//ensures uniqueness
    minlength:3,
  },
  email:{
    type:String,
    required:true,
    trim:true, //removes trailing spaces
    lowercase:true,
    index:{unique:true},//ensures uniqueness
    minlength:3,
    validate:{
      validator:emailValidator.validate,
      message: props=>`${props.value} is not a valid email address`
    },
  },
  password:{
    type:String,
    required:true,
    trim:true, //removes trailing spaces
    index:{unique:false},//ensures uniqueness
    minlength:8,
  },

  videos:{
    type:Object,
    required:false,
    index:{unique:false,sparse:true},
  }
},
{
  timestamps:true, //mongoose adds ts for each document
},
);

UserSchema.pre('save', async function preSave(next){ //runs on every save for document
  const user=this;
  if(!user.isModified('password')) return next()//property mongoose gives us
  try{
    const hash=await bcrypt.hash(user.password,SALT_ROUNDS);
    //when has is created
    user.password=hash;
    return next();
  }
  catch(err){
    return next(err);
  }
});

UserSchema.methods.comparePassword=async function comparePassword(candidate){
  return bcrypt.compare(candidate,this.password);
};//mongoose way of creating an instance method. Method will be avail to every documnet that will come from the db

module.exports=mongoose.model('User',UserSchema);


