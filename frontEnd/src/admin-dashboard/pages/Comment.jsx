import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { TrashIcon, RefreshCw } from 'lucide-react';
import Swal from 'sweetalert2';

const AdminDashboard = () => {
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch comments from the server
    useEffect(() => {
        fetchComments();
    }, []);

    const fetchComments = async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get('http://localhost:5000/api/comments/allComments', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            setComments(response.data);  // Store fetched data
            toast.success('Comments loaded successfully');
        } catch (err) {
            console.error('Error loading comments:', err);
            toast.error('Failed to load comments');
        } finally {
            setLoading(false);
        }
    };

    // Delete comment with SweetAlert confirmation
    const handleDelete = async (commentId) => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'You won’t be able to recover this comment!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'Cancel',
            iconColor: '#d33',
            customClass: {
                popup: 'rtl-swal'
            }
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const token = localStorage.getItem('token');
                    await axios.delete(`http://localhost:5000/api/comments/${commentId}`, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });

                    // Remove deleted comment from state
                    setComments(comments.filter(comment => comment._id !== commentId));

                    Swal.fire({
                        title: 'Deleted!',
                        text: 'Comment has been deleted.',
                        icon: 'success',
                        confirmButtonColor: '#3085d6',
                        customClass: {
                            popup: 'rtl-swal'
                        }
                    });
                } catch (err) {
                    console.error('Error deleting comment:', err);
                    Swal.fire({
                        title: 'Error!',
                        text: 'Failed to delete the comment.',
                        icon: 'error',
                        confirmButtonColor: '#3085d6',
                        customClass: {
                            popup: 'rtl-swal'
                        }
                    });
                }
            }
        });
    };

    return (
        <div className="min-h-screen bg-gray-50 p-4 md:p-8 rtl" dir="rtl">
            <ToastContainer position="top-right" rtl={true} />

            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <div className="flex flex-col md:flex-row justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold text-gray-800 mb-4 md:mb-0">Admin Dashboard - Comments Management</h1>
                    <button
                        onClick={fetchComments}
                        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors duration-200"
                    >
                        <RefreshCw size={18} /> Refresh
                    </button>
                </div>

                <div className="w-full overflow-x-auto">
                    {loading ? (
                        <div className="flex justify-center items-center h-40">
                            <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-blue-500 border-t-transparent"></div>
                            <span className="mr-3 text-gray-700">Loading comments...</span>
                        </div>
                    ) : comments.length === 0 ? (
                        <div className="text-center py-8 text-gray-500">
                            No comments to display
                        </div>
                    ) : (
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        User
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Comment
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Date
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {comments.map(comment => (
                                    <tr key={comment._id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm font-medium text-gray-900">
                                                {comment.userId?.name || 'Unavailable'}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="text-sm text-gray-900 max-w-md break-words">
                                                {comment.comment}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-500">
                                                {new Date(comment.createdAt).toLocaleString('ar-SA')}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <button
                                                onClick={() => handleDelete(comment._id)}
                                                className="text-red-600 hover:text-red-800 flex items-center gap-1 transition-colors duration-200"
                                            >
                                                <TrashIcon size={16} /> Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>

            {/* Style to support RTL in SweetAlert */}
            <style jsx global>{`
        .rtl-swal {
          direction: rtl;
          text-align: right;
        }
      `}</style>
        </div>
    );
};

export default AdminDashboard;
