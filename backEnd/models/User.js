// const mongoose = require("mongoose");
// const bcrypt = require("bcrypt");

// const userSchema = new mongoose.Schema({
//     name: { type: String, required: true },
//     email: { type: String, required: true, unique: true },
//     password: { type: String, required: true },
//     role: { type: String, enum: ["buyer", "seller" , "admin"], default: "buyer" },
//     createdAt: { type: Date, default: Date.now }
// });

// // تشفير كلمة المرور قبل الحفظ
// userSchema.pre("save", async function (next) {
//     if (!this.isModified("password")) return next();
//     const salt = await bcrypt.genSalt(10);
//     this.password = await bcrypt.hash(this.password, salt);
//     next();
// });

// module.exports = mongoose.model("User", userSchema);



// const mongoose = require("mongoose");
// const bcrypt = require("bcryptjs");

// const userSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: true,
//   },
//   username: {
//     type: String,
//     // required: true,  // تأكد من أن `username` موجود ومطلوب
//     unique: true
//   },
//   email: {
//     type: String,
//     required: true,
//     unique: true,
//   },
//   password: {
//     type: String,
//     required: true,
//   },
//   phoneNumber: {
//     type: String,
//     required: true,
//   },
  
//   address: {
//     type: String,
//   },
  
//   bio: {
//     type: String,
//   },
  
//   profilePicture: {
//     type: String,
//   },
  
//   role: {
//     type: String,
//     enum: ["user", "admin"],
//     default: "user",
//   },
//   createdAt: {
//     type: Date, default: Date.now 
//   },
// });

// // قبل حفظ المستخدم في قاعدة البيانات، نقوم بتشفير كلمة المرور
// userSchema.pre("save", async function (next) {
//   if (!this.isModified("password")) return next();
//   this.password = await bcrypt.hash(this.password, 10);
//   next();
// });

// // دالة للتحقق من كلمة المرور
// userSchema.methods.matchPassword = async function (enteredPassword) {
//   return await bcrypt.compare(enteredPassword, this.password);
// };

// const User = mongoose.model("User", userSchema);

// module.exports = User;



const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    // required: true,  
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  address: {
    type: String,
  },
  bio: {
    type: String,
  },
  profilePicture: {
    type: String,
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  createdAt: {
    type: Date, 
    default: Date.now,
  },
  
  // ✅ هنا نضيف الويشليست:
  wishlist: [
    {
      type: {
        type: String,
        enum: ['car', 'motorcycle'],
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      model: {
        type: String,
        required: true,
      },
      year: {
        type: String,
        required: true,
      },
      imageUrl: {
        type: String,
      },
      addedAt: {
        type: Date,
        default: Date.now,
      },
      carId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Car',
      },
      bikeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Bike',
      }
    }
  ]
  

});

// قبل حفظ المستخدم، نشفر كلمة المرور
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// دالة للتحقق من كلمة المرور
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model("User", userSchema);

module.exports = User;
