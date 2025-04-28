import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const PendingCars = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPendingCars = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("/api/cars/pending", {
          headers: { Authorization: `Bearer ${token}` },
        });

        console.log("🚗 البيانات المستلمة:", response.data);

        // تأكد إنها مصفوفة
        const carsData = Array.isArray(response.data) ? response.data : response.data.cars || [];
        setCars(carsData);
      } catch (err) {
        console.error("❌ Error fetching cars:", err);
        setError("فشل في تحميل السيارات المعلقة");
      } finally {
        setLoading(false);
      }
    };

    fetchPendingCars();
  }, []);

  const handleStatusChange = async (id, status) => {
    const note = prompt("هل تريد إضافة ملاحظة؟ (اختياري)") || "";
    try {
      const token = localStorage.getItem("token");
      const res = await axios.patch(
        `/api/cars/status/${id}`,
        { status, adminNote: note },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setCars((prev) => prev.filter((car) => car._id !== id));
      alert(res.data.message);
    } catch (err) {
      alert("فشل في تحديث الحالة");
    }
  };

  if (loading) return <p>جاري التحميل...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">السيارات بانتظار الموافقة</h1>
      {Array.isArray(cars) && cars.length === 0 ? (
        <p>لا توجد سيارات معلّقة حالياً.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Array.isArray(cars) &&
            cars.map((car) => (
              <div key={car._id} className="border rounded-xl p-4 shadow">
                <h2 className="text-xl font-semibold">{car.name} - {car.brand}</h2>
                <p>الموديل: {car.model} | السنة: {car.year}</p>
                <p>الحالة: {car.condition}</p>
                <p>السعر: ${car.price}</p>
                <p>الوصف: {car.description}</p>
                <p>البائع: {car.seller?.name} ({car.seller?.email})</p>
                <div className="mt-2 flex gap-2">
                  <button
                    className="bg-green-600 text-white px-3 py-1 rounded"
                    onClick={() => handleStatusChange(car._id, "approved")}
                  >
                    موافقة ✅
                  </button>
                  <button
                    className="bg-red-600 text-white px-3 py-1 rounded"
                    onClick={() => handleStatusChange(car._id, "rejected")}
                  >
                    رفض ❌
                  </button>
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default PendingCars;
