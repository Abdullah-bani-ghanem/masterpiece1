import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const CarInfoForm = () => {
    const [formData, setFormData] = useState({
        make: '',
        model: '',
        year: '',
        color: '',
        licensePlate: '',
        mileage: '',
        fuelType: '',
        transmission: 'automatic',
        price: '',
        condition: '',
        description: ''
    });

    const [carImages, setCarImages] = useState([]);
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
        setCarImages(files);
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

            carImages.forEach((image) => {
                formDataToSend.append('images', image);
            });

            const token = localStorage.getItem('token');

            const res = await axios.post('http://localhost:5000/api/cars/submit', formDataToSend, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${token}`,
                },
            });

            if (res.status === 201) {
                Swal.fire({
                    icon: 'success',
                    title: 'Car Submitted',
                    text: '✅ Your car has been submitted successfully and is awaiting admin approval.',
                    confirmButtonText: 'OK'
                });

                setFormData({
                    make: '', model: '', year: '', color: '', licensePlate: '', mileage: '', fuelType: '', transmission: 'automatic', price: '', condition: '', description: ''
                });
                setCarImages([]);
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
                        <h1 className="font-[Playfair Display] text-4xl font-bold mb-3">Car Information Form</h1>
                        <p className="font-[Playfair Display] text-lg max-w-2xl mx-auto opacity-90">
                            Please fill in the details of your car to list it for sale – provide accurate information to help potential buyers make informed decisions.
                        </p>
                    </div>
                </div>

                {/* Main Form */}
                <div className="bg-white dark:bg-gray-800 rounded-b-2xl shadow-xl p-8">
                    {success && (
                        <div className="mb-6 bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded-md">
                            <p className="flex items-center">
                                <span className="mr-2">✅</span> The car has been submitted successfully!
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
                        {/* Car Basic Information */}
                        <div className="border-b border-gray-200 dark:border-gray-700 pb-5">
                            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
                                Basic Information
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div>
                                    <label htmlFor="make" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">

                                        Car name
                                    </label>
                                    <input
                                        type="text"
                                        id="make"
                                        name="make"
                                        value={formData.make}
                                        onChange={handleChange}
                                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 dark:bg-gray-700 dark:text-white dark:border-gray-600"
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

                        {/* Car Appearance */}
                        <div className="border-b border-gray-200 dark:border-gray-700 pb-5">
                            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
                                Appearance
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="color" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                        Color
                                    </label>
                                    <input
                                        type="text"
                                        id="color"
                                        name="color"
                                        value={formData.color}
                                        onChange={handleChange}
                                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 dark:bg-gray-700 dark:text-white dark:border-gray-600"
                                        required
                                    />
                                </div>
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
                                        <option value="">Select condition</option>
                                        <option value="new">New</option>
                                        <option value="used">Used</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* Car Technical Information */}
                        <div className="border-b border-gray-200 dark:border-gray-700 pb-5">
                            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
                                Technical Information
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div>
                                    <label htmlFor="licensePlate" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                        License Plate
                                    </label>
                                    <input
                                        type="text"
                                        id="licensePlate"
                                        name="licensePlate"
                                        value={formData.licensePlate}
                                        onChange={handleChange}
                                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 dark:bg-gray-700 dark:text-white dark:border-gray-600"
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor="mileage" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                        Mileage
                                    </label>
                                    <input
                                        type="text"
                                        id="mileage"
                                        name="mileage"
                                        value={formData.mileage}
                                        onChange={handleChange}
                                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 dark:bg-gray-700 dark:text-white dark:border-gray-600"
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor="fuelType" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                        Fuel Type
                                    </label>
                                    <select
                                        id="fuelType"
                                        name="fuelType"
                                        value={formData.fuelType}
                                        onChange={handleChange}
                                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 dark:bg-gray-700 dark:text-white dark:border-gray-600"
                                        required
                                    >
                                        <option value="">Select fuel type</option>
                                        <option value="gasoline">Gasoline</option>
                                        <option value="diesel">Diesel</option>
                                        <option value="electric">Electric</option>
                                        <option value="hybrid">Hybrid</option>
                                    </select>
                                </div>
                            </div>

                            <div className="mt-6">
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Transmission
                                </label>
                                <div className="flex items-center space-x-6">
                                    {['automatic', 'manual'].map((option) => (
                                        <div key={option} className="flex items-center">
                                            <input
                                                type="radio"
                                                id={option}
                                                name="transmission"
                                                value={option}
                                                checked={formData.transmission === option}
                                                onChange={handleChange}
                                                className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                                            />
                                            <label htmlFor={option} className="ml-2 text-sm text-gray-700 dark:text-gray-300 capitalize">
                                                {option}
                                            </label>
                                        </div>
                                    ))}
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
                                Car Images
                            </h3>
                            <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center">
                                <label htmlFor="carImage" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                                    Upload Car Images
                                </label>
                                <input
                                    type="file"
                                    id="carImage"
                                    accept="image/*"
                                    multiple
                                    onChange={handleImageChange}
                                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 dark:text-gray-400 dark:file:bg-gray-700 dark:file:text-gray-300"
                                />
                                <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                                    Upload multiple images of your car (exterior, interior, etc.)
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
                                <span>Submit Car Information</span>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CarInfoForm;



















// import React, { useState } from 'react';
// import axios from 'axios';
// import Swal from 'sweetalert2';

// const CarInfoForm = () => {
//     const [formData, setFormData] = useState({
//         make: '',
//         model: '',
//         year: '',
//         color: '',
//         licensePlate: '',
//         mileage: '',
//         fuelType: '',
//         transmission: 'automatic',
//         price: '',
//         condition: '',
//         description: '',
//         userName: '', // إضافة اسم المستخدم
//         userEmail: '', // إضافة البريد الإلكتروني
//         userPhone: '', // إضافة رقم الهاتف
//     });

//     const [carImages, setCarImages] = useState([]);
//     const [imagePreviews, setImagePreviews] = useState([]);
//     const [success, setSuccess] = useState(false);
//     const [error, setError] = useState(null);

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData({
//             ...formData,
//             [name]: value,
//         });
//     };

//     const handleImageChange = (e) => {
//         const files = Array.from(e.target.files);
//         setCarImages(files);
//         const previews = files.map(file => URL.createObjectURL(file));
//         setImagePreviews(previews);
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             const formDataToSend = new FormData();
//             Object.entries(formData).forEach(([key, value]) => {
//                 formDataToSend.append(key, value);
//             });

//             carImages.forEach((image) => {
//                 formDataToSend.append('images', image);
//             });

//             const token = localStorage.getItem('token');

//             const res = await axios.post('http://localhost:5000/api/cars/submit', formDataToSend, {
//                 headers: {
//                     'Content-Type': 'multipart/form-data',
//                     Authorization: `Bearer ${token}`,
//                 },
//             });

//             if (res.status === 201) {
//                 Swal.fire({
//                     icon: 'success',
//                     title: 'Car Submitted',
//                     text: '✅ Your car has been submitted successfully and is awaiting admin approval.',
//                     confirmButtonText: 'OK'
//                 });

//                 setFormData({
//                     make: '', model: '', year: '', color: '', licensePlate: '', mileage: '', fuelType: '', transmission: 'automatic', price: '', description: '', userName: '', userEmail: '', userPhone: ''
//                 });
//                 setCarImages([]);
//                 setImagePreviews([]);
//                 setSuccess(true);
//             }
//         } catch (err) {
//             console.error('Submit error:', err);
//             Swal.fire({
//                 icon: 'error',
//                 title: 'Submission Failed',
//                 text: 'An error occurred while submitting. Please make sure all data is entered correctly.',
//                 confirmButtonText: 'OK'
//             });
//             setError('An error occurred while submitting. Please make sure all data is entered correctly.');
//         }
//     };

//     return (
//         <div className="min-h-screen bg-gray-100 dark:bg-gray-800 py-10 px-4">
//             <div className="bg-gray-700 bg-opacity-70 bg-cover bg-center rounded-lg mb-8 p-10 text-center text-white shadow-lg" style={{
//                 backgroundImage: 'url("https://images.unsplash.com/photo-1601841396256-f7953ce4f564?w=600")'
//             }}>
//                 <h1 className="text-5xl font-bold font-[cursive] mb-4 drop-shadow">Form</h1>
//                 <p className="text-xl font-[cursive] max-w-2xl mx-auto">
//                     "Please fill in the details of your car to list it for sale – provide accurate information to help potential buyers make informed decisions."
//                 </p>
//             </div>

//             <div className="max-w-3xl mx-auto bg-white dark:bg-gray-700 rounded-lg shadow-lg p-6">
//                 <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-white font-[cursive] mb-6">
//                     Car Information Form
//                 </h2>

//                 {success && <p className="text-green-600 text-center">✅ The car has been submitted successfully!</p>}
//                 {error && <p className="text-red-600 text-center">{error}</p>}

//                 <form onSubmit={handleSubmit} className="space-y-6">
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                         {[{ label: 'Make', name: 'make' }, { label: 'Model', name: 'model' }, { label: 'Year', name: 'year', type: 'number' }, { label: 'Color', name: 'color' }, { label: 'License Plate', name: 'licensePlate' }, { label: 'Mileage', name: 'mileage', type: 'number' }].map(({ label, name, type = 'text' }) => (
//                             <div key={name}>
//                                 <label htmlFor={name} className="block text-sm font-[cursive] text-gray-700 dark:text-gray-200">{label}</label>
//                                 <input
//                                     type={type}
//                                     id={name}
//                                     name={name}
//                                     value={formData[name]}
//                                     onChange={handleChange}
//                                     className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 dark:bg-gray-600 dark:text-white dark:border-gray-500"
//                                     required
//                                 />
//                             </div>
//                         ))}

//                         <div>
//                             <label htmlFor="condition" className="block text-sm font-[cursive] text-gray-700 dark:text-gray-200">
//                                 Condition
//                             </label>
//                             <select
//                                 id="condition"
//                                 name="condition"
//                                 value={formData.condition}
//                                 onChange={handleChange}
//                                 className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 dark:bg-gray-600 dark:text-white dark:border-gray-500"
//                                 required
//                             >
//                                 <option value="">Select condition</option>
//                                 <option value="new">New</option>
//                                 <option value="used">Used</option>
//                             </select>
//                         </div>

//                         <div>
//                             <label htmlFor="fuelType" className="block text-sm font-[cursive] text-gray-700 dark:text-gray-200">Fuel Type</label>
//                             <select
//                                 id="fuelType"
//                                 name="fuelType"
//                                 value={formData.fuelType}
//                                 onChange={handleChange}
//                                 className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 dark:bg-gray-600 dark:text-white dark:border-gray-500"
//                                 required
//                             >
//                                 <option value="">Select fuel type</option>
//                                 <option value="gasoline">Gasoline</option>
//                                 <option value="diesel">Diesel</option>
//                                 <option value="electric">Electric</option>
//                                 <option value="hybrid">Hybrid</option>
//                             </select>
//                         </div>

//                         <div>
//                             <label className="block text-sm font-[cursive] text-gray-700 dark:text-gray-200">Transmission</label>
//                             <div className="mt-2 space-y-2">
//                                 {['automatic', 'manual'].map((option) => (
//                                     <div key={option} className="flex items-center">
//                                         <input
//                                             type="radio"
//                                             id={option}
//                                             name="transmission"
//                                             value={option}
//                                             checked={formData.transmission === option}
//                                             onChange={handleChange}
//                                             className="h-4 w-4 text-green-600"
//                                         />
//                                         <label htmlFor={option} className="ml-2 text-sm text-gray-700 dark:text-gray-200 font-[cursive] capitalize">
//                                             {option}
//                                         </label>
//                                     </div>
//                                 ))}
//                             </div>
//                         </div>

//                         <div>
//                             <label htmlFor="price" className="block text-sm font-[cursive] text-gray-700 dark:text-gray-200">Price ($)</label>
//                             <input
//                                 type="number"
//                                 id="price"
//                                 name="price"
//                                 value={formData.price}
//                                 onChange={handleChange}
//                                 className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-600 dark:text-white dark:border-gray-500"
//                                 required
//                             />
//                         </div>
//                     </div>

//                     <div>
//                         <label htmlFor="description" className="block text-sm font-[cursive] text-gray-700 dark:text-gray-200">Description</label>
//                         <textarea
//                             id="description"
//                             name="description"
//                             value={formData.description}
//                             onChange={handleChange}
//                             rows="4"
//                             className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 dark:bg-gray-600 dark:text-white dark:border-gray-500"
//                             required
//                         ></textarea>
//                     </div>

//                     {/* User Contact Details */}
//                     <div className="mt-6">
//                         <h3 className="text-xl font-semibold text-white mb-4">User Contact Details</h3>
//                         <div>
//                             <label htmlFor="userEmail" className="block text-sm font-[cursive] text-gray-700 dark:text-gray-200">Email</label>
//                             <input
//                                 type="email"
//                                 id="userEmail"
//                                 name="userEmail"
//                                 value={formData.userEmail}
//                                 onChange={handleChange}
//                                 className="mt-1 block w-full p-3 bg-gray-800 text-white border border-gray-700 rounded-md"
//                                 required
//                             />
//                         </div>
//                         <div>
//                             <label htmlFor="userPhone" className="block text-sm font-[cursive] text-gray-700 dark:text-gray-200">Phone Number</label>
//                             <input
//                                 type="tel"
//                                 id="userPhone"
//                                 name="userPhone"
//                                 value={formData.userPhone}
//                                 onChange={handleChange}
//                                 className="mt-1 block w-full p-3 bg-gray-800 text-white border border-gray-700 rounded-md"
//                                 required
//                             />
//                         </div>
//                         <div>
//                             <label htmlFor="userName" className="block text-sm font-[cursive] text-gray-700 dark:text-gray-200">Name</label>
//                             <input
//                                 type="text"
//                                 id="userName"
//                                 name="userName"
//                                 value={formData.userName}
//                                 onChange={handleChange}
//                                 className="mt-1 block w-full p-3 bg-gray-800 text-white border border-gray-700 rounded-md"
//                             />
//                         </div>
//                     </div>

//                     {/* Image Upload */}
//                     <div>
//                         <label htmlFor="carImage" className="block text-sm font-[cursive] text-gray-700 dark:text-gray-200">
//                             Upload Car Images
//                         </label>
//                         <input
//                             type="file"
//                             id="carImage"
//                             accept="image/*"
//                             multiple
//                             onChange={handleImageChange}
//                             className="mt-1 block w-full text-sm text-gray-900 bg-white border border-gray-300 rounded-lg cursor-pointer dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
//                         />

//                         {imagePreviews.length > 0 && (
//                             <div className="grid grid-cols-2 gap-2 mt-4">
//                                 {imagePreviews.map((src, index) => (
//                                     <img
//                                         key={index}
//                                         src={src}
//                                         alt={`Preview ${index}`}
//                                         className="w-full h-auto rounded-md shadow-md"
//                                     />
//                                 ))}
//                             </div>
//                         )}
//                     </div>

//                     <div className="text-center">
//                         <button
//                             type="submit"
//                             className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition duration-300"
//                         >
//                             Submit
//                         </button>
//                     </div>
//                 </form>
//             </div>
//         </div>
//     );
// };

// export default CarInfoForm;
