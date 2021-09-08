const ContactMessage = require("../../models/contact_message");

const markAsSeen = async (req, res) => {
  try {
    ContactMessage.findById(req.params.id)
      .then(async (message) => {
        if (message) {
          const seenMethod = req.params.seenMethod;
          message.seen = seenMethod === 'markAsSeen';
          message.updatedAt = new Date();
          try {
            message.save(async (error, updatedContactMessage) => {
              if (error) res.status(400).json({success: false, error});
              else {
                res.json({success: true, updatedContactMessage});
              }
            });
          } catch (error) {
            res.status(400).json({success: false, error});
          }
        } else {
          res.status(400).json({success: false});
        }
      })
      .catch((error) => res.status(400).json({success: false, error}));
  } catch (error) {
    res.status(400).json({success: false, error});
  }
};

module.exports = markAsSeen;
