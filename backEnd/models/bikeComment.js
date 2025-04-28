const mongoose = require('mongoose');

const bikeCommentSchema = new mongoose.Schema({
    bikeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Bike',
        required: true,
    },
    comment: {
        type: String,
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
}, { timestamps: true });

// استخدم هذا الأسلوب للتحقق إذا كان الموديل موجودًا بالفعل لتجنب إعادة تعريفه
// const Comment = mongoose.models.Comment || mongoose.model('bikeIdComment', commentSchema);

// module.exports = Comment;
module.exports = mongoose.model('bikeIdComment', bikeCommentSchema);
