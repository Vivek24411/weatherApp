const express = require("express");
const app = express();
const dbConnection = require("./utils/dbconnection");
const cors = require("cors");
const userRoutes = require("../src/routes/user.routes");
dbConnection();


app.use(cors({
    origin: (origin, callback)=>{
        if(!origin){
            return callback(null, true);
        }
        if(origin!="http://localhost:5173"){
            return callback(new Error("Wrong Frontend"), false);
        }
        return callback(null, true);
    }
}));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use("/user",userRoutes);




module.exports = app;