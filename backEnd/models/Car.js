

const mongoose = require("mongoose");

const carSchema = new mongoose.Schema({
  name: { type: String, required: true },
  brand: { type: String, required: true },
  model: { type: String, required: true },
  year: { type: Number, required: true },
  price: { type: Number, required: true },
  condition: { type: String, enum: ["new", "used"], required: true },
  images: [{ type: String }], // ✅ مصفوفة صور
  description: { type: String },

  seller: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

  status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending",
  },

  adminNote: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

carSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model("Car", carSchema);




// const mongoose = require('mongoose');

// const carSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   brand: { type: String, required: true },
//   model: { type: String, required: true },
//   year: { type: Number, required: true },
//   price: { type: Number, required: true },
//   condition: { type: String, enum: ['new', 'used'], required: true },
//   description: { type: String },
//   images: [{ type: String }],
//   userEmail: { type: String },
//   userPhone: { type: String },
//   userName: { type: String },
//   seller: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
//   createdAt: { type: Date, default: Date.now },
//   updatedAt: { type: Date, default: Date.now },
// });

// module.exports = mongoose.model('Car', carSchema);










// const mongoose = require('mongoose');

// const carSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   brand: { type: String, required: true },
//   model: { type: String, required: true },
//   year: { type: Number, required: true },
//   price: { type: Number, required: true },
//   images: [{ type: String }],
//   description: { type: String },
//   seller: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
//   status: { type: String, enum: ["pending", "approved", "rejected"], default: "pending" },
//   adminNote: { type: String },
//   createdAt: { type: Date, default: Date.now },
//   updatedAt: { type: Date, default: Date.now },
//   comments: [{  // إضافة حقل التعليقات
//     user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
//     comment: { type: String, required: true },
//     createdAt: { type: Date, default: Date.now }
//   }]
// });

// carSchema.pre("save", function (next) {
//   this.updatedAt = Date.now();
//   next();
// });

// module.exports = mongoose.model("Car", carSchema);
