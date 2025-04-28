const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    buyer: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    car: { type: mongoose.Schema.Types.ObjectId, ref: "Car", required: true },
    price: { type: Number, required: true },
    status: { type: String, enum: ["pending", "confirmed", "canceled"], default: "pending" },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Order", orderSchema);

// لماذا؟ يسمح لك بتتبع عمليات البيع والشراء بين البائعين والمشترين.
// البيانات المطلوبة:
// المشتري (buyer: مرجع إلى User).
// السيارة (car: مرجع إلى Car).
// السعر المتفق عليه.
// حالة الطلب (معلق، مؤكد، ملغي).
// تاريخ الطلب.