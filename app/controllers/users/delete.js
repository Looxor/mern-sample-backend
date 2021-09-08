const User = require('../../models/user');

const deleteUser = async (req, res) => {
  try {
    let user, user_id = req.params.id;
    if (user_id.indexOf('@') > -1) {
      user = await User.findOne({email: user_id})
    } else {
      user = await User.findById(user_id);
    }
    if (user) {
      await user.remove();
      res.json({success: true, deletedUser: user});
    } else {
      res.status(400).json({error: {code: 'USER_NOT_FOUND'}})
    }
  } catch (error) {
    res.status(400).json({error})
  }
};

module.exports = deleteUser;