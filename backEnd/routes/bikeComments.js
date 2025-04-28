// routes/bikeComments.js
const express = require('express');
const router = express.Router();
const bikeCommentsController = require('../controllers/bikeCommentsController');
const { protect, isAdmin,authMiddleware, isCommentOwner } = require('../middleware/auth');

// إضافة تعليق
router.post('/:addBikeId', protect, bikeCommentsController.addComment);

// الحصول على التعليقات
router.get('/:bikeId', bikeCommentsController.getComments);

// تعديل تعليق
router.put('/update/:commentId', protect, bikeCommentsController.updateComment);

// حذف تعليق
router.delete('/delete/:commentId', protect, bikeCommentsController.deleteComment);

module.exports = router;
