const ContactMessage = require("../../models/contact_message");

const list = (req, res) => {
  try {
    const condition = req.query;
    let sortBy = {};
    ContactMessage.find(condition, sortBy)
      .then((messages) => {
        res.json({
          success: true,
          messages,
        });
      })
      .catch(error => {
        res.json({error});
      });
  } catch (error) {
    res.status(400).json({error});
  }
};

const show = (req, res) => {
  try {
    ContactMessage.findById(req.params.id)
      .then((message) => {
        res.json({
          success: true,
          message,
        });
      })
      .catch((error) => {
        res.json({error});
      });
  } catch (error) {
    res.status(400).json({error});
  }
};


const getUnSeenAdminMessages = (req, res) => {
  try {
    const condition = {
      seen: false
    };
    ContactMessage.find(condition)
      .then((messages) => {
        res.json({
          success: true,
          messages,
        });
      })
      .catch(error => {
        res.json({error});
      });
  } catch (error) {
    res.status(400).json({error});
  }
};


module.exports = {
  list,
  show,
  getUnSeenAdminMessages
};
