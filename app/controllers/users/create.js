const User = require("../../models/user");
const validator = require("email-validator");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const saltRounds = Number(process.env.SALT_ROUNDS);
const TOKEN_SECRET = process.env.TOKEN_SECRET;

const create = async (req, res) => {
  const {
    firstname,
    lastname,
    email,
    password,
    address,
    telephone,
    organisation,
  } = req.body;
  if (
    !firstname ||
    !lastname ||
    !email ||
    !password ||
    !address ||
    !telephone ||
    !organisation
  ) {
    res.status(400).json({
      message: "All fields are mandatory !",
    });
  } else if (validator.validate(email) === false) {
    res.status(400).json({
      message: "Invalid email format !",
    });
  } else if (password.length < 8) {
    res.status(400).json({
      message: "Password should be at least 8 character !",
    });
  } else {
    bcrypt.genSalt(saltRounds, function (erreur, salt) {
      if (erreur) {
        res.json({err: erreur});
      } else {
        bcrypt.hash(password, salt, function (error, hash) {
          const user = new User({
            firstname: firstname,
            lastname: lastname,
            email: email,
            password: hash,
            address: address,
            telephone: telephone,
            organisation: organisation,
            photo: null,
            photoLocation: null,
            role: "user",
          });
          User.find({email: email}, function (err, foundData) {
            if (foundData.length > 0) {
              res.status(400).json({
                message: "This account with email: " + email + " exist",
              });
            } else {
              user.save(function (error, createdUser) {
                if (error) {
                  res.status(400).json({success: false, error});
                } else {
                  const token = jwt.sign({_id: createdUser._id, password, role: createdUser.role}, TOKEN_SECRET);
                  res.json({
                    success: true,
                    createdUser,
                    token,
                    message: 'Successfully registered!'
                  });
                }
              });
            }
          });
        });
      }
    });
  }
};

module.exports = create;
