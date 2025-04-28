const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");





exports.register = async (req, res) => {
  const { name, email, password, phoneNumber, role } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "البريد الإلكتروني مستخدم بالفعل" });
    }

    const newUser = new User({ name, email, password, phoneNumber, role });
    await newUser.save();

    const token = jwt.sign(
      { id: newUser._id, name: newUser.name, email: newUser.email, role: newUser.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.cookie("token", token, {
      httpOnly: false,
      secure: false,
      sameSite: "lax",
      maxAge: 3600000,
    });

    res.status(201).json({ message: "تم التسجيل بنجاح" });
  } catch (error) {
    res.status(500).json({ message: "خطأ في التسجيل", error });
  }
};






exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "البريد الإلكتروني أو كلمة المرور غير صحيحة" });
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: "البريد الإلكتروني أو كلمة المرور غير صحيحة" });
    }

    const token = jwt.sign(
      { id: user._id, name: user.name, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.cookie("token", token, {
      httpOnly: false,
      secure: false,
      sameSite: "lax",
      maxAge: 3600000,
    });

    res.status(200).json({
      message: "تم تسجيل الدخول",
      token, // <-- هذا ضروري
      user,  // ممكن تضيف بيانات المستخدم كمان
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "حدث خطأ غير متوقع" });
  }
};






exports.logout = (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
  });
  res.json({ message: "تم تسجيل الخروج بنجاح" });
};






exports.checkAuth = async (req, res) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ authenticated: false, message: "لم يتم تسجيل الدخول" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select("-password");
    if (!user) {
      return res.status(404).json({ authenticated: false, message: "المستخدم غير موجود" });
    }

    res.json({ authenticated: true, user });
  } catch (error) {
    res.status(401).json({ authenticated: false, message: "توكن غير صالح" });
  }
};









exports.updateProfile = async (req, res) => {
  const token = req.cookies.token;
  const jwt = require("jsonwebtoken");
  const User = require("../models/User");

  if (!token) {
    return res.status(401).json({ message: "غير مصرح" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(404).json({ message: "المستخدم غير موجود" });
    }

    const fieldsToUpdate = ['name', 'email', 'phoneNumber', 'address', 'bio'];
    fieldsToUpdate.forEach(field => {
      if (req.body[field] !== undefined) {
        user[field] = req.body[field];
      }
    });

    if (req.file) {
      const imageUrl = `http://localhost:5000/uploads/${req.file.filename}`;
      user.profilePicture = imageUrl;
    }

    await user.save();
    res.status(200).json({ message: "تم تحديث الملف الشخصي", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "حدث خطأ أثناء التحديث" });
  }
};





//جلب كل المستخدمين
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password"); // بدون الباسوورد
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "فشل في جلب المستخدمين", error: error.message });
  }
};




//حذف المستخدم
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "المستخدم غير موجود" });
    }
    res.status(200).json({ message: "تم حذف المستخدم بنجاح" });
  } catch (error) {
    res.status(500).json({ message: "فشل في حذف المستخدم", error: error.message });
  }
};





//اضافه مستخدم جديد
exports.createUser = async (req, res) => {
  try {
    const { name, email, phoneNumber, password, role } = req.body;

    if (!name || !email || !phoneNumber || !password) {
      return res.status(400).json({ message: "الاسم، الإيميل، وكلمة السر مطلوبة" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "هذا البريد مستخدم بالفعل" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      phoneNumber,
      password: hashedPassword,
      role: role || "user",
    });

    await user.save();

    res.status(201).json({ message: "تم إنشاء المستخدم", user });
  } catch (error) {
    console.error("❌ فشل في إنشاء المستخدم:", error.message); // مهم
    res.status(500).json({ message: "خطأ في السيرفر", error: error.message });
  }
};





//جلب بيانات مستخدم من خلال الid
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) return res.status(404).json({ message: "المستخدم غير موجود" });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "فشل في جلب بيانات المستخدم", error: error.message });
  }
};






//تعديل بيانات مستخدم
exports.updateUser = async (req, res) => {
  try {
    const { name, email, phoneNumber, role } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { name, email, phoneNumber, role },
      { new: true, runValidators: true }
    );

    if (!updatedUser) return res.status(404).json({ message: "المستخدم غير موجود" });

    res.status(200).json({ message: "✅ تم تحديث المستخدم بنجاح", user: updatedUser });
  } catch (error) {
    res.status(500).json({ message: "❌ فشل في التحديث", error: error.message });
  }
};








// دالة لجلب عدد المستخدمين المسجلين
exports.getUserCount = async (req, res) => {
 
    try {
      const users = await User.find().select("-password"); // بدون الباسوورد
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ message: "فشل في جلب المستخدمين", error: error.message });
    }
};