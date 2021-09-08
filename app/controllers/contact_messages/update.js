const ContactMessage = require("../../models/contact_message");

const update = (req, res) => {
  const {
    title,
    email,
    content,
  } = req.body;
  if (!title || !content) {
    res.json({
      error: "All fields are mandatory !",
    });
  } else {
    try {
      ContactMessage.findById(req.params.id)
        .then(async (message) => {
          if (message) {
            message.title = title;
            message.email = email;
            message.content = content;
            message.updatedAt = new Date();
            try {
              message.save(async (error, updatedMessage) => {
                if (error) res.status(400).json({success: false, error});
                else {
                  res.json({success: true, updatedMessage});
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
  }
};

module.exports = update;
