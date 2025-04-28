// import React, { useState } from 'react';
// import axios from 'axios';

// const AddBikeForm = () => {
//   const [formData, setFormData] = useState({
//     name: '',
//     brand: '',
//     type: '',
//     price: '',
//     description: '',
//     imageUrl: ''
//   });

//   const [error, setError] = useState('');
//   const [success, setSuccess] = useState('');

//   // التعامل مع تغيير الحقول
//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value
//     });
//   };

//   // إرسال البيانات إلى الـ API
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');
//     setSuccess('');

//     // تحقق من صحة البيانات
//     if (!formData.name || !formData.brand || !formData.type || !formData.price || !formData.description || !formData.imageUrl) {
//       return setError('يرجى ملء جميع الحقول');
//     }

//     try {
//       // إرسال البيانات إلى API
//       const response = await axios.post('http://localhost:5000/api/bikes/bikes', formData);
//       setSuccess('تم إضافة الدراجة بنجاح!');
//       setFormData({
//         name: '',
//         brand: '',
//         type: '',
//         price: '',
//         description: '',
//         imageUrl: ''
//       });
//     } catch (err) {
//       setError('حدث خطأ أثناء إضافة الدراجة');
//       console.error(err);
//     }
//   };

//   return (
//     <div className="container mx-auto p-4">
//       <h1 className="text-2xl font-bold mb-4">إضافة دراجة جديدة</h1>

//       {error && <div className="text-red-500 mb-4">{error}</div>}
//       {success && <div className="text-green-500 mb-4">{success}</div>}

//       <form onSubmit={handleSubmit} className="space-y-4">
//         <div>
//           <label className="block text-sm font-medium">اسم الدراجة</label>
//           <input
//             type="text"
//             name="name"
//             value={formData.name}
//             onChange={handleChange}
//             className="mt-1 block w-full border rounded px-3 py-2"
//             placeholder="اسم الدراجة"
//           />
//         </div>

//         <div>
//           <label className="block text-sm font-medium">العلامة التجارية</label>
//           <input
//             type="text"
//             name="brand"
//             value={formData.brand}
//             onChange={handleChange}
//             className="mt-1 block w-full border rounded px-3 py-2"
//             placeholder="العلامة التجارية"
//           />
//         </div>

//         <div>
//           <label className="block text-sm font-medium">النوع</label>
//           <input
//             type="text"
//             name="type"
//             value={formData.type}
//             onChange={handleChange}
//             className="mt-1 block w-full border rounded px-3 py-2"
//             placeholder="النوع (جبلية، سباق، إلخ)"
//           />
//         </div>

//         <div>
//           <label className="block text-sm font-medium">السعر</label>
//           <input
//             type="number"
//             name="price"
//             value={formData.price}
//             onChange={handleChange}
//             className="mt-1 block w-full border rounded px-3 py-2"
//             placeholder="السعر"
//           />
//         </div>

//         <div>
//           <label className="block text-sm font-medium">الوصف</label>
//           <textarea
//             name="description"
//             value={formData.description}
//             onChange={handleChange}
//             className="mt-1 block w-full border rounded px-3 py-2"
//             placeholder="وصف الدراجة"
//           />
//         </div>

//         <div>
//           <label className="block text-sm font-medium">رابط الصورة</label>
//           <input
//             type="text"
//             name="imageUrl"
//             value={formData.imageUrl}
//             onChange={handleChange}
//             className="mt-1 block w-full border rounded px-3 py-2"
//             placeholder="رابط الصورة"
//           />
//         </div>

//         <button
//           type="submit"
//           className="mt-4 bg-blue-500 text-white px-6 py-2 rounded"
//         >
//           إضافة الدراجة
//         </button>
//       </form>
//     </div>
//   );
// };

// export default AddBikeForm;







// import React, { useState } from 'react';
// import axios from 'axios';

// const AddBikeForm = () => {
//   const [formData, setFormData] = useState({
//     name: '',
//     brand: '',
//     type: '',
//     model: '',
//     year: '',
//     price: '',
//     condition: 'new',  // القيمة الافتراضية هي 'new'
//     images: [],
//     description: '',
//     status: 'pending', // القيمة الافتراضية هي 'pending'
//     adminNote: ''
//   });

//   const [error, setError] = useState('');
//   const [success, setSuccess] = useState('');

//   // التعامل مع تغيير الحقول
//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value
//     });
//   };

//   // التعامل مع تغيير مصفوفة الصور
//   const handleImageChange = (e) => {
//     const files = Array.from(e.target.files);
//     setFormData({
//       ...formData,
//       images: files
//     });
//   };

//   // إرسال البيانات إلى الـ API
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');
//     setSuccess('');

//     // تحقق من صحة البيانات
//     if (!formData.name || !formData.brand || !formData.type || !formData.model || !formData.year || !formData.price || !formData.condition || !formData.description || formData.images.length === 0) {
//       return setError('يرجى ملء جميع الحقول');
//     }

//     try {
//       // إعداد البيانات مع الصور
//       const formDataWithImages = new FormData();
//       formDataWithImages.append('name', formData.name);
//       formDataWithImages.append('brand', formData.brand);
//       formDataWithImages.append('type', formData.type);
//       formDataWithImages.append('model', formData.model);
//       formDataWithImages.append('year', formData.year);
//       formDataWithImages.append('price', formData.price);
//       formDataWithImages.append('condition', formData.condition);
//       formDataWithImages.append('description', formData.description);
//       formDataWithImages.append('status', formData.status);
//       formDataWithImages.append('adminNote', formData.adminNote);

//       // إضافة الصور إلى البيانات
//       formData.images.forEach((file, index) => {
//         formDataWithImages.append('images', file);
//       });

//       // إرسال البيانات إلى API باستخدام axios
//       const response = await axios.post('http://localhost:5000/api/bikes/add', formDataWithImages, { headers: { 'Content-Type': 'multipart/form-data' } });

//       setSuccess('تم إضافة الدراجة بنجاح!');
//       setFormData({
//         name: '',
//         brand: '',
//         type: '',
//         model: '',
//         year: '',
//         price: '',
//         condition: 'new',
//         images: [],
//         description: '',
//         status: 'pending',
//         adminNote: ''
//       });
//     } catch (err) {
//       setError('حدث خطأ أثناء إضافة الدراجة');
//       console.error(err);
//     }
//   };

//   return (
//     <div className="container mx-auto p-4">
//       <h1 className="text-2xl font-bold mb-4">إضافة دراجة جديدة</h1>

//       {error && <div className="text-red-500 mb-4">{error}</div>}
//       {success && <div className="text-green-500 mb-4">{success}</div>}

//       <form onSubmit={handleSubmit} className="space-y-4">
//         {/* اسم الدراجة */}
//         <div>
//           <label className="block text-sm font-medium">اسم الدراجة</label>
//           <input
//             type="text"
//             name="name"
//             value={formData.name}
//             onChange={handleChange}
//             className="mt-1 block w-full border rounded px-3 py-2"
//             placeholder="اسم الدراجة"
//           />
//         </div>

//         {/* العلامة التجارية */}
//         <div>
//           <label className="block text-sm font-medium">العلامة التجارية</label>
//           <input
//             type="text"
//             name="brand"
//             value={formData.brand}
//             onChange={handleChange}
//             className="mt-1 block w-full border rounded px-3 py-2"
//             placeholder="العلامة التجارية"
//           />
//         </div>

//         {/* النوع */}
//         <div>
//           <label className="block text-sm font-medium">النوع</label>
//           <input
//             type="text"
//             name="type"
//             value={formData.type}
//             onChange={handleChange}
//             className="mt-1 block w-full border rounded px-3 py-2"
//             placeholder="النوع (جبلية، سباق، إلخ)"
//           />
//         </div>

//         {/* موديل الدراجة */}
//         <div>
//           <label className="block text-sm font-medium">موديل الدراجة</label>
//           <input
//             type="text"
//             name="model"
//             value={formData.model}
//             onChange={handleChange}
//             className="mt-1 block w-full border rounded px-3 py-2"
//             placeholder="موديل الدراجة"
//           />
//         </div>

//         {/* سنة الصنع */}
//         <div>
//           <label className="block text-sm font-medium">سنة الصنع</label>
//           <input
//             type="number"
//             name="year"
//             value={formData.year}
//             onChange={handleChange}
//             className="mt-1 block w-full border rounded px-3 py-2"
//             placeholder="سنة الصنع"
//           />
//         </div>

//         {/* السعر */}
//         <div>
//           <label className="block text-sm font-medium">السعر</label>
//           <input
//             type="number"
//             name="price"
//             value={formData.price}
//             onChange={handleChange}
//             className="mt-1 block w-full border rounded px-3 py-2"
//             placeholder="السعر"
//           />
//         </div>

//         {/* حالة الدراجة */}
//         <div>
//           <label className="block text-sm font-medium">حالة الدراجة</label>
//           <select
//             name="condition"
//             value={formData.condition}
//             onChange={handleChange}
//             className="mt-1 block w-full border rounded px-3 py-2"
//           >
//             <option value="new">جديدة</option>
//             <option value="used">مستعملة</option>
//           </select>
//         </div>

//         {/* الصور */}
//         <div>
//           <label className="block text-sm font-medium">صور الدراجة</label>
//           <input
//             type="file"
//             name="images"
//             multiple
//             onChange={handleImageChange}
//             className="mt-1 block w-full border rounded px-3 py-2"
//           />
//         </div>

//         {/* الوصف */}
//         <div>
//           <label className="block text-sm font-medium">الوصف</label>
//           <textarea
//             name="description"
//             value={formData.description}
//             onChange={handleChange}
//             className="mt-1 block w-full border rounded px-3 py-2"
//             placeholder="وصف الدراجة"
//           />
//         </div>

//         {/* ملاحظات المسؤول */}
//         <div>
//           <label className="block text-sm font-medium">ملاحظات المسؤول</label>
//           <input
//             type="text"
//             name="adminNote"
//             value={formData.adminNote}
//             onChange={handleChange}
//             className="mt-1 block w-full border rounded px-3 py-2"
//             placeholder="ملاحظات المسؤول (اختياري)"
//           />
//         </div>

//         <button
//           type="submit"
//           className="mt-4 bg-blue-500 text-white px-6 py-2 rounded"
//         >
//           إضافة الدراجة
//         </button>
//       </form>
//     </div>
//   );
// };

// export default AddBikeForm;








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

      const res = await axios.post('http://localhost:5000/api/bikes/submit', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });

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
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header Banner */}
        <div className="relative bg-green-400 rounded-t-2xl mb-0 p-8 text-center text-white shadow-lg overflow-hidden">
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <div className="relative z-10">
            <h1 className="text-4xl font-bold mb-3">Bike Information Form</h1>
            <p className="text-lg max-w-2xl mx-auto opacity-90">
              Please fill in the details of your bike to list it for sale – provide accurate information to help potential buyers make informed decisions.
            </p>
          </div>
        </div>

        {/* Main Form */}
        <div className="bg-white dark:bg-gray-800 rounded-b-2xl shadow-xl p-8">
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

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Bike Basic Information */}
            <div className="border-b border-gray-200 dark:border-gray-700 pb-5">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
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
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 dark:bg-gray-700 dark:text-white dark:border-gray-600"
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
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 dark:bg-gray-700 dark:text-white dark:border-gray-600"
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
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 dark:bg-gray-700 dark:text-white dark:border-gray-600"
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
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 dark:bg-gray-700 dark:text-white dark:border-gray-600"
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
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 dark:bg-gray-700 dark:text-white dark:border-gray-600"
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
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 dark:bg-gray-700 dark:text-white dark:border-gray-600"
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
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 dark:bg-gray-700 dark:text-white dark:border-gray-600"
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
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 dark:bg-gray-700 dark:text-white dark:border-gray-600"
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
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 dark:bg-gray-700 dark:text-white dark:border-gray-600"
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
                  className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 dark:text-gray-400 dark:file:bg-gray-700 dark:file:text-gray-300"
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
                className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition duration-300 flex items-center justify-center"
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
