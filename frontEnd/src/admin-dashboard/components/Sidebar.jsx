import { Home, Car, Users, ShoppingCart, LogOut, MessageSquare } from "lucide-react";
import { Link } from "react-router-dom";
import axios from 'axios';


const Sidebar = () => {

  // Handle logout functionality
  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:5000/api/users/logout", {}, { withCredentials: true });
      // setIsAuthenticated(false);
      // setUserName('');
      alert("Logged out successfully!");
      navigate('/'); // Optional: redirect to home page
    } catch (error) {
      alert("Error during logout!");
    }
  };

  return (
    <div className="w-64 bg-gray-900 text-white h-screen shadow-xl relative mt-18 ">
      <div className="p-6 border-b border-gray-800">
        <h2 className="text-2xl font-bold text-blue-400">ClassicCars</h2>
      </div>

      <nav className="mt-6">
        <ul className="space-y-2 px-4">
          <li>
            <Link
              to="/admin-dashboard"
              className="flex items-center gap-3 py-3 px-4 rounded-lg hover:bg-gray-800 transition-all duration-200"
            >
              <Home size={18} className="text-blue-400" />
              <span>Dashboard</span>
            </Link>
          </li>
          <li>
            <Link
              to="/admin-dashboard/all-cars"
              className="flex items-center gap-3 py-3 px-4 rounded-lg hover:bg-gray-800 transition-all duration-200"
            >
              <ShoppingCart size={18} className="text-blue-400" />
              <span>Orders</span>
            </Link>
          </li>
          <li>
            <Link
              to="/admin-dashboard/cars"
              className="flex items-center gap-3 py-3 px-4 rounded-lg hover:bg-gray-800 transition-all duration-200"
            >
              <Car size={18} className="text-blue-400" />
              <span>Cars</span>
            </Link>
          </li>

          <li>
            <Link
              to="/admin-dashboard/comment"
              className="flex items-center gap-3 py-3 px-4 rounded-lg hover:bg-gray-800 transition-all duration-200"
            >
              <MessageSquare size={18} className="text-blue-400" />
              <span>Cars Comment</span>
            </Link>
          </li>


          <li>
            <Link
              to="/admin/AdminBikeDashboard"
              className="flex items-center gap-3 py-3 px-4 rounded-lg hover:bg-gray-800 transition-all duration-200"
            >
              <Users size={18} className="text-blue-400" />
              <span>Bike</span>
            </Link>
          </li>
          <li>
            <Link
              to="/admin/BikeCommentsAdmin"
              className="flex items-center gap-3 py-3 px-4 rounded-lg hover:bg-gray-800 transition-all duration-200"
            >
              <Users size={18} className="text-blue-400" />
              <span>Bike Comments</span>
            </Link>
          </li>
          <li>
            <Link
              to="/admin-dashboard/users"
              className="flex items-center gap-3 py-3 px-4 rounded-lg hover:bg-gray-800 transition-all duration-200"
            >
              <Users size={18} className="text-blue-400" />
              <span>Users</span>
            </Link>
          </li>


          <Link
            to="/admin-dashboard/testimonials"
            className="flex items-center gap-3 py-3 px-4 rounded-lg hover:bg-gray-800 transition-all duration-200"
          >
            <MessageSquare size={18} className="text-blue-400" />
            <span>Testimonials</span>
          </Link>

          <li>
            <Link
              to="/admin/contacts"
              className="flex items-center gap-3 py-3 px-4 rounded-lg hover:bg-gray-800 transition-all duration-200"
            >
              <Users size={18} className="text-blue-400" />
              <span>Contact</span>
            </Link>
          </li>
        </ul>
      </nav>

      {/* Logout button positioned at the bottom */}
      <div className="absolute bottom-0 left-0 w-full p-4 border-t border-gray-800">
        <button
          className="flex items-center justify-center gap-3 py-3 px-4 rounded-lg bg-red-600 hover:bg-red-700 transition-all duration-200 w-full"
          onClick={handleLogout}
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;