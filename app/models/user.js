var mongoose = require("mongoose");
const Post = require('./post');

var userSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  password: {
    type: String,
    required: true,
    min: 6,
    max: 255,
  },
  address: {
    type: String,
    required: true,
  },
  telephone: {
    type: Number,
    required: true,
  },
  organisation: {
    type: String,
    required: true,
  },
  photo: {
    type: mongoose.Types.ObjectId,
    ref: "Attachment",
  },
  role: {
    type: String,
    default: "user",
  },
  template: {
    type: mongoose.Types.ObjectId,
    ref: "Template",
  },
  enabled: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

userSchema.post('remove', async (doc, next) => {
  await Post
    .find({author: doc._id})
    .then((posts) => posts.map(post => post.remove()))
  next();
});


module.exports = mongoose.model("User", userSchema);
