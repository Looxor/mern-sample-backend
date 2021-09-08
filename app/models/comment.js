const mongoose = require('mongoose');
const Attachment = require('./attachment');

const commentSchema = new mongoose.Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  cmtValue: {type: String, required: true},
  attachments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Attachment"
  }],
  cmtHelpfuls: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }],
  cmtUnHelpfuls: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }],
  cmtFlagCounts: {type: String},
  postId: {type: mongoose.Schema.Types.ObjectId},
  visible: {type: Boolean, default: true,},
  createdAt: {type: Date, default: Date.now},
  updatedAt: {type: Date, default: Date.now},
  createdBy: {type: String},
  updatedBy: {type: String},
});

commentSchema.post('remove', async (doc, next) => {
  await Attachment
    .find({_id: {$in: doc.attachments}})
    .then(attachments => attachments.map(attachment => attachment.remove()))
  next();
});

module.exports = mongoose.model('Comment', commentSchema);
