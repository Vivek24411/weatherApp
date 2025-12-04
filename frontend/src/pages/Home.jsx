import axios from "axios";
import React from "react";
import { useState, useEffect, useContext } from "react";
import { toast } from "react-toastify";
import { UserContextData } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [location, setLocation] = useState("");
  const [weather, setWeather] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [locationSuggestions, setLocationSuggestions] = useState(null);
  const { profile } = useContext(UserContextData);
  const navigate = useNavigate();

  //   async function getWeather() {
  //     try {
  //       setLoading(true);
  //       const response = await axios.get(
  //         `${import.meta.env.VITE_BASE_URI}/user/getWeather`,
  //         {
  //           params: {
  //             city,
  //           },
  //           headers: {
  //             Authorization: `Bearer ${localStorage.getItem("weatherapp_token")}`,
  //           },
  //         }
  //       );

  //       console.log(response);
  //       if (response.data.success) {
  //         setWeather(response.data.weather);
  //         setCity("");
  //       } else {
  //         toast.error(response.data.msg);
  //       }
  //     } catch (error) {
  //       toast.error(error.message);
  //     } finally {
  //       setLoading(false);
  //     }
  //   }

 

  const kelvinToCelsius = (kelvin) => {
    return Math.round(kelvin - 273.15);
  };

  const formatTime = (timestamp) => {
    return new Date(timestamp * 1000).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getWeatherIcon = (iconCode) => {
    return `https://openweathermap.org/img/wn/${iconCode}@4x.png`;
  };

  async function getLocationSuggestions(e) {
    const inputValue = e.target.value;
    setLocation(inputValue);

    // Clear suggestions if input is too short
    if (inputValue.length < 2) {
      setLocationSuggestions([]);
      return;
    }

    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URI}/user/getLocationSuggestions`,
        {
          params: {
            location: inputValue,
          },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("weatherapp_token")}`,
          },
        }
      );

      if (response.data.success) {
        console.log(response.data.suggestions);
        setLocationSuggestions(response.data.suggestions);
      } else {
        setLocationSuggestions([]);
      }
    } catch (error) {
      toast.error(error.message);
      setLocationSuggestions([]);
    }
  }

  async function getWeatherForCurrentLocation(lat, lon) {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URI}/user/getCurrentLocationWeather`,
        {
          params: {
            lat,
            lon,
          },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("weatherapp_token")}`,
          },
        }
      );

      if (response.data.success) {
        console.log(response.data);
        setWeather(response.data.weather);
      } else {
        toast.error(response.data.msg);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }

  async function getCurrentLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          await getWeatherForCurrentLocation(latitude, longitude);
        },
        (error) => {
          toast.error(error.code);
          setLoading(false);
        }
      );
    } else {
      toast.error("Geolocation access is denied");
      setLoading(false);
    }
  }

  useEffect(() => {
    getCurrentLocation();
  }, []);


  async function getParticularPlaceWeather(location){
    console.log(location)
    try{
    const response = await axios.get(`${import.meta.env.VITE_BASE_URI}/user/getParticularPlaceWeather`,{
        params:{
            location
        },
        headers:{
            Authorization: `Bearer ${localStorage.getItem("weatherapp_token")}`
        }
    })
    console.log(response)
    if(response.data.success){
        setWeather(response.data.weather);
    }else{
        toast.error(response.data.msg);
    }
    }catch(error){
        toast.error(error.message);
    }finally{
        setLocation("");
        setLocationSuggestions([]);
    }
  }

  

  if (isLoading) {
    return <>... Loading</>;
  }

  if (!weather) {
    return (
      <>
        <h3 className="text-2xl font-bold mb-4">No weather data available</h3>
      </>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-600">
      {/* Header */}
      <div className="bg-white/10 backdrop-blur-md border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-center py-4 space-y-4 sm:space-y-0">
            <h1 className="text-2xl font-bold text-white">Weather App</h1>

            {/* Search Bar with Suggestions */}
            <div className="relative">
              <form className="flex space-x-2">
                <div className="relative">
                  <input
                    type="text"
                    value={location}
                    onChange={getLocationSuggestions}
                    placeholder="Enter city name..."
                    className="px-4 py-2 w-64 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  />
                  {/* Search Icon */}
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>

                  {/* Location Suggestions Dropdown */}
                  {locationSuggestions && locationSuggestions.length > 0 && (
                    <div className="absolute top-full left-0 w-full mt-1 bg-white rounded-lg shadow-lg border border-gray-200 z-50 max-h-60 overflow-y-auto">
                      {locationSuggestions.map((suggestion, index) => (
                        <div
                          key={index}
                          onClick={() => getParticularPlaceWeather(suggestion)}
                          className="px-4 py-3 hover:bg-blue-50 cursor-pointer border-b border-gray-100 last:border-b-0 flex items-center space-x-3 transition-colors duration-150"
                        >
                          {/* Location Icon */}
                          <div className="text-blue-500">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                          </div>
                          <div className="flex-1">
                            <p className="text-gray-800 font-medium">{suggestion}</p>
                            <p className="text-xs text-gray-500">Click to get weather</p>
                          </div>
                          {/* Arrow Icon */}
                          <div className="text-gray-400">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                            </svg>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* No suggestions found */}
                  {locationSuggestions && locationSuggestions.length === 0 && location.length > 2 && (
                    <div className="absolute top-full left-0 w-full mt-1 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                      <div className="px-4 py-3 text-center text-gray-500">
                        <svg className="w-8 h-8 mx-auto mb-2 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.29-1.009-5.824-2.562M15 17a2 2 0 01-2 2H9a2 2 0 01-2-2v-4a2 2 0 012-2 2 2 0 012-2" />
                        </svg>
                        <p className="text-sm">No locations found</p>
                        <p className="text-xs text-gray-400">Try a different search term</p>
                      </div>
                    </div>
                  )}
                </div>
              </form>
            </div>

            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate("/profile")}
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200"
              >
                Profile
              </button>
            </div>
          </div>
        </div>
      </div>


      

    

      {/* Weather Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {weather ? (
          <div className="space-y-6">
            {/* Welcome Message */}
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-white mb-2">
                Welcome back, {profile?.name || "User"}!
              </h2>
              <p className="text-blue-100">
                Here's the weather information you requested
              </p>
            </div>

            {/* Main Weather Card */}
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6 text-white">
                <div className="flex flex-col md:flex-row items-center justify-between">
                  <div className="text-center md:text-left mb-4 md:mb-0">
                    <h3 className="text-3xl font-bold">{weather.name}</h3>
                    <p className="text-blue-100">{weather.sys.country}</p>
                    <p className="text-blue-100">
                      {new Date().toLocaleDateString("en-US", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="text-center">
                      <div className="text-6xl font-bold">
                        {kelvinToCelsius(weather.main.temp)}°C
                      </div>
                      <div className="text-blue-100">
                        Feels like {kelvinToCelsius(weather.main.feels_like)}°C
                      </div>
                    </div>
                    {weather.weather[0] && (
                      <div className="text-center">
                        <img
                          src={getWeatherIcon(weather.weather[0].icon)}
                          alt={weather.weather[0].description}
                          className="w-20 h-20 mx-auto"
                        />
                        <p className="text-blue-100 capitalize">
                          {weather.weather[0].description}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Weather Details Grid */}
              <div className="p-6 grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-blue-50 rounded-lg p-4 text-center">
                  <div className="text-blue-600 mb-2">
                    <svg
                      className="w-8 h-8 mx-auto"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.002 4.002 0 003 15z"
                      />
                    </svg>
                  </div>
                  <div className="text-2xl font-bold text-gray-800">
                    {weather.main.humidity}%
                  </div>
                  <div className="text-sm text-gray-600">Humidity</div>
                </div>

                <div className="bg-green-50 rounded-lg p-4 text-center">
                  <div className="text-green-600 mb-2">
                    <svg
                      className="w-8 h-8 mx-auto"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                  </div>
                  <div className="text-2xl font-bold text-gray-800">
                    {weather.main.pressure}
                  </div>
                  <div className="text-sm text-gray-600">Pressure (hPa)</div>
                </div>

                <div className="bg-yellow-50 rounded-lg p-4 text-center">
                  <div className="text-yellow-600 mb-2">
                    <svg
                      className="w-8 h-8 mx-auto"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                  </div>
                  <div className="text-2xl font-bold text-gray-800">
                    {weather.visibility / 1000}
                  </div>
                  <div className="text-sm text-gray-600">Visibility (km)</div>
                </div>

                <div className="bg-purple-50 rounded-lg p-4 text-center">
                  <div className="text-purple-600 mb-2">
                    <svg
                      className="w-8 h-8 mx-auto"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.002 4.002 0 003 15z"
                      />
                    </svg>
                  </div>
                  <div className="text-2xl font-bold text-gray-800">
                    {weather.clouds.all}%
                  </div>
                  <div className="text-sm text-gray-600">Cloudiness</div>
                </div>
              </div>

              {/* Temperature Range */}
              <div className="p-6 bg-gray-50 border-t">
                <div className="flex justify-between items-center">
                  <div className="text-center">
                    <div className="text-lg font-semibold text-gray-800">
                      {kelvinToCelsius(weather.main.temp_min)}°C
                    </div>
                    <div className="text-sm text-gray-600">Min Temp</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-semibold text-gray-800">
                      {kelvinToCelsius(weather.main.temp_max)}°C
                    </div>
                    <div className="text-sm text-gray-600">Max Temp</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-semibold text-gray-800">
                      {formatTime(weather.sys.sunrise)}
                    </div>
                    <div className="text-sm text-gray-600">Sunrise</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-semibold text-gray-800">
                      {formatTime(weather.sys.sunset)}
                    </div>
                    <div className="text-sm text-gray-600">Sunset</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center text-white">
            <h3 className="text-2xl font-bold mb-4">
              No weather data available
            </h3>
            <p className="text-blue-100">Try searching for a city above</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
