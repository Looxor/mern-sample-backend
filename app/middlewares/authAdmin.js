const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/user");

const authAdmin = async (req, res, next) => {
  const TOKEN_SECRET = process.env.TOKEN_SECRET;
  // We should use this for the token-authentication in future, but for now,
  // it's skipped out due to the development's speed.
  const token = req.header("token") || req.query.token;
  if (!token) return res.status(401).json({message: "Access Denied"});

  try {
    const verified = jwt.verify(token, TOKEN_SECRET);
    const user = await User.findById(verified._id);
    const isMatch = await bcrypt.compare(verified.password, user.password);
    if (isMatch) {
      req.user = verified;
      if (req.user.role === 'admin') {
        next();
      } else {
        res.status(403).json({
          success: false,
          error: {
            CODE: "ACCESS_DENIED",
            message: "Only admin can do this action",
          },
        });
      }
    } else {
      res.status(400).json({message: "Invalid Token"});
    }
  } catch (err) {
    res.status(400).json({message: "Invalid Token"});
  }
};

module.exports = authAdmin;