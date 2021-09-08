const User = require("../../models/user");
const validator = require("email-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const TOKEN_SECRET = process.env.TOKEN_SECRET;

const login = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  if (!email || !password) {
    res.status(400).json({
      message: "all fields are mandatory !",
    });
  } else if (validator.validate(email) === false) {
    res.status(400).json({
      message: "invalid email format !",
    });
  } else {
    User.findOne({email: email})
      .populate("photo")
      .then((foundUser) => {
        if (foundUser) {
          if (!foundUser.enabled) {
            res.status(403).json({code: "ACCOUNT_DISABLED", message: "Your account is disabled by admin"});
          } else {
            bcrypt.compare(password, foundUser.password, function (
              err,
              isMatch
            ) {
              if (!isMatch) {
                res.status(400).json({message: "email or password is incorrect"});
              } else {
                //create Token
                const token = jwt.sign(
                  {_id: foundUser._id, password, role: foundUser.role},
                  TOKEN_SECRET
                );
                // res.header('token', token).send(token);
                res.json({success: true, user: foundUser, token});
              }
            });
          }
        } else {
          res.status(404).json({code: 'LOGIN_FAILED', message: "email or password is incorrect"});
        }
      })
      .catch(error => {
        res.json({success: false, ...error});
      });
  }
};

module.exports = login;
