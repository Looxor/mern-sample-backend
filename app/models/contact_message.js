const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  title: {type: String, required: true},
  email: {type: String, required: true},
  content: {type: String, required: true},
  seen: {type: Boolean, default: false},
  createdAt: {type: Date, default: Date.now},
  updatedAt: {type: Date, default: Date.now},
});

module.exports = mongoose.model('Message', messageSchema);
