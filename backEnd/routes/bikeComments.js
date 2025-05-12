// routes/bikeComments.js
const express = require('express');
const router = express.Router();
const bikeCommentsController = require('../controllers/bikeCommentsController');
const { protect, isAdmin,authMiddleware, isCommentOwner } = require('../middleware/auth');


// APIs لإدارة تعليقات الدراجات
router.get('/admin/all', protect, isAdmin, bikeCommentsController.getAllBikeComments);
router.delete('/admin/:id', protect, isAdmin, bikeCommentsController.deleteBikeComment);

// إضافة تعليق
router.post('/:addBikeId', protect, bikeCommentsController.addComment);

// الحصول على التعليقات
router.get('/:bikeId', bikeCommentsController.getComments);

// تعديل تعليق
router.put('/update/:commentId', protect, bikeCommentsController.updateComment);

// حذف تعليق
router.delete('/delete/:commentId', protect, bikeCommentsController.deleteComment);




module.exports = router;
