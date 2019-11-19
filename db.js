const mongoose = require('mongoose');
const connectionString="mongodb+srv://dbUser:Daeun11Dance@cluster0-tjyzj.mongodb.net/shakespace?retryWrites=true&w=majority"

module.exports.connect = connectionString => mongoose.connect(connectionString,{useMongoClient: true}, (err)=>{
    console.log("mongdo db connection: "+"err?: " + err)
});



