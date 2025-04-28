import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { Eye, Check, X, Edit } from "lucide-react";

const Orders = () => {
    const [cars, setCars] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [statusFilter, setStatusFilter] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCars = async () => {
            try {
                setLoading(true);
                const token = localStorage.getItem("token");
                const res = await axios.get(`/api/cars/all${statusFilter ? `?status=${statusFilter}` : ""}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setCars(res.data);
            } catch (err) {
                setError("Failed to load cars");
            } finally {
                setLoading(false);
            }
        };

        fetchCars();
    }, [statusFilter]);

    const handleStatusChange = async (id, newStatus) => {
        const { value: note } = await Swal.fire({
            title: `${newStatus === "approved" ? "Approve" : "Reject"} Order`,
            input: "text",
            inputLabel: "Add a note (optional)",
            inputPlaceholder: "Type your note here...",
            showCancelButton: true,
            confirmButtonText: newStatus === "approved" ? "Approve" : "Reject",
            confirmButtonColor: newStatus === "approved" ? "#10B981" : "#EF4444",
        });
    
        if (note === undefined) return; // User clicked cancel
    
        try {
            const token = localStorage.getItem("token");
            const res = await axios.patch(`/api/cars/status/${id}`, {
                status: newStatus,
                adminNote: note,
            }, {
                headers: { Authorization: `Bearer ${token}` },
            });
    
            setCars(prev =>
                prev.map(car =>
                    car._id === id ? { ...car, status: newStatus, adminNote: note } : car
                )
            );
    
            Swal.fire({
                icon: "success",
                title: "Status Updated",
                text: res.data.message,
                timer: 2000,
                showConfirmButton: false,
            });
        } catch (err) {
            Swal.fire({
                icon: "error",
                title: "Failed to update status",
                text: err?.response?.data?.message || "Something went wrong",
            });
        }
    };
    
    const handleView = (car) => {
        navigate(`/admin-dashboard/cars/view/${car._id}`, { state: { car } });
    };

    const getStatusBadge = (status) => {
        const styles = {
            approved: "bg-green-100 text-green-800 border border-green-300",
            rejected: "bg-red-100 text-red-800 border border-red-300",
            pending: "bg-yellow-100 text-yellow-800 border border-yellow-300",
        };
        
        return (
            <span className={`inline-block px-3 py-1 text-xs font-medium rounded-full ${styles[status]}`}>
                {status.charAt(0).toUpperCase() + status.slice(1)}
            </span>
        );
    };

    return (
        <div className="bg-gray-50 min-h-screen p-6">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-800 mb-4 md:mb-0">Order Management</h1>
                    <div className="flex items-center space-x-4">
                        <label htmlFor="statusFilter" className="text-gray-600 font-medium">Filter by Status:</label>
                        <select
                            id="statusFilter"
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="border border-gray-300 px-4 py-2 rounded-md shadow-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        >
                            <option value="">All Orders</option>
                            <option value="pending">Pending</option>
                            <option value="approved">Approved</option>
                            <option value="rejected">Rejected</option>
                        </select>
                    </div>
                </div>

                {loading ? (
                    <div className="flex justify-center py-20">
                        <div className="flex flex-col items-center">
                            <div className="w-16 h-16 border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin"></div>
                            <p className="mt-4 text-gray-600">Loading orders...</p>
                        </div>
                    </div>
                ) : error ? (
                    <div className="bg-red-50 border-l-4 border-red-500 p-5 rounded shadow-md">
                        <div className="flex">
                            <div className="flex-shrink-0">
                                <X className="h-5 w-5 text-red-500" />
                            </div>
                            <div className="ml-3">
                                <h3 className="text-red-800 font-medium">Error</h3>
                                <p className="text-red-700 mt-1">{error}</p>
                            </div>
                        </div>
                    </div>
                ) : cars.length === 0 ? (
                    <div className="bg-white p-10 rounded-lg shadow-md text-center">
                        <div className="mb-4">
                            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                            </svg>
                        </div>
                        <p className="text-lg text-gray-600">No orders found matching your criteria.</p>
                        {statusFilter && (
                            <button 
                                onClick={() => setStatusFilter("")} 
                                className="mt-4 text-blue-600 hover:text-blue-800 font-medium"
                            >
                                Clear filter
                            </button>
                        )}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 ">
                        {cars.map((car) => (
                            <div key={car._id} className="bg-whit border border-gray-300 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300">
                                {car.images?.length > 0 && (
                                    <div className="relative h-52">
                                        <img
                                            src={`http://localhost:5000/uploads/${car.images[0]}`}
                                            alt={car.name}
                                            className="w-full h-full object-cover"
                                        />
                                        <div className="absolute top-3 right-3">
                                            {getStatusBadge(car.status)}
                                        </div>
                                    </div>
                                )}
                                <div className="p-5">
                                    <h2 className="text-xl font-bold text-gray-900 mb-3">{car.name}</h2>
                                    
                                    <div className="grid grid-cols-2 gap-x-4 gap-y-2 mb-4">
                                        <div className="col-span-1">
                                            <span className="text-gray-500 text-sm">Price</span>
                                            <p className="font-semibold text-gray-900">${car.price.toLocaleString()}</p>
                                        </div>
                                        <div className="col-span-1">
                                            <span className="text-gray-500 text-sm">Year</span>
                                            <p className="font-semibold text-gray-900">{car.year}</p>
                                        </div>
                                        <div className="col-span-1">
                                            <span className="text-gray-500 text-sm">Model</span>
                                            <p className="font-semibold text-gray-900">{car.model}</p>
                                        </div>
                                        <div className="col-span-1">
                                            <span className="text-gray-500 text-sm">Condition</span>
                                            <p className="font-semibold text-gray-900">{car.condition}</p>
                                        </div>
                                    </div>
                                    
                                    <div className="h-16 overflow-hidden mb-3">
                                        <p className="text-gray-700 text-sm line-clamp-3">{car.description}</p>
                                    </div>
                                    
                                    {car.adminNote && (
                                        <div className="bg-blue-50 p-3 rounded-md mb-4 border border-blue-100">
                                            <p className="text-sm text-blue-800">
                                                <span className="font-medium">Admin Note:</span> {car.adminNote}
                                            </p>
                                        </div>
                                    )}
                                    
                                    <div className="text-sm text-gray-600 mb-4 pb-3 border-b border-gray-100">
                                        <div className="font-medium mb-1">Seller Information:</div>
                                        <p>{car.seller?.name}</p>
                                        <p>{car.seller?.email}</p>
                                    </div>

                                    <div className="flex flex-wrap gap-2 pt-2  flex-col justify-end">
                                        <button
                                            className="bg-green-500 hover:bg-green-600 text-white px-3 py-2 rounded-md flex-1 transition-colors duration-200 flex items-center justify-center gap-1"
                                            onClick={() => handleStatusChange(car._id, "approved")}
                                            disabled={car.status === "approved"}
                                        >
                                            <Check size={16} />
                                            <span>Approve</span>
                                        </button>
                                        <button
                                            className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-md flex-1 transition-colors duration-200 flex items-center justify-center gap-1"
                                            onClick={() => handleStatusChange(car._id, "rejected")}
                                            disabled={car.status === "rejected"}
                                        >
                                            <X size={16} />
                                            <span>Reject</span>
                                        </button>
                                        <div className="flex gap-2 mt-2 w-full">
                                            <Link
                                                to={`/admin-dashboard/car/edit/${car._id}`}
                                                className="bg-amber-500 hover:bg-amber-600 text-white px-3 py-2 rounded-md flex-1 transition-colors duration-200 flex items-center justify-center gap-1"
                                            >
                                                <Edit size={16} />
                                                <span>Edit</span>
                                            </Link>
                                            <button
                                                className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-md flex-1 transition-colors duration-200 flex items-center justify-center gap-1"
                                                onClick={() => handleView(car)}
                                            >
                                                <Eye size={16} />
                                                <span>View</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Orders;