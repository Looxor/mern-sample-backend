const Template = require('../../models/template');

const setEnabledTemplate = async (req, res) => {
  try {
    let setEnabledMethod = req.route.path;
    setEnabledMethod = setEnabledMethod.substr(setEnabledMethod.lastIndexOf('/') + 1);
    Template
      .findByIdAndUpdate(req.params.id, {
        enabled: setEnabledMethod === 'enable'
      })
      .then((updatedTemplate) => {
        if (updatedTemplate) {
          res.json({success: true, updatedTemplate})
        } else {
          res.json({success: false, error_code: 'NO_EXIST'})
        }
      });
  } catch (error) {
    res.status(400).json({error});
  }
};

module.exports = setEnabledTemplate;