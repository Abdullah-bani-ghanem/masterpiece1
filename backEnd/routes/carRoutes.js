const express = require("express");
const router = express.Router();
const carController = require("../controllers/carController");
const { protect, isAdmin } = require("../middleware/auth");


// Multer setup
const multer = require("multer");
const upload = multer({ dest: "uploads/" }); // You can customize this


// إرسال سيارة جديدة من المستخدم
// router.post("/submit", protect, upload.single("images"), carController.submitCarRequest);
router.post("/submit", protect, upload.array("images", 5), carController.submitCarRequest);

// مستخدم عادي يضيف سيارة
router.post("/add", protect, carController.addCar);

router.post("/addByAdmin", protect,isAdmin, carController.addCarByAdmin);



// فقط الأدمن يشوف السيارات المعلقة
router.get("/pending", protect, isAdmin, carController.getPendingCars);

// الأدمن يوافق أو يرفض سيارة
router.patch("/status/:id", protect, isAdmin, carController.approveOrRejectCar);

// الأدمن يعدّل معلومات السيارة
router.put("/admin/update/:id", protect, isAdmin, carController.updateCarByAdmin);

// المستخدم يرسل سيارة
router.post("/submit", protect, carController.submitCarRequest); // ✅ صح


// عرض السيارات المعلقة
router.get("/pending", protect, isAdmin, carController.getPendingCars);


// الأدمن يوافق على السيارة ويعدلها
router.put("/approve/:id", protect, isAdmin, carController.approveAndEditCar);

//بجيب كل السيارات من api مع فلتره
// router.get("/all", protect, isAdmin, carController.getAllCars);

router.get("/all", protect, isAdmin, carController.getAllCarsForAdmin);

router.get("/:id", protect, carController.getCarById);

router.get('/approved-cars/:id', carController.getApprovedCars);////

router.delete('/:id', carController.deleteCar);////


// مسار جلب عدد السيارات المعتمدة
router.get('/approved-car-count', carController.getApprovedCarCount);



// // مسار لإضافة تعليق
// router.post('/:carId/comments', carController.addComment);

// // مسار لاسترجاع التعليقات
// router.get('/:carId/comments', carController.getComments);






module.exports = router;

