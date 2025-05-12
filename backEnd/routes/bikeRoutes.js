const express = require('express');
const { getAllBikes, addBike, deleteBike, updateBike, getBikeById, getApprovedBikes, getPendingBikes, approveOrRejectBike, approveAndEditBike, getApprovedBikeCount } = require('../controllers/bikeController');
const { protect, isAdmin } = require('../middleware/auth');


const multer = require("multer");
const upload = multer({ dest: "uploads/" }); // You can customize this
const router = express.Router();

// إرسال دراجة جديدة من المستخدم
router.post("/submit", protect, upload.array("images", 5), addBike);  // تعديل بناءً على السكيما الجديدة

// المستخدم يضيف دراجة جديدة
// router.post("/add", protect, addBike);

// فقط الأدمن يشوف الدراجات 
// router.get("/pending", protect, isAdmin, getPendingBikes);
router.get("/pending", protect, isAdmin, getAllBikes);

// الأدمن يوافق أو يرفض الدراجة
router.put("/status/:id", protect, isAdmin, approveOrRejectBike);

// الأدمن يعدّل معلومات الدراجة
router.put("/admin/update/:id", protect, isAdmin, updateBike);

// عرض جميع الدراجات المعتمدة
router.get('/approved-bikes', getApprovedBikes);

// جلب كل الدراجات (للأدمن فقط مع فلاتر)
router.get('/all', protect, isAdmin, getAllBikes);

// جلب تفاصيل الدراجة بواسطة ID
router.get("/:id", protect, getBikeById);

// جلب الدراجات المعتمدة فقط
router.get('/approved-bikes/:id', getApprovedBikes);

// حذف دراجة بواسطة ID
router.delete('/:id', protect, deleteBike);

// مسار لجلب عدد الدراجات المعتمدة
router.get('/approved-bike-count', getApprovedBikeCount);

// مسار لإضافة تعليق
// router.post('/:bikeId/comments', addComment); // Uncomment this if needed

module.exports = router;
