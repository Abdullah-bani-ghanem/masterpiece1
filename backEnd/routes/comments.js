const express = require('express');
const router = express.Router();
const { addComment, getComments, updateComment, deleteComment, adminDeleteComment, getAllComments } = require('../controllers/commentsController');
const { protect, isAdmin, isCommentOwner } = require('../middleware/auth');
// مسار جلب جميع التعليقات

router.get('/allComments', protect, isAdmin, getAllComments);

// مسار إضافة تعليق (حماية الوصول إلى المسار من خلال التوكن)
router.post('/:carId', protect, addComment);

// مسار جلب التعليقات الخاصة بسيارة معينة
router.get('/:carId', getComments);

// مسار تعديل تعليق معين (حماية الوصول من خلال التوكن و التحقق من مالك التعليق)
router.put('/:commentId', protect, isCommentOwner, updateComment);

// مسار حذف تعليق معين (حماية الوصول من خلال التوكن و التحقق من مالك التعليق)
router.delete('/:commentId', protect, isCommentOwner, deleteComment);

// جلب جميع التعليقات
// router.get('/comments', getComments); 
router.delete('/:commentId', protect, isAdmin, adminDeleteComment);

module.exports = router;
