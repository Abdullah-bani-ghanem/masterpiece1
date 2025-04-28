const FormCar = require('../models/formCarModel');

// POST /api/cars
const createCar = async (req, res) => {
    console.log('sv', req);
    
  try {
    const {
      make,
      model,
      year,
      color,
      licensePlate,
      mileage,
      fuelType,
      transmission,
      price,
    } = req.body;

    const newCar = new FormCar({
      make,
      model,
      year,
      color,
      licensePlate,
      mileage,
      fuelType,
      transmission,
      price,
      imageUrl: req.file ? `/uploads/${req.file.filename}` : '', // إذا رفعنا صورة
    });

    await newCar.save();
    res.status(201).json({ message: 'Car added successfully', data: newCar });
  } catch (error) {
    console.error('Error creating car:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  createCar,
};
