const Template = require('../../models/template');
const User = require('../../models/user');

const makeInUse = async (req, res) => {
  try {
    let makeInUseMethod = req.route.path;
    makeInUseMethod = makeInUseMethod.substr(makeInUseMethod.lastIndexOf('/') + 1);
    const user_id = String(req.params.user_id);
    const template_id = String(req.params.id);


    const user = await User.findById(user_id);
    const template = await Template.findById(template_id);
    const org_template_id = user.template ? String(user.template) : '';
    let org_template = null;
    if (org_template_id) {
      org_template = await Template.findById(org_template_id);
    }
    // res.json({success: true, user, template_id, org_template_id, org_template});
    // return;

    if (makeInUseMethod === 'make-in-use') {
      // remove user_id from the template which is specified by org_template_id
      if (org_template) {
        org_template.users = org_template.users.filter(user_id2 => String(user_id2) !== user_id);
        await org_template.save();
      }

      // add_if_not_exists user_id into the template which is specified by template_id
      if (!template.users.some(user_id2 => String(user_id2) === user_id)) {
        template.users = template.users.concat(user_id);
        await template.save();
      }

      // set template_id to the user which is specified by user_id
      user.template = template_id;
      await user.save();
    } else if (makeInUseMethod === 'make-un-use') {
      // remove user_id from the template which is specified by org_template_id
      if (org_template) {
        org_template.users = org_template.users.filter(user_id2 => String(user_id2) !== user_id);
        await org_template.save();
      }
      // set template_id as null to the user which is specified by user_id
      user.template = null;
      await user.save();
    }
    res.json({success: true});

  } catch (error) {
    res.status(400).json({error});
  }
};

module.exports = makeInUse;