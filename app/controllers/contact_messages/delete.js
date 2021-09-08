const ContactMessage = require("../../models/contact_message");

const deleteMessage = (req, res) => {
  try {
    ContactMessage.findById(req.params.id).then(async (message) => {
      if (message) {
        if (req.user.role !== 'admin' && String(message.author) !== req.user._id) {
          res.status(403).json({
            success: false,
            error: {
              CODE: "ACCESS_DENIED",
              message: "Only author can delete his own post.",
            },
          });
        } else {
          try {
            await message.remove();
            res.json({success: true, deletedContactMessage: message});
          } catch (error) {
            res.status(400).json({caught1: true, error});
          }
        }
      } else {
        res.json({success: false, error_code: "NO_EXIST"});
      }
    });
  } catch (error) {
    res.status(400).json({caught2: true, error});
  }
};

module.exports = deleteMessage;
