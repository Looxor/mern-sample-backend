const template = require('../../models/template');
const Template = require('../../models/template');
const update = (req, res) => {
  const {
    name,
    category,
    description,
    html,
    design,
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
    try {
      Template.findById(req.params.id).then(template => {
        template.name = name;
        template.category = category;
        template.description = description;
        template.html = html;
        template.design = design;
        template.updatedAt = new Date();
        template
          .save((error, updatedTemplate) => {
            if (error) {
              res.status(400).json({error})
            } else {
              res.json({success: true, updatedTemplate})
            }
          })
      })
    } catch (error) {
      res.status(400).json({error});
    }
  }
};
module.exports = update;