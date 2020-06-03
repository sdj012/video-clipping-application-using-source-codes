const mongoose = require('mongoose');

  module.exports.connect=async dbs=>mongoose.connect(dbs,{useNewUrlParser:true,useUnifiedTopology: true, useCreateIndex: true});

  
