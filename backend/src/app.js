const express = require("express");
const app = express();
const dbConnection = require("./utils/dbconnection");
const cors = require("cors");
const userRoutes = require("../src/routes/user.routes");
dbConnection();


app.use(cors({
    origin: (origin, callback) => {
        const allowedOrigins = [
            'http://localhost:5173',
            'https://your-frontend-domain.com' // Replace with your actual frontend URL after deployment
        ];
        
        if (!origin || allowedOrigins.includes(origin)) {
            return callback(null, true);
        }
        return callback(new Error("Not allowed by CORS"), false);
    },
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use("/user",userRoutes);




module.exports = app;