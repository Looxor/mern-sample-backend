const Template = require('../../models/template');

const create = (req, res) => {
  const {
    name,
    category,
    description,
    design,
    html,
  } = req.body;
  if (
    !name ||
    !category ||
    !description
  ) {
    res.json({
      error: 'All fields are mandatory !'
    })
  } else {
    const template = new Template({
      name,
      category,
      description,
      design,
      html,
    });
    try {
      template.save((error, createdTemplate) => {
        if (error) {
          res.json({error})
        } else {
          res.json({
            createdTemplate,
            success: true
          })
        }
      })
    } catch (error) {
      res.status(400).json({error});
    }
  }

};

module.exports = create;