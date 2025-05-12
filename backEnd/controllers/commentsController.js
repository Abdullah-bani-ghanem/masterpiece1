const Comment = require('../models/carComment');
const Car = require('../models/Car');

// 1. إضافة تعليق جديد
exports.addComment = async (req, res) => {
    const { carId } = req.params; // استخراج carId من الرابط
    const { comment } = req.body; // استخراج التعليق من الجسم (Body)
    const userId = req.user.id; // استخراج userId من الميدل وير (تم التحقق من التوكن)

    if (!comment) {
        return res.status(400).json({ message: 'Comment is required.' });
    }

    try {
        // تحقق من وجود السيارة
        const car = await Car.findById(carId);
        if (!car) {
            return res.status(404).json({ message: 'Car not found.' });
        }

        // إنشاء التعليق الجديد
        const newComment = new Comment({
            carId,
            userId,  // التأكد من أن userId ممرر هنا
            comment
        });

        await newComment.save();

        res.status(201).json(newComment); // إرجاع التعليق الجديد
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to add comment.' });
    }
};




// 2. جلب التعليقات الخاصة بسيارة معينة
exports.getComments = async (req, res) => {
    const { carId } = req.params;

    try {
        // استرجاع التعليقات مع البيانات الإضافية للمستخدم مثل `username`
        const comments = await Comment.find({ carId })
            .populate('userId', 'name email username')  // إضافة username هنا
            .sort({ createdAt: -1 }); // ترتيب التعليقات من الأحدث إلى الأقدم

        res.json(comments);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to load comments.' });
    }
};





exports.getAllComments = async (req, res) => {
    try {

        const comments = await Comment.find()
            .populate('userId', 'name email username')  // التأكد من أن `username` يتم استرجاعه
            .sort({ createdAt: -1 });  // ترتيب التعليقات من الأحدث إلى الأقدم

        res.json(comments);
    } catch (err) {
        console.error('Error fetching comments:', err);  // سجل الخطأ
        res.status(500).json({ message: 'Failed to load comments.' });
    }
};




// دالة لتحديث تعليق معين
exports.updateComment = async (req, res) => {
    const { commentId } = req.params;
    const { comment } = req.body;

    try {
        const updatedComment = await Comment.findByIdAndUpdate(
            commentId,
            { comment },
            { new: true } // إرجاع التعليق بعد التحديث
        );
        if (!updatedComment) {
            return res.status(404).json({ message: 'Comment not found.' });
        }

        res.json(updatedComment);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to update comment.' });
    }
};



// دالة لحذف تعليق معين

exports.deleteComment = async (req, res) => {
    const { commentId } = req.params;

    try {
        // بدلاً من `remove()` استخدم `findByIdAndDelete()` لحذف التعليق مباشرة
        const comment = await Comment.findByIdAndDelete(commentId);

        if (!comment) {
            return res.status(404).json({ message: 'Comment not found.' });
        }

        res.status(200).json({ message: 'Comment deleted successfully.' });
    } catch (err) {
        console.error("Error deleting comment:", err);
        res.status(500).json({ message: 'Failed to delete comment.' });
    }
};





exports.adminDeleteComment = async (req, res) => {
    const { commentId } = req.params;

    try {
        const comment = await Comment.findByIdAndDelete(commentId);

        if (!comment) {
            return res.status(404).json({ message: 'Comment not found.' });
        }

        res.status(200).json({ message: 'Comment deleted successfully by admin.' });
    } catch (err) {
        console.error('Error deleting comment by admin:', err);
        res.status(500).json({ message: 'Failed to delete comment by admin.' });
    }
};







// جلب جميع تعليقات الدراجات
exports.getAllBikeComments = async (req, res) => {
    try {
      const comments = await BikeComment.find().populate('userId', 'name email');
      res.status(200).json(comments);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching bike comments', error });
    }
  };
  
  // حذف تعليق دراجة
  exports.deleteBikeComment = async (req, res) => {
    try {
      const { id } = req.params;
      await BikeComment.findByIdAndDelete(id);
      res.status(200).json({ message: 'Bike comment deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting bike comment', error });
    }
  };