const ContactMessage = require("../../models/contact_message");

const create = async (req, res) => {
  const {
    title,
    email,
    content,
  } = req.body;

  if (!title || !email || !content) {
    res.json({
      success: false, error: "All fields are mandatory !",
    });
  } else {
    try {
      const message = new ContactMessage({
        title,
        email,
        content,
        createdAt: new Date(),
      });
      message.save(async (error, createdMessage) => {
        if (error) {
          res.json({error});
        } else {
          res.json({
            createdMessage,
            success: true,
          });
        }
      });
    } catch (error) {
      res.status(400).json({error});
    }
  }
};

module.exports = create;
