const bcrypt = require("bcrypt");
const saltRounds = Number(process.env.SALT_ROUNDS);
const dotenv = require("dotenv");
const mongoose = require("mongoose");
dotenv.config();
mongoose.connect(
  process.env.DB_CONNECT,
  {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false},
  () => console.log("Connected to DB")
);
const User = require("../../models/user");

const {
  ADMIN_FIRST_NAME,
  ADMIN_LAST_NAME,
  ADMIN_EMAIL,
  ADMIN_PASSWORD,
  ADMIN_ADDRESS,
  ADMIN_TEL,
  ADMIN_ORG,
} = process.env;

bcrypt.genSalt(saltRounds, function (error, salt) {
  if (error) {
    console.log({success: false, error});
  } else {
    bcrypt.hash(ADMIN_PASSWORD, salt, function (error, hash) {
      if (error) {
        console.log({success: false, error});
      } else {
        User.findOne({email: ADMIN_EMAIL}).then(async (foundUser) => {
          if (foundUser) {
            try {
              await User.findByIdAndDelete(foundUser._id);
            } catch (error) {
              console.log({success: false, error});
            }
          }
          const user = new User({
            firstname: ADMIN_FIRST_NAME,
            lastname: ADMIN_LAST_NAME,
            email: ADMIN_EMAIL,
            password: hash,
            address: ADMIN_ADDRESS,
            telephone: ADMIN_TEL,
            organisation: ADMIN_ORG,
            photo: null,
            photoLocation: null,
            role: "admin",
          });
          user.save(function (error, createdUser) {
            if (error) {
              console.log({success: false, error});
            } else {
              console.log({success: true, createdUser});
            }
            process.exit();
          });
        });
      }
    });
  }
});
