const Template = require('../../models/template');

const deleteTemplate = (req, res) => {
  try {
    Template
      .findByIdAndDelete(req.params.id)
      .then((deletedTemplate) => {
        if (deletedTemplate) {
          res.json({success: true, deletedTemplate})
        } else {
          res.json({success: false, error_code: 'NO_EXIST'})
        }
      });
  } catch (error) {
    res.status(400).json({error});
  }
};

module.exports = deleteTemplate;