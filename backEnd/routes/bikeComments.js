const express = require('express');
const router = express.Router();
const bikeCommentsController = require('../controllers/bikeCommentsController');
const { protect, isAdmin,authMiddleware, isCommentOwner } = require('../middleware/auth');


//Admin Routes
router.get('/admin/all', protect, isAdmin, bikeCommentsController.getAllBikeComments);//جلب التعليقات

router.delete('/admin/:id', protect, isAdmin, bikeCommentsController.deleteBikeComment);//حذف تعليق معين

//////////////////////////////////

//Public Routes
router.get('/:bikeId', bikeCommentsController.getComments);// الحصول على التعليقات

/////////////////////////////////

//User Routes
router.post('/:addBikeId', protect, bikeCommentsController.addComment);// إضافة تعليق

router.put('/update/:commentId', protect, bikeCommentsController.updateComment);// تعديل تعليق

router.delete('/delete/:commentId', protect, bikeCommentsController.deleteComment);// حذف تعليق


module.exports = router;
