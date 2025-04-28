// const express = require("express");
// const router = express.Router();
// const userController = require("../controllers/userController");
// router.get("/check-auth", userController.checkAuth);
// // المسارات
// router.post("/register", userController.register);  // التسجيل
// router.post("/login", userController.login);        // تسجيل الدخول
// router.post("/logout", userController.logout);        // تسجيل الدخول

// module.exports = router;


const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const upload = require("../middleware/multerConfig");
const { protect, isAdmin } = require("../middleware/auth");


router.get("/check-auth", userController.checkAuth);
router.post("/register", userController.register);
router.post("/login", userController.login);
router.post("/logout", userController.logout);
// router.put("/update-profile", userController.updateProfile);
router.put("/update-profile", upload.single("profileImage"), userController.updateProfile);
// ✅ راوت جلب كل المستخدمين (للأدمن فقط)
router.get("/", protect, isAdmin, userController.getAllUsers);

router.delete("/:id", protect, isAdmin, userController.deleteUser);

// إضافة مستخدم جديد (فقط أدمن)
router.post("/", protect, isAdmin, userController.createUser);


// جلب بيانات مستخدم معيّن
router.get("/:id", protect, isAdmin, userController.getUserById);

// تعديل بيانات مستخدم
router.put("/:id", protect, isAdmin, userController.updateUser);



// مسار جلب عدد المستخدمين المسجلين
router.get('/user-count', userController.getUserCount);



module.exports = router;
