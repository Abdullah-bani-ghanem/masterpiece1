const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
    reviewer: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    car: { type: mongoose.Schema.Types.ObjectId, ref: "Car", required: true },
    rating: { type: Number, min: 1, max: 5, required: true },
    comment: { type: String },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Review", reviewSchema);
// لماذا؟ يسمح للمشترين بتقييم البائعين أو السيارات.
// البيانات المطلوبة:
// المقيِّم (reviewer: مرجع إلى User).
// السيارة (car: مرجع إلى Car).
// التقييم (عدد من 1 إلى 5).
// التعليق.
// تاريخ المراجعة.