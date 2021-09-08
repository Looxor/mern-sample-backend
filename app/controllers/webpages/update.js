const WebPage = require('../../models/webpage');

const update = (req, res) => {
  const {
    name,
    design,
    html,
  } = req.body;
  if (
    !name
  ) {
    res.json({
      error: 'All fields are mandatory !'
    })
  } else {
    try {
      WebPage
        .findById(req.params.id)
        .then((webPage) => {
          webPage.name = name;
          webPage.design = design;
          webPage.html = html;
          webPage.updatedAt = new Date();
          webPage.save((error, updatedWebPage) => {
            if (error) {
              res.status(400).json({success: false, error});
            } else {
              res.json({success: true, updatedWebPage})
            }
          })
        });
    } catch (error) {
      res.status(400).json({success: false, error});
    }
  }

};

module.exports = update;
