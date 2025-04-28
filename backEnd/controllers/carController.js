


const Car = require("../models/Car");

// 1. إضافة سيارة جديدة من قبل المستخدم
// exports.addCar = async (req, res) => {
//   try {
//     // استخراج البيانات من الجسم (request body)
//     const { 
//       name, 
//       brand, 
//       model, 
//       year, 
//       price, 
//       condition, 
//       images, 
//       description,
//       userEmail,   // البريد الإلكتروني للمستخدم
//       userPhone,   // رقم الهاتف للمستخدم
//       userName     // اسم المستخدم
//     } = req.body;

//     // تحقق من وجود جميع البيانات المطلوبة
//     if (!name || !brand || !model || !year || !price || !condition) {
//       return res.status(400).json({ message: "جميع الحقول المطلوبة يجب أن تكون مملوءة" });
//     }

//     // إنشاء السيارة الجديدة
//     const newCar = new Car({
//       name,
//       brand,
//       model,
//       year,
//       price,
//       condition,
//       images,
//       description,
//       userEmail,  // إضافة البريد الإلكتروني للمستخدم
//       userPhone,  // إضافة رقم الهاتف للمستخدم
//       userName,   // إضافة اسم المستخدم
//       seller: req.user._id, // تأكد أن الـ middleware يضيف req.user
//     });

//     // حفظ السيارة في قاعدة البيانات
//     await newCar.save();

//     // إرسال استجابة ناجحة
//     res.status(201).json({ message: "تم إرسال السيارة للمراجعة", car: newCar });

//   } catch (err) {
//     // التعامل مع الأخطاء
//     res.status(500).json({ message: "فشل الإرسال", error: err.message });
//   }
// };


exports.addCar = async (req, res) => {
  try {
    const { name, brand, model, year, price, condition, images, description } = req.body;

    const newCar = new Car({
      name,
      brand,
      model,
      year,
      price,
      condition,
      images,
      description,
      seller: req.user._id, // تأكد أن الـ middleware يضيف req.user
    });

    await newCar.save();
    res.status(201).json({ message: "تم إرسال السيارة للمراجعة", car: newCar });
  } catch (err) {
    res.status(500).json({ message: "فشل الإرسال", error: err.message });
  }
};






exports.addCarByAdmin = async (req, res) => {
  try {
    const { name, brand, model, year, price, description } = req.body;
    if (!name || !brand || !model || !year || !price || !description) {
      return res.status(400).json({ message: "كل الحقول مطلوبة!" });
    }

    // إذا كانت الصور موجودة
    const images = req.files ? req.files.map(file => file.filename) : [];

    // إنشاء السيارة في قاعدة البيانات
    const newCar = new Car({
      name,
      brand,
      model,
      year,
      price,
      images,
      description,
      seller: req.user._id,  // تأكد من أنك تضيف الـ user بشكل صحيح
    });

    await newCar.save();
    res.status(201).json({ message: "تم إرسال السيارة", car: newCar });
  } catch (err) {
    console.error("Error in adding car:", err);  // إضافة تسجيل الأخطاء
    res.status(500).json({ message: "فشل الإرسال", error: err.message });
  }
};




// 2. جلب كل السيارات المعلّقة (للأدمن)
exports.getPendingCars = async (req, res) => {
  try {
    const cars = await Car.find({ status: "pending" }).populate("seller", "name email");
    res.status(200).json(cars);
  } catch (err) {
    res.status(500).json({ message: "حدث خطأ أثناء الجلب", error: err.message });
  }
};




// 3. موافقة أو رفض السيارة
exports.approveOrRejectCar = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, adminNote } = req.body;

    if (!["approved", "rejected"].includes(status)) {
      return res.status(400).json({ message: "الحالة غير صحيحة" });
    }

    const updatedCar = await Car.findByIdAndUpdate(
      id,
      { status, adminNote, updatedAt: Date.now() },
      { new: true }
    );

    if (!updatedCar) return res.status(404).json({ message: "السيارة غير موجودة" });

    res.status(200).json({ message: `تم ${status === "approved" ? "الموافقة" : "الرفض"}`, car: updatedCar });
  } catch (err) {
    res.status(500).json({ message: "فشل التحديث", error: err.message });
  }
};




// 4. تعديل بيانات السيارة من قبل الأدمن
exports.updateCarByAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const updatedCar = await Car.findByIdAndUpdate(id, { ...updates, updatedAt: Date.now() }, { new: true });

    if (!updatedCar) return res.status(404).json({ message: "السيارة غير موجودة" });

    res.status(200).json({ message: "تم تعديل بيانات السيارة", car: updatedCar });
  } catch (err) {
    res.status(500).json({ message: "فشل التحديث", error: err.message });
  }
};



exports.getCarById = async (req, res) => {
    try {
      const car = await Car.findById(req.params.id).populate("seller", "name email");
      if (!car) return res.status(404).json({ message: "السيارة غير موجودة" });
  
      res.status(200).json(car);
    } catch (error) {
      res.status(500).json({ message: "فشل في جلب بيانات السيارة", error: error.message });
    }
  };
  


  exports.getAllCarsForAdmin = async (req, res) => {
    try {
      const filter = req.query.status ? { status: req.query.status } : {};
  
      const cars = await Car.find(filter).populate("seller", "name email");
  
      res.status(200).json(cars);
    } catch (error) {
      console.error("❌ getAllCarsForAdmin ERROR:", error.message);
      res.status(500).json({ message: "فشل في جلب السيارات", error: error.message });
    }
  };
  


// إنشاء طلب سيارة من المستخدم (بانتظار الموافقة)
exports.submitCarRequest = async (req, res) => {
    try {
      const {
        make,
        model,
        year,
        color,
        licensePlate,
        mileage,
        fuelType,
        transmission,
        price,
        condition,
        description,
      } = req.body;
  
      const imageFilenames = req.files.map(file => file.filename); // ✅ دعم صور متعددة
  
      const newCar = new Car({
        name: `${make} ${model}`,
        brand: make,
        model,
        year: parseInt(year),
        color,
        licensePlate,
        mileage: parseInt(mileage),
        fuelType,
        transmission,
        price: parseFloat(price),
        condition,
        description,
        images: imageFilenames,
        seller: req.user._id,
        status: "pending",
      });
  
      await newCar.save();
  
      res.status(201).json({ message: "🚗 تم حفظ السيارة بنجاح", car: newCar });
    } catch (error) {
      console.error("❌ Error saving car:", error.message);
      res.status(500).json({ message: "خطأ في حفظ السيارة", error: error.message });
    }
  };
  


  // الموافقة على سيارة وتعديلها
  exports.approveAndEditCar = async (req, res) => {
    try {
      const car = await Car.findById(req.params.id);
      if (!car) return res.status(404).json({ message: "السيارة غير موجودة" });
  
      // تحديث معلومات السيارة من البودي
      Object.assign(car, req.body);
      car.approved = true;
  
      await car.save();
      res.json({ message: "تمت الموافقة على السيارة وتحديثها", car });
    } catch (error) {
      res.status(500).json({ message: "خطأ أثناء الموافقة أو التعديل", error });
    }
  };
  




  // ✅ جلب كل السيارات مع فلترة اختيارية (status)
exports.getAllCars = async (req, res) => {
    try {
      const { status } = req.query;
      const query = status ? { status } : {};
  
      const cars = await Car.find(query).populate("seller", "name email");
      res.status(200).json(cars);
    } catch (err) {
      res.status(500).json({ message: "فشل في جلب السيارات", error: err.message });
    }
  };
  


// عرض جميع السيارات المعتمدة
exports.getApprovedCars = async (req, res) => {
    try {
      const cars = await Car.find({ status: "approved" }); // جلب السيارات المعتمدة فقط
      if (!cars || cars.length === 0) {
        return res.status(404).json({ message: "No approved cars found" });
      }
      res.json(cars); // إرجاع السيارات في الاستجابة
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
  };




  // Delete Car Controller
  exports.deleteCar = async (req, res) => {
  const { id } = req.params; // الحصول على id من باراميتر الـ URL

  try {
      // البحث عن السيارة بناءً على id وحذفها
      const car = await Car.findByIdAndDelete(id);

      // إذا كانت السيارة غير موجودة، يرجع رسالة خطأ 404
      if (!car) {
          return res.status(404).json({ message: 'Car not found' });
      }

      // إذا تم الحذف بنجاح، يرجع رسالة تأكيد
      res.status(200).json({ message: 'Car deleted successfully' });
  } catch (err) {
      // إذا حدث خطأ في العملية، يرجع رسالة خطأ 500
      res.status(500).json({ message: 'Failed to delete car', error: err.message });
  }
};




// دالة لجلب عدد السيارات المعتمدة
exports.getApprovedCarCount = async (req, res) => {
  try {
    const filter = req.query.status ? { status: req.query.status } : {};

    const cars = await Car.find(filter).populate("seller", "name email");

    res.status(200).json(cars);
  } catch (error) {
    console.error("❌ getAllCarsForAdmin ERROR:", error.message);
    res.status(500).json({ message: "فشل في جلب السيارات", error: error.message });
  }
};





// إضافة تعليق
// exports.addComment = async (req, res) => {
//   const { carId } = req.params;
//   const { comment } = req.body;
//   const userId = req.user._id;  // assuming you have a user authenticated with JWT token

//   try {
//     const car = await Car.findById(carId);
//     if (!car) {
//       return res.status(404).json({ message: "Car not found" });
//     }

//     // إضافة تعليق إلى السيارة
//     car.comments.push({ user: userId, comment });
//     await car.save();

//     res.status(200).json({ message: "Comment added successfully" });
//   } catch (error) {
//     res.status(500).json({ message: "Server error", error: error.message });
//   }
// };




// // الحصول على جميع التعليقات الخاصة بالسيارة
// exports.getComments = async (req, res) => {
//   const { carId } = req.params;

//   try {
//     const car = await Car.findById(carId).populate('comments.user', 'name'); // Populate user details
//     if (!car) {
//       return res.status(404).json({ message: "Car not found" });
//     }

//     res.status(200).json(car.comments); // إرجاع التعليقات فقط
//   } catch (error) {
//     res.status(500).json({ message: "Server error", error: error.message });
//   }
// };