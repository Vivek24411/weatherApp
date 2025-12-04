const express = require("express");
const userRoutes = express.Router();
const {body, query} = require("express-validator");
const { register, login, getProfile, getWeather, getCurrentLocationWeather, getLocationSuggestions, getParticularPlaceWeather } = require("../controllers/user.controllers");
const { userAuth } = require("../middleware/auth");


userRoutes.post("/register",[
    body("name").isString().isLength({min:3}),
    body("email").isEmail(),
    body("password").isString().isLength({min:3}),
],register);

userRoutes.post("/login",[
    body("email").isEmail(),
    body("password").isString().isLength({min:3})
],login)

userRoutes.get('/getProfile',userAuth,getProfile)

userRoutes.get("/getWeather",userAuth,[
    query("city").isString().isLength({min:3})
],getWeather)

userRoutes.get("/getCurrentLocationWeather",userAuth,[
    query("lat").isString().isLength({min:1}),
    query("lon").isString().isLength({min:1})
],getCurrentLocationWeather)

userRoutes.get("/getLocationSuggestions",userAuth,[
    query("location").isString(),
],getLocationSuggestions)

userRoutes.get("/getParticularPlaceWeather",userAuth,[
    query("location").isString().isLength({min:1})
],getParticularPlaceWeather)

module.exports = userRoutes;