const User = require('../../models/user');
const jwt = require('jsonwebtoken');

const profile = (req, res) => {
  if (req.headers.token) {
    var token = req.headers.token;
    try {
      var decoded = jwt.decode(token);

    } catch (e) {
      return res.status(401).send('unauthorized');
    }
    var data = decoded._id;
    User.findById(data).populate('photo').then(function (user) {
      // Do something with the user
      res.json({
        success: true,
        user
      });
    });
  } else {
    return res.status(401).send('unauthorized');
  }
}

module.exports = profile;