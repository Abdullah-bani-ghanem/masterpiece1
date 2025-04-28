const User = require("../models/User"); // أو المسار الصحيح عندك

// جلب عناصر الويشليست
exports.getWishlist = async (req, res) => {
  try {
    const user = await User.findById(req.user.id); // نتوقع إنه عندك ميدل وير auth يضيف req.user

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ wishlist: user.wishlist });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};




// إضافة عنصر للويشليست
exports.addToWishlist = async (req, res) => {
  try {
    const { type, name, model, year, imageUrl } = req.body;

    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const newItem = {
      type,
      name,
      model,
      year,
      imageUrl,
    };

    user.wishlist.push(newItem);
    await user.save();

    res.status(201).json({ message: "Item added to wishlist", wishlist: user.wishlist });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};



// حذف عنصر من الويشليست
exports.removeFromWishlist = async (req, res) => {
  try {
    const { itemId } = req.params;

    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.wishlist = user.wishlist.filter(item => item._id.toString() !== itemId);

    await user.save();

    res.json({ message: "Item removed from wishlist", wishlist: user.wishlist });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
