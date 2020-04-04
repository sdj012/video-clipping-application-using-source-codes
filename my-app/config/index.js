require('dotenv').config //loads environment variables from a .env file into process.env

  module.exports=()=>{
    const dbs=process.env.MONGODB_CONNECTION_STRING
  }

