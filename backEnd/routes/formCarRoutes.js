const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { createCar } = require('../controllers/formCarController');

// إعداد رفع الصورة
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

// مسار إضافة سيارة
router.post('/create', upload.single('carImage'), createCar);

module.exports = router;
