import React from 'react';
import { useContext } from 'react';
import { UserContextData } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Profile = () => {
    const { profile } = useContext(UserContextData);
    console.log(profile);
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("weatherapp_token");
        toast.success("Logged out successfully");
        navigate("/login");
    };

    if (!profile) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-600 flex items-center justify-center">
                <div className="bg-white rounded-2xl shadow-2xl p-8">
                    <div className="flex items-center justify-center space-x-2">
                        <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                        <span className="text-gray-700 text-lg">Loading profile...</span>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-600">
            {/* Header */}
            <div className="bg-white/10 backdrop-blur-md border-b border-white/20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center py-4">
                        <h1 className="text-2xl font-bold text-white">Weather App</h1>
                        <button
                            onClick={handleLogout}
                            className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </div>

            {/* Profile Content */}
            <div className="flex items-center justify-center min-h-[calc(100vh-80px)] p-8">
                <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8">
                    {/* Profile Header */}
                    <div className="text-center mb-8">
                        <div className="relative inline-block">
                            <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mb-4 mx-auto shadow-lg">
                                <span className="text-white text-3xl font-bold">
                                    {profile.name ? profile.name.charAt(0).toUpperCase() : 'U'}
                                </span>
                            </div>
                            <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-4 border-white flex items-center justify-center">
                                <div className="w-3 h-3 bg-white rounded-full"></div>
                            </div>
                        </div>
                        <h2 className="text-3xl font-bold text-gray-800 mb-2">My Profile</h2>
                        <p className="text-gray-600">Welcome back to Weather App</p>
                    </div>

                    {/* Profile Information */}
                    <div className="space-y-6">
                        {/* Name Field */}
                        <div className="bg-gray-50 rounded-lg p-4 border-l-4 border-blue-500">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                FULL NAME
                            </label>
                            <div className="flex items-center space-x-3">
                                <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                                <p className="text-lg font-semibold text-gray-800">
                                    {profile.name || 'Not provided'}
                                </p>
                            </div>
                        </div>

                        {/* Email Field */}
                        <div className="bg-gray-50 rounded-lg p-4 border-l-4 border-green-500">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                EMAIL ADDRESS
                            </label>
                            <div className="flex items-center space-x-3">
                                <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                                <p className="text-lg font-semibold text-gray-800">
                                    {profile.email || 'Not provided'}
                                </p>
                            </div>
                        </div>

                        {/* Account Status */}
                        <div className="bg-green-50 rounded-lg p-4 border-l-4 border-green-500">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                ACCOUNT STATUS
                            </label>
                            <div className="flex items-center space-x-3">
                                <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <p className="text-lg font-semibold text-green-600">
                                    Active
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="mt-8 space-y-4">
                        <button 
                            onClick={() => navigate('/')}
                            className="w-full py-3 px-4 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
                        >
                            Go to Home Page
                        </button>
                        
                        <div className="grid grid-cols-2 gap-4">
                            <button className="py-2 px-4 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-lg transition-colors duration-200">
                                Edit Profile
                            </button>
                        </div>
                    </div>

           
                    
                </div>
            </div>

            {/* Background decoration for mobile */}
            <div className="lg:hidden absolute inset-0 bg-gradient-to-br from-blue-900 via-blue-800 to-blue-600 opacity-10 pointer-events-none"></div>
        </div>
    );
};

export default Profile;