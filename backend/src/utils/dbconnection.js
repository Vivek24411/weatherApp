const mongoose = require("mongoose");

function dbConnection(){
    mongoose.connect(process.env.MONGO_URI).then(()=>{
        console.log("dbConnected")
    }).catch((err)=>{
        console.log(err.msg);
    })
}

module.exports = dbConnection;