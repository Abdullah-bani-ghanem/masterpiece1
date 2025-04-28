// controllers/paymentController.js
const Payment = require('../models/Payment');

exports.createPayment = async (req, res) => {
  try {
    const { cardName, cardNumber, securityCode, expiryDate } = req.body;

    const payment = new Payment({
      cardName,
      cardNumber,
      securityCode,
      expiryDate
    });

    await payment.save();
    res.status(201).json({ message: 'Payment saved successfully!' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};
