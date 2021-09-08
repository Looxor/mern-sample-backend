const WebPage = require('../../models/webpage');

const deleteWebPage = (req, res) => {
  try {
    WebPage.findById(req.params.id)
      .then(async (webpage) => {
        if (String(req.user._id) !== String(webpage.author)) {
          res.json({success: false, error_code: 'ACCESS_DENIED'})
        } else {
          if (!webpage) {
            res.json({success: false, error_code: 'NO_EXIST'})
          } else {
            await webpage.remove();
            res.json({success: true, deletedWebPage: webpage})
          }
        }
      })
  } catch (error) {
    res.status(400).json({success: false, error});
  }
};

module.exports = deleteWebPage;
