
import { Link, NavLink, useNavigate } from "react-router-dom";
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { AuthContext } from '../context/AuthContext';


function Navbar() {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState('');
  const [userProfilePicture, setUserProfilePicture] = useState("");
  const [userRole, setUserRole] = useState('');
  const [isSticky, setIsSticky] = useState(false);
  //منع اليوزر من الداش بورد
  const { user } = useContext(AuthContext);


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
  // useEffect(() => {
  //   const fetchUser = async () => {
  //     try {
  //       const response = await axios.get("http://localhost:5000/api/users/check-auth", {
  //         withCredentials: true,
  //       });
  //       const user = response.data.user;
  //       setUserName(user.name);
  //       setUserProfilePicture(user.profilePicture);
  //       setIsAuthenticated(true);
  //     } catch (err) {
  //       setIsAuthenticated(false);
  //     }
  //   };

  //   fetchUser();
  // }, []);

  {
    user && (
      <div className="flex items-center space-x-3">
        <span>Hello, {user.name}</span>
        <img src={user.profilePicture} className="w-8 h-8 rounded-full" />
      </div>
    )
  }


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
    <nav className={`bg-white border-gray-200 dark:bg-[#FBBF24] shadow-md ${isSticky ? 'fixed top-0 left-0 right-0 z-50 transition-transform duration-300' : ''}`}>
      <div className="flex flex-wrap items-center justify-between mx-auto p-4">


        {/* logo */}
        <a href="/" className="block">
            {/* <h2 className="text-gray-900 font-bold text-3xl "> */}
            <img width={200} src="/classic-cars-high-resolution-logo-transparent.png" className="mr-28"/>
            {/* Classic<span className="text-green-500">Cars</span> */}
            {/* </h2> */}
        </a>











        {/* Authentication Buttons */}
        <div className="flex md:order-3">
          {isAuthenticated ? (
            <button
              className="font-[Playfair Display] text-white bg-black hover:bg-black focus:ring-2 focus:ring-[#2d2d2e7d] font-medium rounded-lg text-sm px-4 py-2 transition-colors duration-300"
              onClick={handleLogout}
            >
              Logout
            </button>
          ) : (
            <div className="flex space-x-3">
              <Link
                to="/login"
                className="font-[Playfair Display] text-black hover:text-white border border-black hover:bg-black focus:ring-2 focus:ring-[#2d2d2e7d] font-medium rounded-lg text-sm px-4 py-2 text-center transition-colors duration-300"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="font-[Playfair Display] text-white bg-black hover:bg-black focus:ring-2 focus:ring-[#2d2d2e7d] font-medium rounded-lg text-sm px-4 py-2 text-center transition-colors duration-300"
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
          <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border  rounded-lg  md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0  ">






            <NavLink
              to="/"
              className={({ isActive }) =>
                `font-[Playfair Display] block py-2 px-3 text-2xl md:p-0  transition-colors duration-300
    ${isActive
                  ? 'border-b-2 border-white text-white' // active link
                  : 'text-gray-900 hover:bg-white md:hover:bg-transparent md:hover:text-white dark:hover:text-white'
                }`
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/cars"
              className={({ isActive }) =>
                `font-[Playfair Display] block py-2 px-3 text-2xl md:p-0  transition-colors duration-300
    ${isActive
                  ? 'border-b-2 border-white text-white' // active link
                  : 'text-gray-900 hover:bg-white md:hover:bg-transparent md:hover:text-white dark:hover:text-white'
                }`
              }
            >
              Cars
            </NavLink>

            <NavLink
              to="/bikes"
              className={({ isActive }) =>
                `font-[Playfair Display] block py-2 px-3 text-2xl md:p-0  transition-colors duration-300
    ${isActive
                  ? 'border-b-2 border-white text-white' // active link
                  : 'text-gray-900 hover:bg-white md:hover:bg-transparent md:hover:text-white dark:hover:text-white'
                }`
              }
            >
              Bikes
            </NavLink>

            <NavLink
              to="/payment"
              className={({ isActive }) =>
                `font-[Playfair Display] block py-2 px-3 text-2xl md:p-0 transition-colors duration-300
    ${isActive
                  ? 'border-b-2 border-white text-white' // active link
                  : 'text-gray-900 hover:bg-white md:hover:bg-transparent md:hover:text-white dark:hover:text-white'
                }`
              }
            >
              payment
            </NavLink>

            {userRole === 'admin' && (

              <NavLink
                to="/admin-dashboard"
                className={({ isActive }) =>
                  `font-[Playfair Display] block py-2 px-3 text-2xl md:p-0 transition-colors duration-300
    ${isActive
                    ? 'border-b-2 border-white text-white' // active link
                    : 'text-gray-900 hover:bg-white md:hover:bg-transparent md:hover:text-white dark:hover:text-white'
                  }`
                }
              >
                dashboard
              </NavLink>
            )}

            <NavLink
              to="/contact"
              className={({ isActive }) =>
                `font-[Playfair Display] block py-2 px-3 text-2xl md:p-0 transition-colors duration-300
    ${isActive
                  ? 'border-b-2 border-white text-white' // active link
                  : 'text-gray-900 hover:bg-white md:hover:bg-transparent md:hover:text-white dark:hover:text-white'
                }`
              }
            >
              Contact

            </NavLink>

            <NavLink
              to="/about"
              className={({ isActive }) =>
                `font-[Playfair Display] block py-2 px-3 text-2xl md:p-0  transition-colors duration-300
    ${isActive
                  ? 'border-b-2 border-white text-white' // active link
                  : 'text-gray-900 hover:bg-white md:hover:bg-transparent md:hover:text-white dark:hover:text-white'
                }`
              }
            >
              About
            </NavLink>


          </ul>


          {/* User Greeting (when authenticated) */}
          {isAuthenticated && userName && (
            <div className="hidden md:flex items-center ml-10">
              <div className="flex items-center space-x-3">

                {/* رابط حول صورة البروفايل */}
                <span className="font-[Playfair Display] text-gray-900 ">
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
                    <div className="w-8 h-8 rounded-full bg-yellow-600 flex items-center justify-center text-white font-semibold hover:opacity-80 transition">
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