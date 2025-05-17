// 📁 src/pages/admin/AdminTestimonials.jsx

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Trash2, EyeOff, Eye } from 'lucide-react';

const AdminTestimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  // جلب التقييمات كاملة
  const fetchTestimonials = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("/api/testimonials/all", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTestimonials(res.data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching testimonials:", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  // حذف تقييم
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this testimonial?")) return;

    try {
      const token = localStorage.getItem("token");
      await axios.delete(`/api/testimonials/admin-delete/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchTestimonials();
    } catch (err) {
      console.error("Error deleting testimonial:", err);
    }
  };

  // تبديل الظهور على الهوم
  const toggleVisibility = async (id, currentValue) => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(`/api/testimonials/toggle-show/${id}`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchTestimonials();
    } catch (err) {
      console.error("Error toggling visibility:", err);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Manage Testimonials</h2>
      {loading ? (
        <p>Loading testimonials...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white dark:bg-[#2a2a2a] border border-gray-200 dark:border-gray-600">
            <thead className="bg-gray-100 dark:bg-gray-700 text-left">
              <tr>
                <th className="p-3 border">User</th>
                <th className="p-3 border">Message</th>
                <th className="p-3 border">Rating</th>
                <th className="p-3 border">Visible on Home</th>
                <th className="p-3 border text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {testimonials.map((t) => (
                <tr key={t._id} className="border-t border-gray-300 dark:border-gray-600">
                  <td className="p-3">{t.name}</td>
                  <td className="p-3">{t.message}</td>
                  <td className="p-3">{t.rating} ⭐</td>
                  <td className="p-3">{t.showOnHome ? 'Yes' : 'No'}</td>
                  <td className="p-3 text-center flex gap-3">
                    <button
                      className="text-yellow-600 hover:text-yellow-800"
                      onClick={() => toggleVisibility(t._id, t.showOnHome)}
                    >
                      {t.showOnHome ? <Eye size={18} /> : <EyeOff size={18} />}
                    </button>
                    <button
                      className="text-red-600 hover:text-red-800"
                      onClick={() => handleDelete(t._id)}
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminTestimonials;
