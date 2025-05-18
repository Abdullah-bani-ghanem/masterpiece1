import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import Swal from 'sweetalert2';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    phoneNumber: '',
    role: '',
    confirmPassword: ''
  });
  const [isVisible, setIsVisible] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const navigate = useNavigate();

  // Animation effect on component mount
  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
  
    // Simple password match check
    if (formData.password !== formData.confirmPassword) {
      Swal.fire({
        icon: 'warning',
        title: 'Password Mismatch',
        text: 'Passwords do not match!',
        confirmButtonText: 'OK',
        background: '#1F2937',
        color: '#F9FAFB'
      });
      return;
    }
  
    try {
      const res = await axios.post(
        "http://localhost:5000/api/users/register",
        {
          name: formData.fullName,
          email: formData.email,
          password: formData.password,
          phoneNumber: formData.phoneNumber,
          role: formData.role,
        },
        { withCredentials: true }
      );
  
      Swal.fire({
        icon: 'success',
        title: 'Registration Successful',
        text: 'You have registered successfully!',
        confirmButtonText: 'OK',
        background: '#1F2937',
        color: '#F9FAFB'
      }).then(() => {
        navigate("/");
      });
  
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Registration Failed',
        text: error.response?.data?.message || "An unexpected error occurred",
        confirmButtonText: 'OK',
        background: '#1F2937',
        color: '#F9FAFB'
      });
    }
  };

  // Enhanced animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 0.7, staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { y: 25, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const slideIn = {
    hidden: { x: -70, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 0.9, ease: "easeOut" } }
  };

  const pulse = {
    scale: [1, 1.05, 1],
    transition: { duration: 2, repeat: Infinity }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b dark:bg-[#2d2d2e] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 mt-18">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7 }}
        className="max-w-5xl w-full flex dark:bg-[#4a4a48] rounded-2xl shadow-2xl overflow-hidden border border-gray-700"
      >
        {/* Left side - Image with animation */}
        <motion.div 
          className="hidden md:block md:w-1/2 bg-gradient-to-br from-[#FBBF24] to-yellow-600 relative overflow-hidden"
          initial="hidden"
          animate="visible"
          variants={slideIn}
        >
          {/* Animated elements in background */}
          <motion.div 
            className="absolute w-64 h-64 rounded-full bg-purple-500 opacity-20" 
            style={{ top: '10%', left: '-20%' }}
            animate={{ 
              scale: [1, 1.4, 1],
              x: [0, 20, 0],
              transition: { 
                duration: 12, 
                repeat: Infinity,
                repeatType: "reverse"
              }
            }}
          />
          <motion.div 
            className="absolute w-40 h-40 rounded-full bg-indigo-100 opacity-20" 
            style={{ bottom: '10%', right: '5%' }}
            animate={{ 
              scale: [1, 1.5, 1],
              y: [0, -15, 0],
              transition: { 
                duration: 10, 
                repeat: Infinity,
                repeatType: "reverse",
                delay: 1
              }
            }}
          />
          <motion.div 
            className="absolute w-32 h-32 rounded-full bg-blue-400 opacity-20" 
            style={{ top: '40%', left: '25%' }}
            animate={{ 
              scale: [1, 1.3, 1],
              transition: { 
                duration: 8, 
                repeat: Infinity,
                repeatType: "reverse",
                delay: 2
              }
            }}
          />
          
          {/* Abstract lines */}
          <svg className="absolute inset-0 w-full h-full opacity-20" xmlns="http://www.w3.org/2000/svg">
            <motion.path 
              d="M0,100 Q80,50 160,100 T320,100 T480,100 T640,100 T800,100" 
              stroke="rgba(255,255,255,0.3)" 
              strokeWidth="2" 
              fill="none"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ 
                pathLength: 1,
                opacity: 0.3,
                transition: { duration: 2, delay: 0.5 }
              }}
            />
            <motion.path 
              d="M0,150 Q80,200 160,150 T320,150 T480,150 T640,150 T800,150" 
              stroke="rgba(255,255,255,0.3)" 
              strokeWidth="2" 
              fill="none"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ 
                pathLength: 1,
                opacity: 0.3,
                transition: { duration: 2, delay: 0.7 }
              }}
            />
          </svg>
          
          {/* Centered content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center p-8">
            <motion.div 
              className="relative w-32 h-32 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-sm mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ 
                opacity: 1, 
                y: 0,
                transition: { duration: 0.8, delay: 0.6 }
              }}
              whileHover={pulse}
            >
              <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z"></path>
              </svg>
            </motion.div>
            
            <motion.h3 
              className="text-2xl font-bold text-white mb-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ 
                opacity: 1, 
                y: 0,
                transition: { duration: 0.8, delay: 0.9 }
              }}
            >
              Join Our Community
            </motion.h3>
            
            <motion.p 
              className="text-indigo-100 text-center max-w-xs"
              initial={{ opacity: 0, y: 20 }}
              animate={{ 
                opacity: 1, 
                y: 0,
                transition: { duration: 0.8, delay: 1.1 }
              }}
            >
              Create an account to access exclusive features and personalized experiences.
            </motion.p>
            
            <motion.div 
              className="mt-8 flex space-x-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ 
                opacity: 1, 
                y: 0,
                transition: { duration: 0.8, delay: 1.3 }
              }}
            >
              {/* Feature highlights */}
              <div className="flex items-center text-white/90 text-sm">
                <svg className="w-5 h-5 mr-2 text-indigo-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                </svg>
                <span>Free Registration</span>
              </div>
              
              <div className="flex items-center text-white/90 text-sm">
                <svg className="w-5 h-5 mr-2 text-indigo-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                </svg>
                <span>Premium Access</span>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Right side - Register form */}
        <motion.div 
          className="w-full md:w-1/2 p-10 space-y-6"
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          variants={containerVariants}
        >
          {/* Title */}
          <motion.div className="text-center" variants={itemVariants}>
            <h2 className="mt-6 text-3xl font-extrabold text-gray-100">Create an account</h2>
            <p className="mt-2 text-sm text-gray-400">
              Already have an account?{' '}
              <Link to="/login" className="font-medium text-[#FBBF24] hover:text-yellow-600 transition-colors duration-200">
                Sign in instead
              </Link>
            </p>
          </motion.div>

          {/* Register Form */}
          <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
            <div className="rounded-md space-y-4">
              <motion.div variants={itemVariants}>
                <label htmlFor="full-name" className="block text-sm font-medium text-gray-300">
                  Full Name
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <input
                    id="full-name"
                    name="fullName"
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={handleChange}
                    className="bg-white  block w-full pl-10 pr-3 py-3 border border-gray-700 rounded-md shadow-sm placeholder-gray-400 text-black text-sm transition-colors duration-200"
                    placeholder="Enter your full name"
                  />
                </div>
              </motion.div>
              
              <motion.div variants={itemVariants}>
                <label htmlFor="email-address" className="block text-sm font-medium text-gray-300">
                  Email address
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                  </div>
                  <input
                    id="email-address"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="bg-white  block w-full pl-10 pr-3 py-3 border border-gray-700 rounded-md shadow-sm placeholder-gray-400 text-black text-sm transition-colors duration-200"
                    placeholder="Enter your email"
                  />
                </div>
              </motion.div>
              
              {/* Phone Number Field */}
              <motion.div variants={itemVariants}>
                <label htmlFor="phone-number" className="block text-sm font-medium text-gray-300">
                  Phone Number
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                    </svg>
                  </div>
                  <input
                    id="phone-number"
                    name="phoneNumber"
                    type="tel"
                    required
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    className="bg-white  block w-full pl-10 pr-3 py-3 border border-gray-700 rounded-md shadow-sm placeholder-gray-400 text-black text-sm transition-colors duration-200"
                    placeholder="Enter your phone number"
                  />
                </div>
              </motion.div>

              {/* Role Field */}
              {/* <motion.div variants={itemVariants}>
                <label htmlFor="role" className="block text-sm font-medium text-gray-300">
                  Role
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <select
                    id="role"
                    name="role"
                    required
                    value={formData.role}
                    onChange={handleChange}
                    className="bg-gray-800 focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 pr-3 py-3 border border-gray-700 rounded-md shadow-sm placeholder-gray-400 text-gray-100 text-sm transition-colors duration-200"
                  >
                    <option value="">Select your role</option>
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
              </motion.div> */}
              
              <motion.div variants={itemVariants}>
                <label htmlFor="password" className="block text-sm font-medium text-gray-300">
                  Password
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    className="bg-gray-800  block w-full pl-10 pr-3 py-3 border border-gray-700 rounded-md shadow-sm placeholder-gray-400 text-gray-100 text-sm transition-colors duration-200"
                    placeholder="Create a password"
                  />
                </div>
              </motion.div>
              
              <motion.div variants={itemVariants}>
                <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-300">
                  Confirm Password
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <input
                    id="confirm-password"
                    name="confirmPassword"
                    type="password"
                    required
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="bg-white  block w-full pl-10 pr-3 py-3 border border-gray-700 rounded-md shadow-sm placeholder-gray-400 text-black text-sm transition-colors duration-200"
                    placeholder="Confirm your password"
                  />
                </div>
              </motion.div>
            </div>

            <motion.div className="flex items-center" variants={itemVariants}>
              <input
                id="accept-terms"
                name="accept-terms"
                type="checkbox"
                checked={acceptTerms}
                onChange={(e) => setAcceptTerms(e.target.checked)}
                className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-700 rounded bg-gray-800"
                required
              />
              <label htmlFor="accept-terms" className="ml-2 block text-sm text-gray-300">
                I accept the <a href="#" className="text-[#FBBF24] hover:text-yellow-600 transition-colors duration-200">Terms and Conditions</a>
              </label>
            </motion.div>

            <motion.div variants={itemVariants}>
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#FBBF24] hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <svg
                    className="h-5 w-5 text-[#a78633] group-hover:text-yellow-800"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
                Create Account
              </motion.button>
            </motion.div>
          </form>

          {/* Social signup option */}
          <div className="mt-6">
            <motion.div className="relative" variants={itemVariants}>
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-700" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2  text-gray-400">Or continue with</span>
              </div>
            </motion.div>

            <motion.div className="mt-6" variants={itemVariants}>
              <motion.button
                onClick={() => console.log('Attempting to register with Google')}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full flex justify-center items-center py-3 px-4 border border-yellow-500 rounded-md shadow-sm  text-sm font-medium dark:bg-[#4a4a48] text-gray-300 hover:dark:dark:bg-[#2d2d2e] transition-colors duration-200"
              >
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                  <path
                    fill="#EA4335"
                    d="M5.26620003,9.76452941 C6.19878754,6.93863203 8.85444915,4.90909091 12,4.90909091 C13.6909091,4.90909091 15.2181818,5.50909091 16.4181818,6.49090909 L19.9090909,3 C17.7818182,1.14545455 15.0545455,0 12,0 C7.27006974,0 3.1977497,2.69829785 1.23999023,6.65002441 L5.26620003,9.76452941 Z"
                  />
                  <path
                    fill="#34A853"
                    d="M16.0407269,18.0125889 C14.9509167,18.7163016 13.5660892,19.0909091 12,19.0909091 C8.86648613,19.0909091 6.21911939,17.076871 5.27698177,14.2678769 L1.23746264,17.3349879 C3.19279051,21.2970142 7.26500293,24 12,24 C14.9328362,24 17.7353462,22.9573905 19.834192,20.9995801 L16.0407269,18.0125889 Z"
                  />
                  <path
                    fill="#4A90E2"
                    d="M19.834192,20.9995801 C22.0291676,18.9520994 23.4545455,15.903663 23.4545455,12 C23.4545455,11.2909091 23.3454545,10.5818182 23.1272727,9.90909091 L12,9.90909091 L12,14.7272727 L18.4363636,14.7272727 C18.1187732,16.013119 17.2662994,17.0926947 16.0407269,18.0125889 L19.834192,20.9995801 Z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.27698177,14.2678769 C5.03832634,13.556323 4.90909091,12.7937589 4.90909091,12 C4.90909091,11.2182781 5.03443647,10.4668121 5.26620003,9.76452941 L1.23999023,6.65002441 C0.43658717,8.26043162 0,10.0753848 0,12 C0,13.9195484 0.444780743,15.7301709 1.23746264,17.3349879 L5.27698177,14.2678769 Z"
                  />
                </svg>
                Sign up with Google
              </motion.button>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default RegisterPage;