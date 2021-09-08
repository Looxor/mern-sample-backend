const User = require("../../models/user");

const list = (req, res) => {
  try {
    if (req.user.role === "admin") {
      User.find({role: {$not: /admin/}})
        .then((users) => {
          res.json({
            success: true,
            users
          });
        })
        .catch((reason) => {
          res.status(500).json({message: reason});
        });
    } else {
      res.status(400).json({
        code: "ACCESS_DENIED",
        message: "Access denied",
      });
    }
  } catch (error) {
    res.status(400).json({error});
  }
};

module.exports = {
  list
};
