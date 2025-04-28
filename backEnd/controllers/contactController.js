const Contact = require('../models/Contact');

// إرسال نموذج الاتصال
exports.submitContactForm = async (req, res) => {
  try {
    const { name, email, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ message: 'يرجى ملء جميع الحقول' });
    }

    const newContact = new Contact({ name, email, message });
    await newContact.save();
    
    res.status(201).json({ message: 'تم إرسال النموذج بنجاح' });
  } catch (error) {
    res.status(500).json({ message: 'حدث خطأ، يرجى المحاولة لاحقًا', error });
  }
};

// جلب جميع الرسائل (للمسؤول)
exports.getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.status(200).json(contacts);
  } catch (error) {
    res.status(500).json({ message: 'حدث خطأ أثناء جلب البيانات', error });
  }
};



//لحذف الرسالة
exports.deleteContact = async (req, res) => {
  try {
    const contactId = req.params.id;
    await Contact.findByIdAndDelete(contactId);
    res.status(200).json({ message: 'تم حذف الرسالة بنجاح' });
  } catch (error) {
    res.status(500).json({ message: 'حدث خطأ أثناء الحذف', error });
  }
};




//للرد على رسالة
exports.replyToContact = async (req, res) => {
  try {
    const contactId = req.params.id;
    const { reply } = req.body;
    const updatedContact = await Contact.findByIdAndUpdate(
      contactId,
      { reply },
      { new: true }
    );
    res.status(200).json({ message: 'تم إرسال الرد بنجاح', updatedContact });
  } catch (error) {
    res.status(500).json({ message: 'حدث خطأ أثناء الرد', error });
  }
};