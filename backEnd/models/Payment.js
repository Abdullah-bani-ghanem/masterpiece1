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