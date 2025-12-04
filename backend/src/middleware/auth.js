const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model");
const { decode } = require("punycode");

module.exports.userAuth = async (req,res,next)=>{
    try{
        const token = req.headers.authorization.split(" ")[1];

    if(!token){
        return res.json({success:false, msg:"Token Not Sent"});
    }

    const decoded = jwt.verify(token,process.env.SECRET_KEY);

    const user = await userModel.findById(decoded.id);

    req.user = user;
    next();

    }catch(error){
        return res.json({success:false, msg:error.message||"Internal Server Error"});
    }
}