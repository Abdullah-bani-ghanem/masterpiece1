// // bikeController.js
// const Bike = require('../models/bikeModel');

// // جلب جميع الدراجات
// exports.getAllBikes = async (req, res) => {
//   try {
//     const bikes = await Bike.find();
//     res.status(200).json(bikes);
//   } catch (error) {
//     res.status(500).json({ message: 'حدث خطأ أثناء جلب الدراجات', error });
//   }
// };

// // إضافة دراجة جديدة
// exports.addBike = async (req, res) => {
//   try {
//     const { name, brand, type, price, description, imageUrl } = req.body;
//     const newBike = new Bike({ name, brand, type, price, description, imageUrl });
//     await newBike.save();
//     res.status(201).json({ message: 'تم إضافة الدراجة بنجاح', bike: newBike });
//   } catch (error) {
//     res.status(500).json({ message: 'حدث خطأ أثناء إضافة الدراجة', error });
//   }
// };

// // حذف دراجة
// exports.deleteBike = async (req, res) => {
//   try {
//     const bikeId = req.params.id;
//     await Bike.findByIdAndDelete(bikeId);
//     res.status(200).json({ message: 'تم حذف الدراجة بنجاح' });
//   } catch (error) {
//     res.status(500).json({ message: 'حدث خطأ أثناء الحذف', error });
//   }
// };

// // تحديث بيانات الدراجة
// exports.updateBike = async (req, res) => {
//   try {
//     const bikeId = req.params.id;
//     const updatedData = req.body;
//     const updatedBike = await Bike.findByIdAndUpdate(bikeId, updatedData, { new: true });
//     res.status(200).json({ message: 'تم تحديث الدراجة بنجاح', bike: updatedBike });
//   } catch (error) {
//     res.status(500).json({ message: 'حدث خطأ أثناء تحديث الدراجة', error });
//   }
// };
const Bike = require('../models/bikeModel');

// جلب جميع الدراجات
exports.getAllBikes = async (req, res) => {
  try {
    const bikes = await Bike.find(); // جلب جميع الدراجات من قاعدة البيانات
    res.status(200).json(bikes); // إرجاع البيانات إلى العميل
  } catch (error) {
    res.status(500).json({ message: 'حدث خطأ أثناء جلب الدراجات', error }); // إذا حدث خطأ
  }
};

// إضافة دراجة جديدة
// exports.addBike = async (req, res) => {
//   try {
//     const { name, brand, type, price, description, imageUrl, model, year, condition } = req.body;

//     // التأكد من إرسال جميع البيانات المطلوبة
//     if (!name || !brand || !type || !price || !model || !year || !condition) {
//       return res.status(400).json({ message: 'يرجى ملء جميع الحقول المطلوبة' });
//     }

//     // إنشاء الدراجة الجديدة باستخدام البيانات
//     const newBike = new Bike({
//       name,
//       brand,
//       type,
//       price,
//       description,
//       imageUrl,
//       model,
//       year,
//       condition,
//     });

//     // حفظ الدراجة في قاعدة البيانات
//     await newBike.save();
//     res.status(201).json({ message: 'تم إضافة الدراجة بنجاح', bike: newBike }); // إرجاع الدراجة المضافة
//   } catch (error) {
//     res.status(500).json({ message: 'حدث خطأ أثناء إضافة الدراجة', error }); // إذا حدث خطأ
//   }
// };


exports.addBike = async (req, res) => {
  try {

    const { name, brand, type, price, description, model, year, condition, status, adminNote } = req.body;

    if (!name || !brand || !type || !price || !model || !year || !condition || !description) {
      return res.status(400).json({ message: 'يرجى ملء جميع الحقول المطلوبة' });
    }

    // إذا كانت البيانات في تنسيق جيد، قم بإنشاء الدراجة الجديدة
    const newBike = new Bike({
      name,
      brand,
      type,
      price,
      description,
      model,
      year,
      condition,
      status,
      adminNote,
      images: req.files.map(file => file.path) // تخزين مسار الصور
    });

    await newBike.save();
    res.status(201).json({ message: 'تم إضافة الدراجة بنجاح!', bike: newBike });
  } catch (error) {
    console.error('Error while adding bike:', error);  // طباعة الخطأ
    res.status(500).json({ message: 'حدث خطأ أثناء إضافة الدراجة', error });
  }
};


// حذف دراجة بواسطة ID
exports.deleteBike = async (req, res) => {
  try {
    const bikeId = req.params.id; // الحصول على ID الدراجة من الـ URL
    await Bike.findByIdAndDelete(bikeId); // حذف الدراجة من قاعدة البيانات
    res.status(200).json({ message: 'تم حذف الدراجة بنجاح' }); // إرجاع رسالة نجاح
  } catch (error) {
    res.status(500).json({ message: 'حدث خطأ أثناء الحذف', error }); // إذا حدث خطأ
  }
};

// تحديث بيانات الدراجة بواسطة ID
exports.updateBike = async (req, res) => {
  try {
    const bikeId = req.params.id; // الحصول على ID الدراجة من الـ URL
    const updatedData = req.body; // الحصول على البيانات الجديدة من الـ request body

    // التأكد من إرسال بيانات التحديث الصحيحة
    if (!updatedData.name && !updatedData.brand && !updatedData.type && !updatedData.price && !updatedData.model && !updatedData.year && !updatedData.condition) {
      return res.status(400).json({ message: 'يرجى إرسال البيانات الصحيحة لتحديث الدراجة' });
    }

    // تحديث الدراجة في قاعدة البيانات
    const updatedBike = await Bike.findByIdAndUpdate(bikeId, updatedData, { new: true });

    if (!updatedBike) {
      return res.status(404).json({ message: 'الدراجة غير موجودة' }); // إذا كانت الدراجة غير موجودة
    }

    res.status(200).json({ message: 'تم تحديث الدراجة بنجاح', bike: updatedBike }); // إرجاع الدراجة المحدثة
  } catch (error) {
    res.status(500).json({ message: 'حدث خطأ أثناء تحديث الدراجة', error }); // إذا حدث خطأ
  }
};

// جلب الدراجة بواسطة ID
exports.getBikeById = async (req, res) => {
  try {
    const bikeId = req.params.id; // الحصول على ID الدراجة من الـ URL
    const bike = await Bike.findById(bikeId); // البحث عن الدراجة بواسطة ID

    if (!bike) {
      return res.status(404).json({ message: 'الدراجة غير موجودة' }); // إذا كانت الدراجة غير موجودة
    }

    res.status(200).json(bike); // إرجاع الدراجة
  } catch (error) {
    res.status(500).json({ message: 'حدث خطأ أثناء جلب الدراجة', error }); // إذا حدث خطأ
  }
};

// جلب الدراجات المعتمدة فقط
exports.getApprovedBikes = async (req, res) => {
  try {
    const bikes = await Bike.find({ status: 'approved' }); // جلب الدراجات المعتمدة فقط
    res.status(200).json(bikes); // إرجاع الدراجات المعتمدة
  } catch (error) {
    res.status(500).json({ message: 'حدث خطأ أثناء جلب الدراجات المعتمدة', error }); // إذا حدث خطأ
  }
};

// جلب الدراجات المعلقة فقط
exports.getPendingBikes = async (req, res) => {
  try {
    const bikes = await Bike.find({ status: 'pending' }); // جلب الدراجات المعلقة فقط
    res.status(200).json(bikes); // إرجاع الدراجات المعلقة
  } catch (error) {
    res.status(500).json({ message: 'حدث خطأ أثناء جلب الدراجات المعلقة', error }); // إذا حدث خطأ
  }
};

// الموافقة أو الرفض للدراجة
exports.approveOrRejectBike = async (req, res) => {
  try {
    const bikeId = req.params.id; // الحصول على ID الدراجة من الـ URL
    const { status } = req.body; // الحصول على الحالة (موافقة أو رفض)

    if (status !== 'approved' && status !== 'rejected') {
      return res.status(400).json({ message: 'الحالة يجب أن تكون إما "approved" أو "rejected"' });
    }

    const updatedBike = await Bike.findByIdAndUpdate(bikeId, { status }, { new: true }); // تحديث الحالة في قاعدة البيانات

    if (!updatedBike) {
      return res.status(404).json({ message: 'الدراجة غير موجودة' });
    }

    res.status(200).json({ message: 'تم تحديث حالة الدراجة بنجاح', bike: updatedBike }); // إرجاع الدراجة المحدثة
  } catch (error) {
    res.status(500).json({ message: 'حدث خطأ أثناء الموافقة أو الرفض', error });
  }
};

// جلب عدد الدراجات المعتمدة
exports.getApprovedBikeCount = async (req, res) => {
  try {
    const count = await Bike.countDocuments({ status: 'approved' }); // حساب عدد الدراجات المعتمدة
    res.status(200).json({ count }); // إرجاع العدد
  } catch (error) {
    res.status(500).json({ message: 'حدث خطأ أثناء حساب عدد الدراجات المعتمدة', error });
  }
};
