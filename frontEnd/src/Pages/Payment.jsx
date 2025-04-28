import React, { useState } from 'react';
import Swal from 'sweetalert2';

const ClassicCarsPaymentForm = () => {
  const [formData, setFormData] = useState({
    cardName: '',
    cardNumber: '',
    securityCode: '',
    expiryDate: ''
  });

  const [errors, setErrors] = useState({
    cardName: '',
    cardNumber: '',
    securityCode: '',
    expiryDate: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    let updatedValue = value;

    if (name === 'cardNumber') {
      updatedValue = value.replace(/\D/g, '').slice(0, 16);
      updatedValue = updatedValue.replace(/(.{4})/g, '$1 ').trim();
    }

    if (name === 'securityCode') {
      updatedValue = value.replace(/\D/g, '').slice(0, 3);
    }

    if (name === 'expiryDate') {
      updatedValue = value.replace(/\D/g, '').slice(0, 4);
      if (updatedValue.length >= 3) {
        updatedValue = `${updatedValue.slice(0, 2)}/${updatedValue.slice(2)}`;
      }
    }

    setFormData({
      ...formData,
      [name]: updatedValue
    });

    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = { ...errors };

    if (!/^[A-Za-z\s]+$/.test(formData.cardName)) {
      newErrors.cardName = 'Name should contain only letters and spaces';
      valid = false;
    }

    const cardNumberClean = formData.cardNumber.replace(/\s/g, '');
    if (!/^\d{16}$/.test(cardNumberClean)) {
      newErrors.cardNumber = 'Card number should be 16 digits';
      valid = false;
    }

    if (!/^\d{3}$/.test(formData.securityCode)) {
      newErrors.securityCode = 'Security code should be 3 digits';
      valid = false;
    }

    if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(formData.expiryDate)) {
      newErrors.expiryDate = 'Format should be MM/YY';
      valid = false;
    } else {
      const [month, year] = formData.expiryDate.split('/');
      const expDate = new Date(`20${year}`, month);
      const today = new Date();
      today.setDate(1);
      if (expDate < today) {
        newErrors.expiryDate = 'Card has expired';
        valid = false;
      }
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
  
    try {
      const response = await fetch('http://localhost:5000/api/payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(formData)
      });
  
      const data = await response.json();
      if (response.ok) {
        Swal.fire({
          icon: 'success',
          title: 'Payment Saved',
          text: 'Your payment has been saved successfully!',
          confirmButtonText: 'OK'
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Payment Failed',
          text: data.message || 'Something went wrong while saving the payment.',
          confirmButtonText: 'OK'
        });
      }
    } catch (error) {
      console.error('Error saving payment:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'An unexpected error occurred. Please try again.',
        confirmButtonText: 'OK'
      });
    }
  };

  return (
    <div>
      {/* Hero Section */}
      <div className="bg-gray-700 bg-opacity-70 bg-blend-overlay bg-center bg-cover py-10" 
           style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1609429019995-8c40f49535a5?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Y3JlZGl0JTIwY2FyZHxlbnwwfHwwfHx8MA%3D%3D")' }}>
        <div className="container mx-auto px-4 text-center text-white">
          <h1 className="font-[Playfair Display] text-5xl md:text-6xl font-bold mb-6 drop-shadow-lg">Payment</h1>
          <p className="font-[Playfair Display] text-xl md:text-2xl max-w-3xl mx-auto">
          "Welcome to the payment page – please complete your payment to finalize your order safely and easily."
          </p>
        </div>
      </div>
  


      {/* باقي الصفحة */}
      <div className="flex items-center justify-center  bg-gray-800 p-4">
        
        <div className=" bg-gray-900 text-white border border-gray-700 rounded-lg overflow-hidden py-20">
          
          {/* <div className="relative">
            <img 
              src="https://images.unsplash.com/photo-1576761733452-984b98effaf3?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8ODR8fGNhciUyMGNsYXNzaWN8ZW58MHx8MHx8fDA%3D" 
              alt="Classic cars" 
              className="w-full h-40 object-cover" 
            />
            <br /><br />
            <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 bg-gray-900 rounded-full p-1 border-4 border-gray-700">
              <img 
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-PpsNyA3Q5Q5s7Y3D0ajFIysdDXSinmutTQ&s" 
                alt="Classic car logo" 
                className="w-16 h-16 rounded-full object-cover" 
              />
            </div>
          </div> */}
  
          <div className="pt-12 pb-6 text-center px-6">
            <h2 className="text-xl font-bold text-white">Card Payment</h2>
          </div>
  
          <div className=" px-6 pb-6">
            <form className="space-y-10" onSubmit={handleSubmit}>
              <div className="space-y-1">
                <label className="block text-white">
                  <span className="text-green-500">*</span> Name on Card
                </label>
                <input 
                  type="text" 
                  name="cardName"
                  value={formData.cardName}
                  onChange={handleChange}
                  placeholder="John Doe" 
                  className={`w-full px-3 py-2 bg-gray-800 border ${errors.cardName ? 'border-green-500' : 'border-gray-700'} text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`} 
                  required
                />
                {errors.cardName && <p className="text-green-500 text-xs mt-1">{errors.cardName}</p>}
              </div>
  
              <div className="space-y-1">
                <label className="block text-white">
                  <span className="text-green-500">*</span> Card Number
                </label>
                <input 
                  type="text" 
                  name="cardNumber"
                  value={formData.cardNumber}
                  onChange={handleChange}
                  placeholder="1234 5678 9012 3456" 
                  className={`w-full px-3 py-2 bg-gray-800 border ${errors.cardNumber ? 'border-green-500' : 'border-gray-700'} text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`} 
                  required
                />
                {errors.cardNumber && <p className="text-green-500 text-xs mt-1">{errors.cardNumber}</p>}
              </div>
  
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="block text-white">
                    <span className="text-green-500">*</span> Security Code
                  </label>
                  <input 
                    type="text" 
                    name="securityCode"
                    value={formData.securityCode}
                    onChange={handleChange}
                    placeholder="CVC" 
                    className={`w-full px-3 py-2 bg-gray-800 border ${errors.securityCode ? 'border-green-500' : 'border-gray-700'} text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`} 
                    required
                  />
                  {errors.securityCode && <p className="text-green-500 text-xs mt-1">{errors.securityCode}</p>}
                </div>
                <div className="space-y-1">
                  <label className="block text-white">
                    <span className="text-green-500">*</span> Expiration Date
                  </label>
                  <input 
                    type="text" 
                    name="expiryDate"
                    value={formData.expiryDate}
                    onChange={handleChange}
                    placeholder="MM/YY" 
                    className={`w-full px-3 py-2 bg-gray-800 border ${errors.expiryDate ? 'border-green-500' : 'border-gray-700'} text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`} 
                    required
                  />
                  {errors.expiryDate && <p className="text-green-500 text-xs mt-1">{errors.expiryDate}</p>}
                </div>
              </div>
  
              <button 
                type="submit" 
                className="w-full py-2 bg-green-600 hover:bg-green-800 text-white rounded-md transition duration-200"
              >
                Complete Payment
              </button>
  
              <div className="flex items-center justify-center text-green-400 text-sm pt-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
                <span>Transactions are secure and encrypted</span>
              </div>
            </form>
          </div>
        </div>
  
  
  
        {/* WhatsApp Button */}
        <a 
          href="https://wa.me/+962787491703" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="fixed bottom-20 right-6 z-10 w-14 h-14 rounded-full bg-green-500 flex items-center justify-center shadow-lg hover:bg-green-600 transition-colors"
        >
          <svg className="h-8 w-8 text-white" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
          </svg>
        </a>
      </div>
      </div>
    
  )};
  
export default ClassicCarsPaymentForm;
