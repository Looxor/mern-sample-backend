const Template = require('../../models/template');

const list = (req, res) => {
  try {
    const condition = req.query;
    if (req.user.role !== "admin") {
      condition['enabled'] = true;
    }
    if(condition['categories']) {
      condition['category'] = {$in: condition['categories'].split(',')};
      condition['categories'] = undefined;
    }
    Template.find(condition)
      .then(templates => {
        res.json({
          success: true,
          templates,
        })
      })
      .catch(error => {
        res.json({error})
      });
  } catch (error) {
    console.log('error', error);
    res.status(400).json({error});
  }

};

const show = (req, res) => {
  try {
    Template.findById(req.params.id)
      .then(template => {
        res.json({
          success: true,
          template
        })
      })
      .catch(error => {
        res.json({error})
      });
  } catch (error) {
    res.status(400).json({error});
  }

};


const categories = (req, res) => {
  try {
    Template.find({enabled: true}).distinct('category')
      .then(categories => {
        const template_categories = categories.map((category, index) => ({
          value: index, text: category
        }));
        res.json({
          success: true,
          template_categories
        })
      })
      .catch(error => {
        res.json({error})
      });
  } catch (error) {
    res.status(400).json({error});
  }

};


module.exports = {
  list, show, categories
}
