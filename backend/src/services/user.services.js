const axios = require("axios");


module.exports.getLocationSuggestionsServices = async(location)=>{
    const response = await axios.get(`https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(location)}&key=${process.env.GOOGLE_MAPS_API}`);
    return response;
}

module.exports.getLocationCoordinates = async(location)=>{
    const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(location)}&key=${process.env.GOOGLE_MAPS_API}`);
    return response;
}

module.exports.getWeather = async(lat,lon)=>{
    const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.WEATHER_KEY}`)
    return response;
}