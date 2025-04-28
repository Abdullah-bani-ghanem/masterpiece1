import { useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const AddCar = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    brand: "",
    model: "",
    year: "",
    price: "",
    images:[],
    description: "",
  });
  const [images, setImages] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    setImages(Array.from(e.target.files));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
  
    try {
      const formDataToSend = new FormData();
      Object.keys(formData).forEach(key => {
        formDataToSend.append(key, formData[key]);
      });
  
      images.forEach((image) => {
        formDataToSend.append("images", image);
      });
  
      const token = Cookies.get("token");
      if (!token) {
        throw new Error("لم يتم العثور على التوكن. الرجاء تسجيل الدخول مرة أخرى");
      }
  
      const res = await fetch("http://localhost:5000/api/cars/addByAdmin", {
        method: "POST",
        body: formDataToSend,
        headers: {
          "Authorization": `Bearer ${token}`,
        },
        credentials: "include",  // تأكد من تضمين الكوكيز
      });
  
      const result = await res.json();
  
      if (!res.ok) {
        throw new Error(result.message || "حدث خطأ أثناء إضافة السيارة");
      }
  
      Swal.fire({
        title: "تمت العملية بنجاح!",
        text: "تم إضافة السيارة بنجاح",
        icon: "success",
        confirmButtonText: "حسناً",
      }).then(() => {
        navigate("/cars");
      });
  
    } catch (err) {
      console.error("Error adding car:", err);
      Swal.fire({
        title: "خطأ",
        text: err.message || "حدث خطأ أثناء إضافة السيارة",
        icon: "error",
        confirmButtonText: "حسناً",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  

  return (
    <div className="p-6 max-w-xl mx-auto bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">إضافة سيارة جديدة</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">اسم السيارة</label>
          <input
            type="text"
            name="name"
            placeholder="اسم السيارة"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">الماركة</label>
          <input
            type="text"
            name="brand"
            placeholder="الماركة"
            value={formData.brand}
            onChange={handleChange}
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">الموديل</label>
          <input
            type="text"
            name="model"
            placeholder="الموديل"
            value={formData.model}
            onChange={handleChange}
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">سنة الصنع</label>
          <input
            type="number"
            name="year"
            placeholder="سنة الصنع"
            value={formData.year}
            onChange={handleChange}
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
            min="1900"
            max={new Date().getFullYear() + 1}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">السعر</label>
          <input
            type="number"
            name="price"
            placeholder="السعر"
            value={formData.price}
            onChange={handleChange}
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
            min="0"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">صور السيارة</label>
          <input
            type="file"
            name="images"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            multiple
            required
          />
          <p className="text-xs text-gray-500 mt-1">يمكنك اختيار أكثر من صورة</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">وصف السيارة</label>
          <textarea
            name="description"
            placeholder="وصف السيارة"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            rows="4"
            required
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full py-2 px-4 rounded-md text-white font-medium ${
            isSubmitting ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          {isSubmitting ? 'جاري الإضافة...' : 'إضافة السيارة'}
        </button>
      </form>
    </div>
  );
};

export default AddCar;
