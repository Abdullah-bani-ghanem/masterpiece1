import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const AddBikeForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    brand: '',
    type: '',
    model: '',
    year: '',
    price: '',
    condition: 'new',
    description: '',
    status: 'pending',
    adminNote: ''
  });

  const [bikeImages, setBikeImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setBikeImages(files);
    const previews = files.map(file => URL.createObjectURL(file));
    setImagePreviews(previews);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        formDataToSend.append(key, value);
      });

      bikeImages.forEach((image) => {
        formDataToSend.append('images', image);
      });

      const token = localStorage.getItem('token');

      const res = await axios.post(
        'http://localhost:5000/api/bikes/submit',
        formDataToSend,
        {
          withCredentials: true, // ✅ يسمح بإرسال الكوكي مع الطلب
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      if (res.status === 201) {
        Swal.fire({
          icon: 'success',
          title: 'Bike Submitted',
          text: '✅ Your bike has been submitted successfully and is awaiting admin approval.',
          confirmButtonText: 'OK'
        });

        setFormData({
          name: '',
          brand: '',
          type: '',
          model: '',
          year: '',
          price: '',
          condition: 'new',
          description: '',
          status: 'pending',
          adminNote: ''
        });
        setBikeImages([]);
        setImagePreviews([]);
        setSuccess(true);
      }
    } catch (err) {
      console.error('Submit error:', err);
      Swal.fire({
        icon: 'error',
        title: 'Submission Failed',
        text: 'An error occurred while submitting. Please make sure all data is entered correctly.',
        confirmButtonText: 'OK'
      });
      setError('An error occurred while submitting. Please make sure all data is entered correctly.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b   py-12 px-4 mt-18">
      <div className="max-w-4xl mx-auto">
        {/* Header Banner */}
        <div className="relative bg-yellow-500 rounded-t-2xl mb-0 p-8 text-center text-white shadow-lg overflow-hidden">
          <div className="absolute inset-0  opacity-50"></div>
          <div className="relative z-10">
            <h1 className="text-4xl font-bold mb-3">Bike Information Form</h1>
            <p className="text-lg max-w-2xl mx-auto opacity-90">
              Please fill in the details of your bike to list it for sale – provide accurate information to help potential buyers make informed decisions.
            </p>
          </div>
        </div>

        {/* Main Form */}
        <div className="bg-white dark:bg-[#4a4a48] rounded-b-2xl shadow-xl p-8">
          {success && (
            <div className="mb-6 bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded-md">
              <p className="flex items-center">
                <span className="mr-2">✅</span> The bike has been submitted successfully!
              </p>
            </div>
          )}

          {error && (
            <div className="mb-6 bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-md">
              <p className="flex items-center">
                <span className="mr-2">❌</span> {error}
              </p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-8 ">
            {/* Bike Basic Information */}
            <div className="border-b border-gray-200 dark:border-gray-700 pb-5">
              <h3 className="text-lg font-semibold  dark:text-gray-200 mb-4">
                Basic Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Bike Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="block w-full rounded-md border-gray-300 shadow-sm  focus:ring-opacity-50 dark:bg-white dark:text-black dark:border-gray-600"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="brand" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Brand
                  </label>
                  <input
                    type="text"
                    id="brand"
                    name="brand"
                    value={formData.brand}
                    onChange={handleChange}
                    className="block w-full rounded-md border-gray-300 shadow-sm  focus:ring-opacity-50 dark:bg-white dark:text-black dark:border-gray-600"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="year" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Year
                  </label>
                  <input
                    type="text"
                    id="year"
                    name="year"
                    value={formData.year}
                    onChange={handleChange}
                    className="block w-full rounded-md border-gray-300 shadow-sm  focus:ring-opacity-50 dark:bg-white dark:text-black dark:border-gray-600"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Bike Specifications */}
            <div className="border-b border-gray-200 dark:border-gray-700 pb-5">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
                Bike Specifications
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="type" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Type
                  </label>
                  <input
                    type="text"
                    id="type"
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    className="block w-full rounded-md border-gray-300 shadow-sm  focus:ring-opacity-50 dark:bg-white dark:text-black dark:border-gray-600"
                    placeholder="Mountain, Road, etc."
                    required
                  />
                </div>
                <div>
                  <label htmlFor="model" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Model
                  </label>
                  <input
                    type="text"
                    id="model"
                    name="model"
                    value={formData.model}
                    onChange={handleChange}
                    className="block w-full rounded-md border-gray-300 shadow-sm  focus:ring-opacity-50 dark:bg-white dark:text-black dark:border-gray-600"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Bike Condition */}
            <div className="border-b border-gray-200 dark:border-gray-700 pb-5">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
                Condition
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="condition" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Condition
                  </label>
                  <select
                    id="condition"
                    name="condition"
                    value={formData.condition}
                    onChange={handleChange}
                    className="block w-full rounded-md border-gray-300 shadow-sm  focus:ring-opacity-50 dark:bg-white dark:text-black dark:border-gray-600"
                    required
                  >
                    <option value="new">New</option>
                    <option value="used">Used</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="adminNote" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Admin Note (Optional)
                  </label>
                  <input
                    type="text"
                    id="adminNote"
                    name="adminNote"
                    value={formData.adminNote}
                    onChange={handleChange}
                    className="block w-full rounded-md border-gray-300 shadow-sm  focus:ring-opacity-50 dark:bg-white dark:text-black dark:border-gray-600"
                  />
                </div>
              </div>
            </div>

            {/* Price and Description */}
            <div className="border-b border-gray-200 dark:border-gray-700 pb-5">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
                Price and Description
              </h3>
              <div className="mb-6">
                <label htmlFor="price" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Price ($)
                </label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  className="block w-full rounded-md border-gray-300 shadow-sm  focus:ring-opacity-50 dark:bg-white dark:text-black dark:border-gray-600"
                  required
                />
              </div>
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Full description
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows="4"
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:ring-opacity-50 dark:bg-white dark:text-black dark:border-gray-600"
                  required
                ></textarea>
              </div>
            </div>

            {/* Image Upload */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
                Bike Images
              </h3>
              <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center">
                <label htmlFor="bikeImage" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  Upload Bike Images
                </label>
                <input
                  type="file"
                  id="bikeImage"
                  accept="image/*"
                  multiple
                  onChange={handleImageChange}
                  className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-[#2d2d2e] dark:text-gray-400 dark:file:bg-gray-700 dark:file:text-gray-300"
                />
                <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                  Upload multiple images of your bike (full view, details, etc.)
                </p>
              </div>

              {imagePreviews.length > 0 && (
                <div className="mt-6">
                  <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                    Image Previews
                  </h4>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {imagePreviews.map((src, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={src}
                          alt={`Preview ${index + 1}`}
                          className="w-full h-48 object-cover rounded-lg shadow-md"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-20 rounded-lg"></div>
                        <div className="absolute bottom-2 right-2 text-white text-xs bg-black bg-opacity-50 px-2 py-1 rounded">
                          Image {index + 1}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                className="w-full bg-[#FBBF24] hover:bg-yellow-600 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition duration-300 flex items-center justify-center"
              >
                <span>Submit Bike Information</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddBikeForm;
