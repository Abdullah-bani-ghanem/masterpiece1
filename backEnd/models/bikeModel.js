// // bikeModel.js
// const mongoose = require('mongoose');

// const bikeSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   brand: { type: String, required: true },
//   type: { type: String, required: true }, // نوع الدراجة (جبلية، سباق، إلخ)
//   price: { type: Number, required: true },
//   description: { type: String },
//   imageUrl: { type: String }, // صورة الدراجة
//   createdAt: { type: Date, default: Date.now }
// });

// module.exports = mongoose.model('Bike', bikeSchema);


const mongoose = require("mongoose");

const bikeSchema = new mongoose.Schema({
  name: { type: String, required: true }, // اسم الدراجة
  brand: { type: String, required: true }, // العلامة التجارية
  type: { type: String, required: true }, // نوع الدراجة (جبلية، سباق، إلخ)
  model: { type: String, required: true }, // موديل الدراجة
  year: { type: Number, required: true }, // سنة الصنع
  price: { type: Number, required: true }, // السعر
  condition: { type: String, enum: ["new", "used"], required: true }, // حالة الدراجة (جديدة، مستعملة)
  images: [{ type: String }], // مصفوفة صور الدراجة
  description: { type: String }, // وصف الدراجة
  seller: { type: mongoose.Schema.Types.ObjectId, ref: "User",  }, // بائع الدراجة (مرتبط بنموذج المستخدم)
  status: { // حالة الموافقة على الدراجة
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending", // افتراض أن الدراجة في حالة انتظار
  },
  adminNote: { type: String }, // ملاحظات المسؤول
  createdAt: { type: Date, default: Date.now }, // تاريخ الإنشاء
  updatedAt: { type: Date, default: Date.now }, // تاريخ آخر تحديث
  
});

// تحديث الحقل updatedAt عند حفظ الدراجة
bikeSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model("Bike", bikeSchema);
