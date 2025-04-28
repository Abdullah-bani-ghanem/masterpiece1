import React from 'react';
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from 'axios';
import Swal from 'sweetalert2';


function Navbar() {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState('');
  const [userProfilePicture, setUserProfilePicture] = useState("");
  const [isSticky, setIsSticky] = useState(false);
  //منع اليوزر من الداش بورد
  const [userRole, setUserRole] = useState('');


  //منع اليوزر من الداش بورد
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/users/check-auth", {
          withCredentials: true,
        });
        const user = response.data.user;
        setUserName(user.name);
        setUserProfilePicture(user.profilePicture);
        setUserRole(user.role); // ✅ أضف هذا السطر لتخزين الرول
        setIsAuthenticated(true);
      } catch (err) {
        setIsAuthenticated(false);
      }
    };

    fetchUser();
  }, []);




  // خاص بصوره البروفايل جنب هلو يوزر
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/users/check-auth", {
          withCredentials: true,
        });
        const user = response.data.user;
        setUserName(user.name);
        setUserProfilePicture(user.profilePicture);
        setIsAuthenticated(true);
      } catch (err) {
        setIsAuthenticated(false);
      }
    };

    fetchUser();
  }, []);


  // Check authentication status when page loads
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/users/check-auth", {
          withCredentials: true, // Important to send cookies
        });
        // console.log(res,"res")
        if (res.data.authenticated || res.data.success) {
          setIsAuthenticated(true);

          // Try different possible locations for the user data
          if (res.data.user && res.data.user.name) {
            setUserName(res.data.user.name);
          } else if (res.data.name) {
            setUserName(res.data.name);
          } else if (res.data.username) {
            setUserName(res.data.username);
          } else if (res.data.user && res.data.user.username) {
            setUserName(res.data.user.username);
          } else {
            // If we can't find the name, set a default
            setUserName("User");
          }
        } else {
          setIsAuthenticated(false);
          setUserName('');
        }
      } catch (error) {
        console.error("Authentication check error:", error);
        setIsAuthenticated(false);
        setUserName('');
      }
    };

    checkAuthStatus();

    // Rest of the useEffect code for scroll handling
    // ...
  }, [location.pathname]);

  // Handle logout functionality
  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:5000/api/users/logout", {}, { withCredentials: true });
      setIsAuthenticated(false);
      setUserName('');

      // Using SweetAlert with gray-800 background
      Swal.fire({
        title: 'Success!',
        text: 'Logged out successfully',
        icon: 'success',
        confirmButtonText: 'OK',
        timer: 2000,
        timerProgressBar: true,
        background: '#1f2937', // This is the equivalent of gray-800
        iconColor: '#10b981', // A nice green color for the success icon
        color: '#ffffff', // White text for better contrast
        confirmButtonColor: '#3b82f6' // Blue button
      });

      navigate('/'); // Redirect to home page
    } catch (error) {
      // Using SweetAlert with gray-800 background for error too
      Swal.fire({
        title: 'Error!',
        text: 'An error occurred during logout',
        icon: 'error',
        confirmButtonText: 'OK',
        background: '#1f2937', // gray-800
        iconColor: '#ef4444', // Red color for the error icon
        color: '#ffffff', // White text
        confirmButtonColor: '#3b82f6' // Blue button
      });
    }
  };

  return (
    <nav className={`bg-white border-gray-200 dark:bg-gray-900 shadow-md ${isSticky ? 'fixed top-0 left-0 right-0 z-50 transition-transform duration-300' : ''}`}>
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">


        {/* logo */}
        <a href="/" className="block">
          <div className="font-[Playfair Display] bg-white rounded-lg p-0 inline-block  ">
            <h2 className="text-gray-900 font-bold text-3xl ">
              Classic<span className="text-green-500">Cars</span>
            </h2>
          </div>
        </a>











        {/* Authentication Buttons */}
        <div className="flex md:order-3">
          {isAuthenticated ? (
            <button
              className="font-[Playfair Display] text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-4 py-2 transition-colors duration-300"
              onClick={handleLogout}
            >
              Logout
            </button>
          ) : (
            <div className="flex space-x-3">
              <Link
                to="/login"
                className="font-[Playfair Display] text-green-600 hover:text-white border border-green-600 hover:bg-green-600 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-4 py-2 text-center transition-colors duration-300"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="font-[Playfair Display] text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-4 py-2 text-center transition-colors duration-300"
              >
                Register
              </Link>
            </div>
          )}
        </div>

        {/* Language Selector */}
        <div className="flex items-center md:order-2 ml-4">





          {/* Mobile Menu Toggle Button */}
          <button
            data-collapse-toggle="navbar-language"
            type="button"
            className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-language"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-6 h-6"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
        </div>

        {/* Main Navigation */}
        <div
          className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
          id="navbar-language"
        >
          <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">




            <li>
              <Link
                to="/"
                className="font-[Playfair Display] block py-2 px-3 text-2xl md:p-0 text-gray-900 rounded-lg hover:bg-gray-100 md:hover:bg-transparent md:hover:text-green-600 dark:text-white md:dark:hover:text-green-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 transition-colors duration-300"
                aria-current="page"
              >
                Home
              </Link>
            </li>





            <li>
              <Link
                to="/cars"
                className="font-[Playfair Display] block py-2 px-3 text-2xl md:p-0 text-gray-900 rounded-lg hover:bg-gray-100 md:hover:bg-transparent md:hover:text-green-600 dark:text-white md:dark:hover:text-green-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 transition-colors duration-300"
              >
                Cars
              </Link>
            </li>


            <li>
              <Link
                to="/bikes"
                className="font-[Playfair Display] block py-2 px-3 text-2xl md:p-0 text-gray-900 rounded-lg hover:bg-gray-100 md:hover:bg-transparent md:hover:text-green-600 dark:text-white md:dark:hover:text-green-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 transition-colors duration-300"
              >
                Bikes
              </Link>
            </li>

            {/* <li>
              <Link
                to="/userProfile"
                className="font-[Playfair Display] block py-2 px-3 text-2xl md:p-0 text-gray-900 rounded-lg hover:bg-gray-100 md:hover:bg-transparent md:hover:text-green-600 dark:text-white md:dark:hover:text-green-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 transition-colors duration-300"
              >
                UserProfile
              </Link>
            </li> */}





            <li>
              <Link
                to="/payment"
                className="font-[Playfair Display] block py-2 px-3 text-2xl md:p-0 text-gray-900 rounded-lg hover:bg-gray-100 md:hover:bg-transparent md:hover:text-green-600 dark:text-white md:dark:hover:text-green-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 transition-colors duration-300"
              >
                payment
              </Link>
            </li>






            {/* <li>
              <Link
                to="/form"
                className="font-[Playfair Display] block py-2 px-3 text-2xl md:p-0 text-gray-900 rounded-lg hover:bg-gray-100 md:hover:bg-transparent md:hover:text-green-600 dark:text-white md:dark:hover:text-green-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 transition-colors duration-300"
              >
                form
              </Link>

            </li> */}





            {userRole === 'admin' && (
              <li>
                <Link
                  to="/admin-dashboard"
                  className="font-[Playfair Display] block py-2 px-3 text-2xl md:p-0 text-gray-900 rounded-lg hover:bg-gray-100 md:hover:bg-transparent md:hover:text-green-600 dark:text-white md:dark:hover:text-green-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 transition-colors duration-300"
                >
                  dashboard
                </Link>
              </li>
            )}




            <li>
              <Link
                to="/contact"
                className="font-[Playfair Display] block py-2 px-3 text-2xl md:p-0 text-gray-900 rounded-lg hover:bg-gray-100 md:hover:bg-transparent md:hover:text-green-600 dark:text-white md:dark:hover:text-green-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 transition-colors duration-300"
              >
                Contact
              </Link>
            </li>





            <li>
              <Link
                to="/about"
                className="font-[Playfair Display] block py-2 px-3 text-2xl md:p-0 text-gray-900 rounded-lg hover:bg-gray-100 md:hover:bg-transparent md:hover:text-green-600 dark:text-white md:dark:hover:text-green-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 transition-colors duration-300"
              >
                About
              </Link>
            </li>





            


           



          </ul>


          {/* User Greeting (when authenticated) */}
          {isAuthenticated && userName && (
            <div className="hidden md:flex items-center ml-10">
              <div className="flex items-center space-x-3">

                {/* رابط حول صورة البروفايل */}
                <span className="font-[Playfair Display] text-gray-700 dark:text-gray-300">
                  Hello, <span className="font-[Playfair Display]">{userName}</span>
                </span>
                <a href="/userprofile">
                  {userProfilePicture ? (
                    // ✅ إذا وُجدت صورة شخصية، نعرضها
                    <img
                      src={userProfilePicture}
                      alt={userName}
                      className="w-8 h-8 rounded-full object-cover border border-gray-400 hover:opacity-80 transition"
                    />
                  ) : (
                    // ❌ إذا ما فيه صورة، نعرض أول حرف من الاسم
                    <div className="w-8 h-8 rounded-full bg-green-600 flex items-center justify-center text-white font-semibold hover:opacity-80 transition">
                      {userName.charAt(0).toUpperCase()}
                    </div>
                  )}
                </a>

              </div>
            </div>
          )}




        </div>
      </div>
    </nav>
  );
}

export default Navbar;