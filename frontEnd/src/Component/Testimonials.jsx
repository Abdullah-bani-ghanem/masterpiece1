import React, { useState, useEffect } from 'react';
import { Star } from 'lucide-react';
import axios from 'axios';
import {  X } from 'lucide-react';

function Testimonials() {
  // State
  const [formData, setFormData] = useState({ message: "", rating: 5 });
  const [success, setSuccess] = useState(false);
  const [testimonials, setTestimonials] = useState([]);
  const [userName, setUserName] = useState("Anonymous");
  const [isHovering, setIsHovering] = useState(null);

  // Fetch user name and testimonials on component mount
  useEffect(() => {
    const fetchUserName = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;
  
      try {
        const response = await axios.get("/api/users/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUserName(response.data.name);
      } catch (err) {
        console.error("Error fetching user info", err);
      }
    };
  
    fetchUserName();
    fetchTestimonials();
  }, []);

  // Fetch testimonials data
  const fetchTestimonials = async () => {
    try {
      const response = await axios.get("/api/testimonials");
      setTestimonials(response.data);
    } catch (error) {
      console.error("Error fetching testimonials", error);
    }
  };

  // Submit testimonial
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const dataToSend = {
        ...formData,
        name: userName,
      };

      await axios.post("/api/testimonials/add", dataToSend, {
        headers: { 'Content-Type': 'application/json' }
      });
      
      setSuccess(true);
      setFormData({ message: "", rating: 5 });
      fetchTestimonials();
      
      // Reset success message after 3 seconds
      setTimeout(() => setSuccess(false), 3000);
    } catch (error) {
      console.error("Error submitting testimonial", error);
    }
  };

  // Handle star rating selection
  const handleStarClick = (rating) => {
    setFormData({ ...formData, rating });
  };



  const handleDelete = async (id) => {
    const confirm = window.confirm("Are you sure you want to delete your testimonial?");
    if (!confirm) return;
  
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`/api/testimonials/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchTestimonials();
    } catch (error) {
      console.error("Error deleting testimonial", error);
    }
  };
  
  
  return (
    <div className="bg-gray-50 dark:bg-[#2d2d2e] min-h-screen py-15">
      {/* Form Section */}
      <section className="max-w-3xl mx-auto  dark:bg-[#4a4a48] rounded-xl shadow-lg mb-12 overflow-hidden">
        <div className="p-8">
          <h2 className="text-3xl font-bold mb-6 text-center  dark:text-white">
            Leave Your Feedback
          </h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Your Message
              </label>
              <textarea
                id="message"
                placeholder="Tell us about your experience..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                required
                className="w-full p-4 rounded-lg border border-gray-300 dark:border-gray-200 focus:ring-2 focus:ring-yellow-400 focus:border-transparent outline-none transition dark:bg-[#5e5e5e] dark:text-white"
                rows={4}
              ></textarea>
            </div>
            
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Your Rating
              </label>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => handleStarClick(star)}
                    onMouseEnter={() => setIsHovering(star)}
                    onMouseLeave={() => setIsHovering(null)}
                    className="focus:outline-none transition-transform hover:scale-110"
                  >
                    <Star
                      size={28}
                      fill={(isHovering !== null ? star <= isHovering : star <= formData.rating) ? "#FBBF24" : "none"}
                      color={(isHovering !== null ? star <= isHovering : star <= formData.rating) ? "#FBBF24" : "#CBD5E0"}
                    />
                  </button>
                ))}
                <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">
                  ({formData.rating}/5)
                </span>
              </div>
            </div>

            <button 
              type="submit" 
              className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-medium py-3 px-6 rounded-lg transition-colors shadow-md hover:shadow-lg transform hover:-translate-y-1"
            >
              Submit Feedback
            </button>



            {success && (
              <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded" role="alert">
                <p className="font-medium">Thank you for your feedback!</p>
                <p>Your testimonial has been submitted successfully.</p>
              </div>
            )}


          </form>
        </div>
      </section>

      {/* Testimonials List Section */}
      <section className="py-12 px-4">
  <h2 className="text-3xl text-center font-bold mb-12 text-gray-800 dark:text-white">
    What Our Customers Say
  </h2>

  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
    {testimonials
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 6)
      .map((testimonial) => (
        <div
          key={testimonial._id}
          className="relative bg-white dark:bg-[#4a4a48] p-6 rounded-xl shadow-lg transition-transform hover:shadow-xl hover:-translate-y-1 border border-gray-100 dark:border-gray-700"
        >
          {/* ✅ زر الحذف يظهر فقط إذا كان صاحب التقييم */}
          {testimonial.name === userName && (
            <button
              onClick={() => handleDelete(testimonial._id)}
              className="absolute top-3 right-3 text-red-500 hover:text-red-700 p-1"
              title="Delete"
            >
              <X size={18} />
            </button>
          )}

          <div className="flex justify-between items-start mb-4">
            <h3 className="font-bold text-lg text-gray-900 dark:text-white">
              {testimonial.name}
            </h3>
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={18}
                  fill={i < testimonial.rating ? "#FBBF24" : "none"}
                  color={i < testimonial.rating ? "#FBBF24" : "#CBD5E0"}
                  className="ml-1"
                />
              ))}
            </div>
          </div>
          <p className="text-gray-600 dark:text-gray-300 italic">"{testimonial.message}"</p>
        </div>
      ))}
  </div>
</section>
    </div>
  );
}

export default Testimonials;