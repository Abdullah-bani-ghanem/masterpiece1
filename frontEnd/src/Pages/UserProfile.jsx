// import React, { useEffect, useState } from 'react';
// import { FaUserCircle, FaEnvelope, FaPhone, FaMapMarkerAlt, FaCalendarAlt, FaPencilAlt, FaSignOutAlt } from 'react-icons/fa';
// // import { MdVerified } from 'react-icons/md'; // بديل لـ FaBadgeCheck
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import Swal from 'sweetalert2';

// const UserProfile = () => {
//   const [userData, setUserData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [isEditing, setIsEditing] = useState(false);
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     phoneNumber: '',
//     address: '',
//     bio: '',
//     profilePicture: ''
//   });
//   const [imageFile, setImageFile] = useState(null);
//   const [imagePreview, setImagePreview] = useState(null);

//   const navigate = useNavigate();
//   const API_BASE_URL = "http://localhost:5000/api";

//   useEffect(() => {
//     const fetchUserData = async () => {
//       try {
//         const response = await axios.get(`${API_BASE_URL}/users/check-auth`, {
//           withCredentials: true,
//         });

//         const user = response.data.user;
//         setUserData(user);
//         setFormData({
//           name: user.name || '',
//           email: user.email || '',
//           phoneNumber: user.phoneNumber || '',
//           address: user.address || '',
//           bio: user.bio || '',
//           profilePicture: user.profilePicture || ''
//         });
//         setLoading(false);
//       } catch (err) {
//         console.error("Error fetching data:", err);
//         setError(err.response?.data?.message || 'Authentication verification failed');
//         setLoading(false);
//       }
//     };

//     fetchUserData();
//   }, []);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setImageFile(file);
//       // Create temporary URL for the selected image to show preview
//       const previewURL = URL.createObjectURL(file);
//       setImagePreview(previewURL);
//     }
//   };

//   const handleProfileUpdate = async (e) => {
//     e.preventDefault();
//     try {
//       // Create FormData to send form data with image
//       const submitData = new FormData();
//       for (const key in formData) {
//         if (key !== 'profilePicture' || !imageFile) {
//           submitData.append(key, formData[key]);
//         }
//       }
  
//       // Append image file if selected
//       if (imageFile) {
//         submitData.append('profileImage', imageFile);
//       }
  
//       const response = await axios.put(`${API_BASE_URL}/users/update-profile`, submitData, {
//         withCredentials: true,
//         headers: {
//           'Content-Type': 'multipart/form-data'
//         }
//       });
  
//       // Get updated user data from response
//       const updatedUser = response.data.user || response.data;
  
//       // Update local user state including new profile picture if available
//       const updatedUserData = {
//         ...userData,
//         ...formData,
//         profilePicture: updatedUser.profilePicture || userData.profilePicture
//       };
  
//       setUserData(updatedUserData);
//       setIsEditing(false);
  
//       // Revoke preview and reset image state
//       if (imagePreview) {
//         URL.revokeObjectURL(imagePreview);
//         setImagePreview(null);
//       }
//       setImageFile(null);
  
//       Swal.fire({
//         icon: 'success',
//         title: 'Profile Updated',
//         text: 'Your profile has been updated successfully!',
//         confirmButtonText: 'OK'
//       });
//     } catch (err) {
//       Swal.fire({
//         icon: 'error',
//         title: 'Update Failed',
//         text: err.response?.data?.message || err.message || 'An error occurred while updating the profile.',
//         confirmButtonText: 'OK'
//       });
//     }
//   };

//   const handleLogout = async () => {
//     try {
//       await axios.post(`${API_BASE_URL}/users/logout`, {}, {
//         withCredentials: true,
//       });
      
//       Swal.fire({
//         icon: 'success',
//         title: 'Logged Out',
//         text: 'You have been successfully logged out.',
//         confirmButtonText: 'OK'
//       }).then(() => {
//         navigate('/login');
//       });
//     } catch (err) {
//       Swal.fire({
//         icon: 'error',
//         title: 'Logout Failed',
//         text: 'An error occurred during logout. You will be redirected to the login page.',
//         confirmButtonText: 'OK'
//       }).then(() => {
//         navigate('/login');
//       });
//     }
//   };

//   // Determine the appropriate source for the image
//   const getProfileImageSource = () => {
//     // Use preview if a new image has been selected
//     if (imagePreview) {
//       return imagePreview;
//     }
//     // Use existing image if available
//     if (userData?.profilePicture) {
//       return userData.profilePicture;
//     }
//     // No image
//     return null;
//   };

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-screen bg-gray-900 text-white">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-green-500 mx-auto mb-4"></div>
//           <div className="text-2xl text-green-400">Loading profile data...</div>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="flex flex-col justify-center items-center h-screen bg-gray-900 text-white">
//         <div className="text-xl text-red-400 mb-4">{error}</div>
//         <button
//           onClick={() => navigate('/login')}
//           className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition duration-300"
//         >
//           Login
//         </button>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-900 text-white pb-16">
//       {/* Hero Section with username prominently displayed */}
//       <div className="bg-gradient-to-r from-gray-800 to-gray-900 bg-opacity-90 bg-blend-overlay bg-center bg-cover py-14" 
//           style={{ backgroundImage: 'url("https://media.istockphoto.com/id/643897728/photo/woman-using-her-laptop.jpg?s=612x612&w=0&k=20&c=TzNngBCujgdkhwZQ6cctEVyjOAAudJLBytR8M-UHsh4=")' }}>
//         <div className="container mx-auto px-4 text-center text-white">
//           <h2 className="font-sans text-2xl md:text-3xl font-medium mb-2 text-green-400">Welcome back</h2>
//           <h1 className="font-sans text-5xl md:text-6xl font-bold mb-6 drop-shadow-lg">
//             {userData?.name || 'User Profile'}
//             {userData?.verified && (
//               <span className="inline-block ml-3 text-green-400">
//                 <FaBadgeCheck className="inline-block" />
//               </span>
//             )}
//           </h1>
//           <p className="font-sans text-xl md:text-2xl max-w-3xl mx-auto text-gray-300">
//             Manage your personal information and account settings
//           </p>
//         </div>
//       </div>

//       <div className="max-w-4xl mx-auto bg-gray-800 rounded-lg shadow-2xl overflow-hidden border border-gray-700 mt-10 transform transition-all duration-300 hover:shadow-green-900/30">
//         {/* Header with larger profile image and username */}
//         <div className="relative">
//           {/* Background gradient */}
//           <div className="bg-gradient-to-r from-green-700 to-teal-700 h-48"></div>
          
//           {/* Profile image - moved down to overlap the gradient section */}
//           <div className="absolute left-10 transform -translate-y-1/2">
//             <div className="relative group">
//               {getProfileImageSource() ? (
//                 <img
//                   src={getProfileImageSource()}
//                   alt={userData.name}
//                   className="w-36 h-36 rounded-full border-4 border-white shadow-xl object-cover group-hover:border-green-400 transition-all duration-300"
//                 />
//               ) : (
//                 <div className="w-36 h-36 rounded-full bg-gray-700 flex items-center justify-center border-4 border-white shadow-xl group-hover:border-green-400 transition-all duration-300">
//                   <FaUserCircle className="w-24 h-24 text-white" />
//                 </div>
//               )}
              
//               {/* Edit overlay that appears on hover when in view mode */}
//               {!isEditing && (
//                 <div 
//                   onClick={() => setIsEditing(true)}
//                   className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 cursor-pointer transition-all duration-300"
//                 >
//                   <FaPencilAlt className="text-white text-xl" />
//                 </div>
//               )}
//             </div>
//           </div>
          
//           {/* Logout button */}
//           <div className="absolute right-6 top-6">
//             <button
//               onClick={handleLogout}
//               className="flex items-center text-white bg-gray-800 bg-opacity-70 px-4 py-2 rounded-lg hover:bg-red-700 transition duration-300"
//             >
//               <FaSignOutAlt className="mr-2" />
//               <span>Logout</span>
//             </button>
//           </div>
//         </div>
        
//         {/* User Data section with username prominently displayed */}
//         <div className="relative px-6 pb-8 pt-20">
//           <div className="flex justify-between items-center mb-6">
//             <div>
//               <h1 className="text-3xl font-bold text-white">
//                 {userData?.name || 'User Name'}
//               </h1>
//               <p className="text-green-400">@{userData?.username || userData?.name?.toLowerCase().replace(/\s+/g, '') || 'username'}</p>
//             </div>
            
//             <button 
//               onClick={() => setIsEditing(!isEditing)}
//               className="flex items-center bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition duration-300"
//             >
//               <FaPencilAlt className="mr-2" />
//               <span>{isEditing ? 'Cancel Edit' : 'Edit Profile'}</span>
//             </button>
//           </div>
          
//           {isEditing ? (
//             <form onSubmit={handleProfileUpdate} className="space-y-6">
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 <div className="col-span-2 md:col-span-1">
//                   <label className="block text-gray-200 font-medium mb-2">Full Name</label>
//                   <input
//                     type="text"
//                     name="name"
//                     value={formData.name}
//                     onChange={handleInputChange}
//                     className="w-full px-4 py-3 border border-gray-600 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
//                     required
//                   />
//                 </div>
//                 <div className="col-span-2 md:col-span-1">
//                   <label className="block text-gray-200 font-medium mb-2">Email</label>
//                   <input
//                     type="email"
//                     name="email"
//                     value={formData.email}
//                     onChange={handleInputChange}
//                     className="w-full px-4 py-3 border border-gray-600 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
//                     required
//                   />
//                 </div>
//                 <div className="col-span-2 md:col-span-1">
//                   <label className="block text-gray-200 font-medium mb-2">Phone Number</label>
//                   <input
//                     type="text"
//                     name="phoneNumber"
//                     value={formData.phoneNumber}
//                     onChange={handleInputChange}
//                     className="w-full px-4 py-3 border border-gray-600 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
//                   />
//                 </div>
//                 <div className="col-span-2 md:col-span-1">
//                   <label className="block text-gray-200 font-medium mb-2">Address</label>
//                   <input
//                     type="text"
//                     name="address"
//                     value={formData.address}
//                     onChange={handleInputChange}
//                     className="w-full px-4 py-3 border border-gray-600 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
//                   />
//                 </div>
//               </div>
//               <div>
//                 <label className="block text-gray-200 font-medium mb-2">Bio</label>
//                 <textarea
//                   name="bio"
//                   value={formData.bio}
//                   onChange={handleInputChange}
//                   rows="4"
//                   className="w-full px-4 py-3 border border-gray-600 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
//                   placeholder="Tell us about yourself..."
//                 ></textarea>
//               </div>
//               <div>
//                 <label className="block text-gray-200 font-medium mb-2">Profile Picture</label>
//                 <div className="flex flex-col space-y-4">
//                   {/* Current or selected image preview */}
//                   {getProfileImageSource() && (
//                     <div className="relative w-24 h-24 mt-2">
//                       <img 
//                         src={getProfileImageSource()} 
//                         className="w-24 h-24 rounded-full object-cover border-2 border-green-500"
//                         alt="Image Preview" 
//                       />
//                     </div>
//                   )}

//                   <div className="flex flex-col">
//                     <label className="flex items-center justify-center px-4 py-3 border border-gray-600 rounded-md bg-gray-700 text-white hover:bg-gray-600 transition cursor-pointer">
//                       <input
//                         type="file"
//                         className="hidden"
//                         onChange={handleImageChange}
//                         accept="image/*"
//                       />
//                       <span>Choose an image from your device</span>
//                     </label>
//                     <p className="text-xs text-gray-400 mt-2">
//                       * Preferably use a square image with dimensions of at least 400×400 pixels
//                     </p>
//                   </div>
//                 </div>
//               </div>
//               <div className="flex justify-end">
//                 <button
//                   type="submit"
//                   className="px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 transition duration-300 shadow-lg hover:shadow-green-600/50"
//                 >
//                   Save Changes
//                 </button>
//               </div>
//             </form>
//           ) : (
//             <div className="space-y-4">
//               {/* Username Display Card */}
//               <div className="p-6 mb-6 bg-gradient-to-r from-gray-700 to-gray-800 rounded-lg border-l-4 border-green-500 shadow-lg">
//                 <h3 className="text-sm text-green-400 uppercase font-semibold mb-1">Username</h3>
//                 <div className="flex items-center">
//                   <FaUserCircle className="text-green-400 text-xl mr-3" />
//                   <p className="text-white text-lg font-medium">{userData?.username || userData?.name?.toLowerCase().replace(/\s+/g, '') || 'username'}</p>
//                 </div>
//               </div>
              
//               <div className="flex items-center p-4 border-b border-gray-600 hover:bg-gray-700 rounded-md transition duration-200">
//                 <FaEnvelope className="text-green-400 text-xl mr-4" />
//                 <div>
//                   <h3 className="text-sm text-gray-400">Email</h3>
//                   <p className="text-white">{userData?.email || 'No email available'}</p>
//                 </div>
//               </div>
              
//               <div className="flex items-center p-4 border-b border-gray-600 hover:bg-gray-700 rounded-md transition duration-200">
//                 <FaPhone className="text-green-400 text-xl mr-4" />
//                 <div>
//                   <h3 className="text-sm text-gray-400">Phone Number</h3>
//                   <p className="text-white">{userData?.phoneNumber || 'No phone number available'}</p>
//                 </div>
//               </div>
              
//               <div className="flex items-center p-4 border-b border-gray-600 hover:bg-gray-700 rounded-md transition duration-200">
//                 <FaMapMarkerAlt className="text-green-400 text-xl mr-4" />
//                 <div>
//                   <h3 className="text-sm text-gray-400">Address</h3>
//                   <p className="text-white">{userData?.address || 'No address available'}</p>
//                 </div>
//               </div>
              
//               <div className="flex items-center p-4 border-b border-gray-600 hover:bg-gray-700 rounded-md transition duration-200">
//                 <FaCalendarAlt className="text-green-400 text-xl mr-4" />
//                 <div>
//                   <h3 className="text-sm text-gray-400">Join Date</h3>
//                   <p className="text-white">
//                     {userData?.createdAt 
//                       ? new Date(userData.createdAt).toLocaleDateString('en-US', {
//                           year: 'numeric',
//                           month: 'long',
//                           day: 'numeric'
//                         })
//                       : 'Unknown'}
//                   </p>
//                 </div>
//               </div>
              
//               {userData?.bio ? (
//                 <div className="p-5 mt-6 bg-gray-700 rounded-lg border-l-4 border-green-500 shadow-md">
//                   <h3 className="text-lg font-medium text-green-400 mb-2">About Me</h3>
//                   <p className="text-gray-100 leading-relaxed">{userData.bio}</p>
//                 </div>
//               ) : (
//                 <div className="p-5 mt-6 bg-gray-700 rounded-lg border-l-4 border-gray-500 shadow-md opacity-75">
//                   <h3 className="text-lg font-medium text-gray-400 mb-2">About Me</h3>
//                   <p className="text-gray-300">No bio information available. Click 'Edit Profile' to add your bio.</p>
//                 </div>
//               )}
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UserProfile;





import React, { useEffect, useState } from 'react';
import { FaUserCircle, FaEnvelope, FaPhone, FaMapMarkerAlt, FaCalendarAlt, FaPencilAlt, FaSignOutAlt, FaTrash, FaHeart, FaCar, FaMotorcycle, FaPlus } from 'react-icons/fa';
// import { MdVerified } from 'react-icons/md'; // بديل لـ FaBadgeCheck
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const UserProfile = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    address: '',
    bio: '',
    profilePicture: ''
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  
  // Wish list states
  const [wishlistItems, setWishlistItems] = useState([]);
  const [activeWishlistTab, setActiveWishlistTab] = useState('cars');
  const [showAddWishlistItem, setShowAddWishlistItem] = useState(false);
  const [newWishlistItem, setNewWishlistItem] = useState({
    type: 'car',
    name: '',
    model: '',
    year: '',
    imageUrl: ''
  });

  const navigate = useNavigate();
  const API_BASE_URL = "http://localhost:5000/api";

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/users/check-auth`, {
          withCredentials: true,
        });

        const user = response.data.user;
        setUserData(user);
        setFormData({
          name: user.name || '',
          email: user.email || '',
          phoneNumber: user.phoneNumber || '',
          address: user.address || '',
          bio: user.bio || '',
          profilePicture: user.profilePicture || ''
        });
        setLoading(false);
        
        // Fetch wishlist items
        fetchWishlistItems();
      } catch (err) {
        console.error("Error fetching data:", err);
        setError(err.response?.data?.message || 'Authentication verification failed');
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  // Fetch wishlist items from the server
  const fetchWishlistItems = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/wishlist`, {
        withCredentials: true,
      });
      setWishlistItems(response.data.wishlist || []);
    } catch (err) {
      console.error("Error fetching wishlist:", err);
      setWishlistItems([]);
    }
  };
  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      // Create temporary URL for the selected image to show preview
      const previewURL = URL.createObjectURL(file);
      setImagePreview(previewURL);
    }
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    try {
      // Create FormData to send form data with image
      const submitData = new FormData();
      for (const key in formData) {
        if (key !== 'profilePicture' || !imageFile) {
          submitData.append(key, formData[key]);
        }
      }
  
      // Append image file if selected
      if (imageFile) {
        submitData.append('profileImage', imageFile);
      }
  
      const response = await axios.put(`${API_BASE_URL}/users/update-profile`, submitData, {
        withCredentials: true,
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
  
      // Get updated user data from response
      const updatedUser = response.data.user || response.data;
  
      // Update local user state including new profile picture if available
      const updatedUserData = {
        ...userData,
        ...formData,
        profilePicture: updatedUser.profilePicture || userData.profilePicture
      };
  
      setUserData(updatedUserData);
      setIsEditing(false);
  
      // Revoke preview and reset image state
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
        setImagePreview(null);
      }
      setImageFile(null);
  
      Swal.fire({
        icon: 'success',
        title: 'Profile Updated',
        text: 'Your profile has been updated successfully!',
        confirmButtonText: 'OK'
      });
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Update Failed',
        text: err.response?.data?.message || err.message || 'An error occurred while updating the profile.',
        confirmButtonText: 'OK'
      });
    }
  };

  const handleLogout = async () => {
    try {
      await axios.post(`${API_BASE_URL}/users/logout`, {}, {
        withCredentials: true,
      });
      
      Swal.fire({
        icon: 'success',
        title: 'Logged Out',
        text: 'You have been successfully logged out.',
        confirmButtonText: 'OK'
      }).then(() => {
        navigate('/login');
      });
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Logout Failed',
        text: 'An error occurred during logout. You will be redirected to the login page.',
        confirmButtonText: 'OK'
      }).then(() => {
        navigate('/login');
      });
    }
  };

  // Wishlist Functions
  const handleWishlistItemInputChange = (e) => {
    const { name, value } = e.target;
    setNewWishlistItem({
      ...newWishlistItem,
      [name]: value
    });
  };

  const handleAddWishlistItem = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_BASE_URL}/wishlist`, newWishlistItem, {
        withCredentials: true,
      });
      
      // Add new item to state
      setWishlistItems(response.data.wishlist);

      
      // Reset form and close modal
      setNewWishlistItem({
        type: activeWishlistTab === 'cars' ? 'car' : 'motorcycle',
        name: '',
        model: '',
        year: '',
        imageUrl: ''
      });
      setShowAddWishlistItem(false);
      
      Swal.fire({
        icon: 'success',
        title: 'Item Added',
        text: 'The item was added to your wishlist!',
        confirmButtonText: 'OK'
      });
    } catch (err) {
      Swal.fire({
        icon: 'error', 
        title: 'Failed to Add Item',
        text: err.response?.data?.message || 'An error occurred while adding the item.',
        confirmButtonText: 'OK'
      });
    }
  };

  const handleRemoveWishlistItem = async (itemId) => {
    try {
      const response = await axios.delete(`${API_BASE_URL}/wishlist/${itemId}`, {
        withCredentials: true,
      });
  
      setWishlistItems(response.data.wishlist);
  
      Swal.fire({
        icon: 'success',
        title: 'Item Removed',
        text: 'The item was removed from your wishlist!',
        confirmButtonText: 'OK'
      });
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Failed to Remove Item',
        text: err.response?.data?.message || 'An error occurred while removing the item.',
        confirmButtonText: 'OK'
      });
    }
  };
  

  // Determine the appropriate source for the image
  const getProfileImageSource = () => {
    // Use preview if a new image has been selected
    if (imagePreview) {
      return imagePreview;
    }
    // Use existing image if available
    if (userData?.profilePicture) {
      return userData.profilePicture;
    }
    // No image
    return null;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-900 text-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-green-500 mx-auto mb-4"></div>
          <div className="text-2xl text-green-400">Loading profile data...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col justify-center items-center h-screen bg-gray-900 text-white">
        <div className="text-xl text-red-400 mb-4">{error}</div>
        <button
          onClick={() => navigate('/login')}
          className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition duration-300"
        >
          Login
        </button>
      </div>
    );
  }

  // Filter wishlist items based on active tab
  const filteredWishlistItems = wishlistItems.filter(item => 
    activeWishlistTab === 'cars' ? item.type === 'car' : item.type === 'motorcycle'
  );

  return (
    <div className="min-h-screen bg-gray-900 text-white pb-16">
      {/* Hero Section with username prominently displayed */}
      <div className="bg-gradient-to-r from-gray-800 to-gray-900 bg-opacity-90 bg-blend-overlay bg-center bg-cover py-14" 
          style={{ backgroundImage: 'url("https://media.istockphoto.com/id/643897728/photo/woman-using-her-laptop.jpg?s=612x612&w=0&k=20&c=TzNngBCujgdkhwZQ6cctEVyjOAAudJLBytR8M-UHsh4=")' }}>
        <div className="container mx-auto px-4 text-center text-white">
          <h2 className="font-sans text-2xl md:text-3xl font-medium mb-2 text-green-400">Welcome back</h2>
          <h1 className="font-sans text-5xl md:text-6xl font-bold mb-6 drop-shadow-lg">
            {userData?.name || 'User Profile'}
            {userData?.verified && (
              <span className="inline-block ml-3 text-green-400">
                <FaBadgeCheck className="inline-block" />
              </span>
            )}
          </h1>
          <p className="font-sans text-xl md:text-2xl max-w-3xl mx-auto text-gray-300">
            Manage your personal information and account settings
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto bg-gray-800 rounded-lg shadow-2xl overflow-hidden border border-gray-700 mt-10 transform transition-all duration-300 hover:shadow-green-900/30">
        {/* Header with larger profile image and username */}
        <div className="relative">
          {/* Background gradient */}
          <div className="bg-gradient-to-r from-green-700 to-teal-700 h-48"></div>
          
          {/* Profile image - moved down to overlap the gradient section */}
          <div className="absolute left-10 transform -translate-y-1/2">
            <div className="relative group">
              {getProfileImageSource() ? (
                <img
                  src={getProfileImageSource()}
                  alt={userData.name}
                  className="w-36 h-36 rounded-full border-4 border-white shadow-xl object-cover group-hover:border-green-400 transition-all duration-300"
                />
              ) : (
                <div className="w-36 h-36 rounded-full bg-gray-700 flex items-center justify-center border-4 border-white shadow-xl group-hover:border-green-400 transition-all duration-300">
                  <FaUserCircle className="w-24 h-24 text-white" />
                </div>
              )}
              
              {/* Edit overlay that appears on hover when in view mode */}
              {!isEditing && (
                <div 
                  onClick={() => setIsEditing(true)}
                  className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 cursor-pointer transition-all duration-300"
                >
                  <FaPencilAlt className="text-white text-xl" />
                </div>
              )}
            </div>
          </div>
          
          {/* Logout button */}
          <div className="absolute right-6 top-6">
            <button
              onClick={handleLogout}
              className="flex items-center text-white bg-gray-800 bg-opacity-70 px-4 py-2 rounded-lg hover:bg-red-700 transition duration-300"
            >
              <FaSignOutAlt className="mr-2" />
              <span>Logout</span>
            </button>
          </div>
        </div>
        
        {/* User Data section with username prominently displayed */}
        <div className="relative px-6 pb-8 pt-20">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-3xl font-bold text-white">
                {userData?.name || 'User Name'}
              </h1>
              <p className="text-green-400">@{userData?.username || userData?.name?.toLowerCase().replace(/\s+/g, '') || 'username'}</p>
            </div>
            
            <button 
              onClick={() => setIsEditing(!isEditing)}
              className="flex items-center bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition duration-300"
            >
              <FaPencilAlt className="mr-2" />
              <span>{isEditing ? 'Cancel Edit' : 'Edit Profile'}</span>
            </button>
          </div>
          
          {isEditing ? (
            <form onSubmit={handleProfileUpdate} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="col-span-2 md:col-span-1">
                  <label className="block text-gray-200 font-medium mb-2">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-600 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                    required
                  />
                </div>
                <div className="col-span-2 md:col-span-1">
                  <label className="block text-gray-200 font-medium mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-600 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                    readOnly
                  />
                </div>
                <div className="col-span-2 md:col-span-1">
                  <label className="block text-gray-200 font-medium mb-2">Phone Number</label>
                  <input
                    type="text"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-600 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
                <div className="col-span-2 md:col-span-1">
                  <label className="block text-gray-200 font-medium mb-2">Address</label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-600 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
              </div>
              <div>
                <label className="block text-gray-200 font-medium mb-2">Bio</label>
                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleInputChange}
                  rows="4"
                  className="w-full px-4 py-3 border border-gray-600 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Tell us about yourself..."
                ></textarea>
              </div>
              <div>
                <label className="block text-gray-200 font-medium mb-2">Profile Picture</label>
                <div className="flex flex-col space-y-4">
                  {/* Current or selected image preview */}
                  {getProfileImageSource() && (
                    <div className="relative w-24 h-24 mt-2">
                      <img 
                        src={getProfileImageSource()} 
                        className="w-24 h-24 rounded-full object-cover border-2 border-green-500"
                        alt="Image Preview" 
                      />
                    </div>
                  )}

                  <div className="flex flex-col">
                    <label className="flex items-center justify-center px-4 py-3 border border-gray-600 rounded-md bg-gray-700 text-white hover:bg-gray-600 transition cursor-pointer">
                      <input
                        type="file"
                        className="hidden"
                        onChange={handleImageChange}
                        accept="image/*"
                      />
                      <span>Choose an image from your device</span>
                    </label>
                    <p className="text-xs text-gray-400 mt-2">
                      * Preferably use a square image with dimensions of at least 400×400 pixels
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 transition duration-300 shadow-lg hover:shadow-green-600/50"
                >
                  Save Changes
                </button>
              </div>
            </form>
          ) : (
            <div className="space-y-4">
              {/* Username Display Card */}
              <div className="p-6 mb-6 bg-gradient-to-r from-gray-700 to-gray-800 rounded-lg border-l-4 border-green-500 shadow-lg">
                <h3 className="text-sm text-green-400 uppercase font-semibold mb-1">Username</h3>
                <div className="flex items-center">
                  <FaUserCircle className="text-green-400 text-xl mr-3" />
                  <p className="text-white text-lg font-medium">{userData?.username || userData?.name?.toLowerCase().replace(/\s+/g, '') || 'username'}</p>
                </div>
              </div>
              
              <div className="flex items-center p-4 border-b border-gray-600 hover:bg-gray-700 rounded-md transition duration-200">
                <FaEnvelope className="text-green-400 text-xl mr-4" />
                <div>
                  <h3 className="text-sm text-gray-400">Email</h3>
                  <p className="text-white">{userData?.email || 'No email available'}</p>
                </div>
              </div>
              
              <div className="flex items-center p-4 border-b border-gray-600 hover:bg-gray-700 rounded-md transition duration-200">
                <FaPhone className="text-green-400 text-xl mr-4" />
                <div>
                  <h3 className="text-sm text-gray-400">Phone Number</h3>
                  <p className="text-white">{userData?.phoneNumber || 'No phone number available'}</p>
                </div>
              </div>
              
              <div className="flex items-center p-4 border-b border-gray-600 hover:bg-gray-700 rounded-md transition duration-200">
                <FaMapMarkerAlt className="text-green-400 text-xl mr-4" />
                <div>
                  <h3 className="text-sm text-gray-400">Address</h3>
                  <p className="text-white">{userData?.address || 'No address available'}</p>
                </div>
              </div>
              
              <div className="flex items-center p-4 border-b border-gray-600 hover:bg-gray-700 rounded-md transition duration-200">
                <FaCalendarAlt className="text-green-400 text-xl mr-4" />
                <div>
                  <h3 className="text-sm text-gray-400">Join Date</h3>
                  <p className="text-white">
                    {userData?.createdAt 
                      ? new Date(userData.createdAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })
                      : 'Unknown'}
                  </p>
                </div>
              </div>
              
              {userData?.bio ? (
                <div className="p-5 mt-6 bg-gray-700 rounded-lg border-l-4 border-green-500 shadow-md">
                  <h3 className="text-lg font-medium text-green-400 mb-2">About Me</h3>
                  <p className="text-gray-100 leading-relaxed">{userData.bio}</p>
                </div>
              ) : (
                <div className="p-5 mt-6 bg-gray-700 rounded-lg border-l-4 border-gray-500 shadow-md opacity-75">
                  <h3 className="text-lg font-medium text-gray-400 mb-2">About Me</h3>
                  <p className="text-gray-300">No bio information available. Click 'Edit Profile' to add your bio.</p>
                </div>
              )}
              
              {/* Wish List Section */}
              <div className="mt-12">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-white">
                    <FaHeart className="inline-block text-green-400 mr-2" />
                    My Vehicle Wishlist
                  </h2>
               
                </div>
                
                {/* Tabs for Cars and Motorcycles */}
                <div className="flex border-b border-gray-600">
                  <button
                    className={`flex items-center py-3 px-6 border-b-2 font-medium text-lg ${
                      activeWishlistTab === 'cars' 
                        ? 'border-green-500 text-green-400' 
                        : 'border-transparent text-gray-400 hover:text-gray-200'
                    }`}
                    onClick={() => setActiveWishlistTab('cars')}
                  >
                    <FaCar className="mr-2" />
                    Cars
                  </button>
                  <button
                    className={`flex items-center py-3 px-6 border-b-2 font-medium text-lg ${
                      activeWishlistTab === 'motorcycles' 
                        ? 'border-green-500 text-green-400' 
                        : 'border-transparent text-gray-400 hover:text-gray-200'
                    }`}
                    onClick={() => setActiveWishlistTab('motorcycles')}
                  >
                    <FaMotorcycle className="mr-2" />
                    Motorcycles
                  </button>
                </div>
                
                {/* Wishlist Grid */}
                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filteredWishlistItems.length > 0 ? (
                    filteredWishlistItems.map((item) => (
                      <div 
                        key={item._id} 
                        className="bg-gray-700 rounded-lg overflow-hidden border border-gray-600 hover:border-green-500 transition-all duration-300 shadow-md group"
                      >
                        <div className="relative">
                          {item.imageUrl ? (
                            <img 
                              src={item.imageUrl} 
                              alt={item.name} 
                              className="w-full h-40 object-cover"
                            />
                          ) : (
                            <div className="w-full h-40 bg-gray-600 flex items-center justify-center">
                              {item.type === 'car' ? (
                                <FaCar className="text-5xl text-gray-400" />
                              ) : (
                                <FaMotorcycle className="text-5xl text-gray-400" />
                              )}
                            </div>
                          )}
                          <button
                            onClick={() => handleRemoveWishlistItem(item._id)}
                            className="absolute top-2 right-2 bg-red-500 bg-opacity-75 hover:bg-opacity-100 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                          >
                            <FaTrash className="text-white" />
                          </button>
                        </div>
                        <div className="p-4">
                          <h3 className="text-lg font-bold text-white">{item.name}</h3>
                          <div className="text-sm text-gray-300 mb-2">
                            {item.model} • {item.year}
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="col-span-2 p-8 text-center bg-gray-700 rounded-lg border border-gray-600">
                      <div className="text-5xl mb-4 text-gray-400">
                        {activeWishlistTab === 'cars' ? <FaCar /> : <FaMotorcycle />}
                      </div>
                      <h3 className="text-xl text-gray-300 mb-2">
                        No {activeWishlistTab === 'cars' ? 'cars' : 'motorcycles'} in your wishlist yet
                      </h3>
                      <p className="text-gray-400">
                        Click "Add New" to start building your dream collection!
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      
    
      
      {/* Footer */}
      <div className="pt-16 pb-8 text-center text-gray-400">
        <p>© {new Date().getFullYear()} VehicleMarketplace. All rights reserved.</p>
        <p className="mt-2 text-sm">Your ultimate destination for buying and selling vehicles</p>
      </div>
    </div>
  );
};

export default UserProfile;