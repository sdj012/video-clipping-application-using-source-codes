require('dotenv').config //loads environment variables from a .env file into process.env

  // development:{
  //   sitename:'Shakespace [Development]',
  //     dbs:process.env.DEVELOPMENT_DB,
  // },
  // production:{
  //   sitename:'Shakespace',
  //   database:{
  //     dbs:process.env.DEVELOPMENT_DB,
  //   }
  // },

  // test:{
  //   sitename:'Shakespace [TEST]',
  //   database:{
  //     dbs:process.env.DEVELOPMENT_DB,
  //   }
  // }


  module.exports=()=>{
    const dbs=process.env.MONGODB_CONNECTION_STRING
  }

