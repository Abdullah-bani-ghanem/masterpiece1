import { useEffect, useState, useCallback } from "react";
import { Pencil, Trash2, Plus, Eye } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const StatusBadge = ({ status }) => {
  const statusStyles = {
    Available: "bg-green-100 text-green-800",
    Rented: "bg-blue-100 text-blue-800",
    default: "bg-gray-100 text-gray-800"
  };

  const style = statusStyles[status] || statusStyles.default;
  
  return (
    <span className={`px-2 py-1 rounded text-xs ${style}`}>
      {status}
    </span>
  );
};

const ActionButtons = ({ car, onDelete, onView }) => (
  <div className="flex gap-2">
    <button
      className="bg-green-600 text-white p-1 rounded hover:bg-green-700 transition-colors"
      onClick={() => onView(car)}
      title="View Details"
    >
      <Eye size={16} />
    </button>
    <Link
      to={`/admin-dashboard/car/edit/${car._id}`}
      className="bg-amber-500 text-white p-1 rounded hover:bg-amber-600 transition-colors"
      title="Edit Car"
    >
      <Pencil size={16} />
    </Link>
    <button
      className="bg-red-600 text-white p-1 rounded hover:bg-red-700 transition-colors"
      onClick={() => onDelete(car._id)}
      title="Delete Car"
    >
      <Trash2 size={16} />
    </button>
  </div>
);

const Cars = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchCars = useCallback(async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const res = await axios.get("/api/cars/all", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCars(res.data);
    } catch (err) {
      console.error("Error fetching cars:", err);
      setError("Failed to load cars");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCars();
  }, [fetchCars]);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this car?")) return;
    
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`/api/cars/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      
      setCars((prev) => prev.filter((car) => car._id !== id));
      
      // Toast notification instead of alert for better UX
      // If you have a toast library, use it here
      alert("Car deleted successfully");
    } catch (err) {
      console.error("Error deleting car:", err);
      alert("Failed to delete car");
    }
  };

  const handleView = (car) => {
    navigate(`/admin-dashboard/cars/view/${car._id}`, { state: { car } });
  };

  return (
    <div className="p-6 max-w-full bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Car Management</h2>
        <div className="flex gap-2">
          <Link
            to="/admin-dashboard/cars/new"
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors shadow-sm"
          >
            <Plus size={18} /> Add Car
          </Link>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {loading ? (
          <div className="flex justify-center py-12">
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 border-4 border-t-blue-500 border-b-blue-500 border-blue-200 rounded-full animate-spin"></div>
              <p className="mt-4 text-gray-600">Loading cars...</p>
            </div>
          </div>
        ) : error ? (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 my-4">
            <div className="flex items-center">
              <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              <p>{error}</p>
            </div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-100">
                <tr>
                  <th className="py-3 px-4 text-left font-semibold text-gray-600">#</th>
                  <th className="py-3 px-4 text-left font-semibold text-gray-600">Name</th>
                  <th className="py-3 px-4 text-left font-semibold text-gray-600">Price</th>
                  <th className="py-3 px-4 text-left font-semibold text-gray-600">Status</th>
                  <th className="py-3 px-4 text-left font-semibold text-gray-600">Brand</th>
                  <th className="py-3 px-4 text-left font-semibold text-gray-600">Model</th>
                  <th className="py-3 px-4 text-left font-semibold text-gray-600">Description</th>
                  <th className="py-3 px-4 text-left font-semibold text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                {cars.map((car, index) => (
                  <tr 
                    key={car._id} 
                    className="border-t border-gray-200 hover:bg-gray-100 transition-colors"
                  >
                    <td className="py-3 px-4 text-gray-700">{index + 1}</td>
                    <td className="py-3 px-4 font-medium text-gray-800">{car.name}</td>
                    <td className="py-3 px-4 text-gray-700">${car.price}</td>
                    <td className="py-3 px-4">
                      <StatusBadge status={car.status} />
                    </td>
                    <td className="py-3 px-4 text-gray-700">{car.brand}</td>
                    <td className="py-3 px-4 text-gray-700">{car.model}</td>
                    <td className="py-3 px-4 max-w-xs truncate text-gray-600">{car.description}</td>
                    <td className="py-3 px-4">
                      <ActionButtons 
                        car={car} 
                        onDelete={handleDelete} 
                        onView={handleView} 
                      />
                    </td>
                  </tr>
                ))}
                {cars.length === 0 && (
                  <tr>
                    <td colSpan="8" className="text-center py-12">
                      <div className="flex flex-col items-center text-gray-500">
                        <svg className="w-12 h-12 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <p className="text-lg">No cars available at the moment.</p>
                        <Link 
                          to="/admin-dashboard/cars/new" 
                          className="mt-4 text-blue-600 hover:text-blue-800 flex items-center gap-1"
                        >
                          <Plus size={16} /> Add your first car
                        </Link>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cars;