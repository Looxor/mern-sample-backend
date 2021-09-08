const mongoose = require('mongoose');
const fs = require('fs');

const attachmentSchema = new mongoose.Schema({
  fieldname: {type: String, required: true},
  originalname: {type: String, required: true},
  encoding: {type: String, default: ''},
  mimetype: {type: String, default: ''},
  destination: {type: String, required: true},
  filename: {type: String, required: true},
  path: {type: String, required: true},
  size: {type: Number, default: 0},
});

attachmentSchema.post('remove', (attachment, next) => {
  try {
    fs.unlinkSync(attachment.path);
  } catch (error) {

  }
  next();
});

module.exports = mongoose.model('Attachment', attachmentSchema);
