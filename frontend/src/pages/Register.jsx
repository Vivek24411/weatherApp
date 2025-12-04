import React from "react";
import { useState } from "react";
import axios from "axios";
import { useContext } from "react";
import { UserContextData } from "../context/UserContext";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import registerWelcome from "../assets/welcomeRegister.png";

const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const {setLoggedIn} = useContext(UserContextData);
    const navigate = useNavigate();

    async function handleRegister(e){
        e.preventDefault();
        setIsLoading(true);
        try{
            const response = await axios.post(`${import.meta.env.VITE_BASE_URI}/user/register`,{
                name,
                email,
                password
            })

            if(response.data.success){
                setLoggedIn(true);
                localStorage.setItem("weatherapp_token",response.data.token);
                toast.success(response.data.msg);
                navigate("/");
            }else{
                toast.error(response.data.msg);
            }
        }catch(error){
            toast.error(error.message);
        }finally{
            setIsLoading(false);
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-600 via-blue-400  flex">
            {/* Left Section - Welcome Image */}
            <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden rounded-r-4xl">
                <img 
                    src={registerWelcome} 
                    alt="Welcome Register" 
                    className="w-full h-full object-cover"
                />
            </div>

            {/* Right Section - Register Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
                <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8">
                    {/* Header Navigation */}
                    <div className="flex mb-8">
                        <Link 
                            to="/login" 
                            className="flex-1 text-center py-3 text-gray-600 font-medium hover:text-blue-600 transition-colors"
                        >
                            Sign In
                        </Link>
                        <div className="flex-1 text-center py-3 text-white bg-blue-600 rounded-lg font-medium">
                            Register
                        </div>
                    </div>

                    {/* Form Title */}
                    <h2 className="text-3xl font-bold text-gray-800 mb-8">Register</h2>

                    {/* Form */}
                    <form onSubmit={handleRegister} className="space-y-6">
                        {/* Full Name */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                FULL NAME
                            </label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Enter Your Full Name"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all placeholder-gray-400"
                                required
                            />
                        </div>

                        {/* Email */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                EMAIL
                            </label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter Your Email"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all placeholder-gray-400"
                                required
                            />
                        </div>

                        {/* Password */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Password
                            </label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all placeholder-gray-400"
                                required
                            />
                        </div>

                    
                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isLoading}
                            className={`w-full py-3 px-4 rounded-lg font-semibold text-white transition-all duration-200 ${
                                isLoading
                                    ? 'bg-gray-400 cursor-not-allowed'
                                    : 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5'
                            }`}
                        >
                            {isLoading ? (
                                <div className="flex items-center justify-center space-x-2">
                                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                    <span>Signing Up...</span>
                                </div>
                            ) : (
                                'Sign Up'
                            )}
                        </button>
                    </form>

                    {/* Login Link */}
                    <div className="mt-6 text-center">
                        <p className="text-gray-600">
                            Already have an account?{' '}
                            <Link 
                                to="/login" 
                                className="text-blue-600 hover:text-blue-700 font-semibold"
                            >
                                Sign In
                            </Link>
                        </p>
                    </div>
                </div>
            </div>

            {/* Mobile Background for small screens */}
            <div className="lg:hidden absolute inset-0 bg-gradient-to-br from-blue-900 via-blue-800 to-blue-600 opacity-10"></div>
        </div>
    );
};

export default Register;
