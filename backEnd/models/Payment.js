// models/Payment.js
const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  cardName: { type: String, required: true },
  cardNumber: { type: String, required: true },
  securityCode: { type: String, required: true },
  expiryDate: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Payment', paymentSchema);















// const mongoose = require("mongoose");

// const paymentSchema = new mongoose.Schema({
//     user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
//     order: { type: mongoose.Schema.Types.ObjectId, ref: "Order", required: true },
//     amount: { type: Number, required: true },
//     method: { type: String, enum: ["paypal", "credit_card"], required: true },
//     status: { type: String, enum: ["success", "failed"], default: "success" },
//     createdAt: { type: Date, default: Date.now }
// });

// module.exports = mongoose.model("Payment", paymentSchema);

// // لماذا؟ يساعدك في تسجيل عمليات الدفع عند شراء السيارات.
// // البيانات المطلوبة:
// // المستخدم (user: مرجع إلى User).
// // الطلب (order: مرجع إلى Order).
// // المبلغ.
// // طريقة الدفع (PayPal، بطاقة ائتمان، إلخ).
// // حالة الدفع (ناجح، فشل).
// // تاريخ الدفع.