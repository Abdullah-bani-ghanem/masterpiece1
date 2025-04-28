const mongoose = require('mongoose');

const formCarSchema = new mongoose.Schema({
  make: String,
  model: String,
  year: Number,
  color: String,
  licensePlate: String,
  mileage: Number,
  fuelType: String,
  transmission: { type: String, enum: ['automatic', 'manual'] },
  price: Number,
  imageUrl: String, // لاحقًا نستخدمه عند رفع الصورة
}, {
  timestamps: true
});

module.exports = mongoose.model('FormCar', formCarSchema);


