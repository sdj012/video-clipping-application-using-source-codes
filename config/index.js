require('dotenv').config //loads environment variables from a .env file into process.env
const path=require('path')
module.exports={
  development:{
    sitename:'Shakespace [Development]',
    database:{
      dbs:process.env.DEVELOPMENT_DB,
    }
  },
  production:{
    sitename:'Shakespace',
    database:{
      dbs:process.env.PRODUCTION_DB,
    }
  },

  test:{
    sitename:'Shakespace [TEST]',
    database:{
      dbs:process.env.TEST_DB,
    }
  }

}