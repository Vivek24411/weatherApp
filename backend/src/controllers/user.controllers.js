const { validationResult } = require("express-validator");
const userModel = require("../models/user.model");
const bcrypt = require("bcrypt");
const axios = require("axios");
const { getLocationSuggestionsServices, getLocationCoordinates, getWeather } = require("../services/user.services");

function checkValidation(req, res) {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.json({
      success: false,
      msg: error.array(), // .array is not built in javascript function but is present in epxress validatro return it provides the array of all the errors
    });
  }
}

module.exports.register = async (req, res, next) => {
  try {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.json({
        success: false,
        msg: error.array(), // .array is not built in javascript function but is present in epxress validatro return it provides the array of all the errors
      });
    }

    const { name, email, password } = req.body;
    const existingUser = await userModel.findOne({ email });

    if (existingUser) {
      return res.json({ success: false, msg: "User Already Exist" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await userModel.create({
      name,
      email,
      password: hashedPassword,
    });

    const token = user.createToken();
    return res.json({
      success: true,
      msg: "User Registered",
      token,
    });
  } catch (error) {
    return res.json({
      success: false,
      msg: error.message || "Internal Server Error",
    });
  }
};

module.exports.login = async (req, res, next) => {
  try {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.json({
        success: false,
        msg: error.array(), // .array is not built in javascript function but is present in epxress validatro return it provides the array of all the errors
      });
    }

    const { email, password } = req.body;

    const userExist = await userModel.findOne({ email });

    if (!userExist) {
      return res.json({ success: false, msg: "Invalid Email or Password" });
    }

    const checkPassword = await userExist.comparePassword(password);

    if (!checkPassword) {
      return res.json({ success: false, msg: "Invalid Email or Password" });
    }

    const token = userExist.createToken();

    return res.json({ success: true, msg: "User LoggedIn", token });
  } catch (error) {
    return res.json({
      success: false,
      msg: error.message || "Internal Server Error",
    });
  }
};

module.exports.getProfile = (req, res, next) => {
  const profile = req.user;
  return res.json({ success: true, profile });
};

module.exports.getWeather = async (req, res, next) => {
  try {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.json({ success: false, msg: error.array() });
    }
    const { city } = req.query;

    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.WEATHER_KEY}`
    );

    if (!response.data) {
      return res.json({
        success: false,
        msg: "Cant Fetch The Weather Updates",
      });
    }
    return res.json({
      success: true,
      msg: "Fetched Weather Successfully",
      weather: response.data,
    });
  } catch (error) {
    return res.json({ success: false, msg: error.message });
  }
};

module.exports.getCurrentLocationWeather = async function (req, res, next) {
  try {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.json({ success: false, msg: error.array() });
    }

    const { lat, lon } = req.query;
    const response = await getWeather(lat,lon);
    if (!response.data) {
      return res.json({ success: false, msg: "Cant fetch the location" });
    }

    return res.json({ success: true, weather: response.data });
  } catch (error) {
    return res.json({ success: false, msg: error.message });
  }
};

module.exports.getLocationSuggestions = async (req, res, next) => {
  try {
    checkValidation(req, res);

    const { location } = req.query;
    const response = await getLocationSuggestionsServices(location);

    if (response.data.status == "OK") {
      const suggestions = response.data.predictions.map((s) => {
        return s.description;
      });
      return res.json({
        success: true,
        msg: "Fetched Suggestions",
        suggestions,
      });
    } else {
      return res.json({ success: false, msg: "Unable To Fetch Location" });
    }
  } catch (error) {
    return res.json({ success: false, msg: error.message });
  }
};

module.exports.getParticularPlaceWeather = async(req,res,next)=>{
  try{
    checkValidation(req,res);

  const {location} = req.query;
    console.log(location);
  const response = await getLocationCoordinates(location);
    console.log(response.data.results[0].geometry.location);
  if(response.data.status=="OK"){
      const weatherResponse = await getWeather(response.data.results[0].geometry.location.lat,response.data.results[0].geometry.location.lng);
      if(!weatherResponse){
        return res.json({success:false, msg:"Unable to fetch the weather"});
      }
      return res.json({success:true, weather:weatherResponse.data});
  }else{
    return res.json({success:false, msg:"Unable to fetch the coordinates"});
  }
  }catch(error){
    return res.json({success:false, msg:error.message});
  }

}
