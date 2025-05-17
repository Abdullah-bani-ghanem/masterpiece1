// const jwt = require("jsonwebtoken");

// const checkAuth = (req, res) => {
//     try {
//         const token = req.cookies.token; // استخراج التوكن من الكوكيز
//         if (!token) {
//             return res.status(401).json({ authenticated: false, message: "Unauthorized" });
//         }

//         const decoded = jwt.verify(token, process.env.JWT_SECRET); // فك تشفير التوكن
//         console.log(decoded,"decoded")
//         console.log(decoded,"decoded")
//         // استخراج بيانات المستخدم من التوكن
//         const user = {
//             id: decoded.id,
//             name: decoded.name,  // تأكد من أن الاسم موجود في التوكن عند إنشائه
//             email: decoded.email,
//         };

//         return res.json({
//             authenticated: true,
//             user: user, // إرسال بيانات المستخدم كاملة
//         });
//     } catch (error) {
//         return res.status(401).json({ authenticated: false, message: "Invalid token" });
//     }
// };

// module.exports = checkAuth;





// const jwt = require("jsonwebtoken");
// const User = require("../models/User");

// const checkAuth = async (req, res) => {
//   try {
//     const token = req.cookies.token;
//     if (!token) {
//       return res.status(401).json({ authenticated: false, message: "Unauthorized" });
//     }

//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     const user = await User.findById(decoded.id).select("-password");

//     if (!user) {
//       return res.status(404).json({ authenticated: false, message: "المستخدم غير موجود" });
//     }

//     return res.json({
//       authenticated: true,
//       user,
//     });
//   } catch (error) {
//     return res.status(401).json({ authenticated: false, message: "Invalid token" });
//   }
// };

// module.exports = checkAuth;




// const jwt = require("jsonwebtoken");
// const User = require("../models/User");

// const protect = async (req, res, next) => {
//   try {
//     const token = req.headers.authorization?.split(" ")[1];
//     if (!token) return res.status(401).json({ message: "Unauthorized" });

//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = await User.findById(decoded.id).select("-password");
//     next();
//   } catch (error) {
//     res.status(401).json({ message: "Token failed" });
//   }
// };

// const isAdmin = (req, res, next) => {
//   if (req.user && req.user.role === "admin") {
//     next();
//   } else {
//     res.status(403).json({ message: "Access denied. Admins only." });
//   }
// };

// module.exports = { protect, isAdmin };



  const jwt = require("jsonwebtoken");
  const User = require("../models/User");
  const Comment = require('../models/carComment');

  // const protect = async (req, res, next) => {
  //   try {
  //     const token = req.headers.authorization?.split(" ")[1];
  //     if (!token) return res.status(401).json({ message: "Unauthorized" });

  //     const decoded = jwt.verify(token, process.env.JWT_SECRET);
  //     req.user = await User.findById(decoded.id).select("-password");
  //     next();
  //   } catch (error) {
  //     res.status(401).json({ message: "Token failed" });
  //   }
  // };


  const protect = async (req, res, next) => {
    try {
      let token;
  
      // أول شي نحاول نقرأ التوكن من الكوكي
      if (req.cookies.token) {
        token = req.cookies.token;
      }
      // إذا مش موجود، نجرب من الهيدر Authorization
      else if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        token = req.headers.authorization.split(" ")[1];
      }
  
      if (!token) {
        return res.status(401).json({ message: "Not authorized, no token" });
      }
  
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select("-password");
      next();
    } catch (error) {
      console.error(error);
      res.status(401).json({ message: "Not authorized, token failed" });
    }
  };



  
  // هذا الـ middleware يتحقق من أن المستخدم لديه صلاحيات admin فقط
  const isAdmin = (req, res, next) => {
    if (req.user && req.user.role === "admin") {
      next();
    } else {
      res.status(403).json({ message: "Access denied. Admins only." });
    }
  };

  // التحقق من أن المستخدم الذي أضاف التعليق هو نفسه المستخدم الذي قام بالتعليق
  // const isCommentOwner = (req, res, next) => {
  //   const commentOwnerId = req.body.userId; // أو استخرج id من قاعدة البيانات بناءً على الـ comment
  //   if (req.user.id === commentOwnerId) {
  //     next();
  //   } else {
  //     res.status(403).json({ message: "You are not authorized to delete or modify this comment" });
  //   }
  // };


  const isCommentOwner = async (req, res, next) => {
    try {
      const comment = await Comment.findById(req.params.commentId); // أو استخدم `req.body.commentId` إذا كان موجودًا في الجسم

      if (!comment) {
        return res.status(404).json({ message: "Comment not found." });
      }

      // التحقق من أن المستخدم هو الذي أضاف التعليق
      if (req.user.id === comment.userId.toString()) {
        next();
      } else {
        res.status(403).json({ message: "You are not authorized to delete or modify this comment" });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Failed to verify comment ownership." });
    }
  };





  //هذا الجزء يضمن أن المستخدمين الذين يضيفون تعليقات هم مستخدمون مصادق عليهم.
  const authMiddleware = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1]; // الحصول على التوكن من الهيدر
        if (!token) return res.status(401).json({ message: 'No token provided' });

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.userId);
        if (!user) return res.status(401).json({ message: 'User not found' });

        req.user = user; // إضافة المستخدم إلى الكائن request
        next();
    } catch (err) {
        res.status(401).json({ message: 'Invalid token' });
    }
  };

  module.exports = { protect, isAdmin, isCommentOwner,authMiddleware };









  exports.adminOnly = (req, res, next) => {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: "Admins only" });
    }
    next();
  };
  

  