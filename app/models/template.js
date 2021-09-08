const mongoose = require('mongoose');

const templateSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  design: {
    type: String
  },
  html: {
    type: String
  },
  enabled: {
    type: Boolean,
    default: false
  },
  users: [{
    type: mongoose.Types.ObjectId,
    ref: 'User'
  }],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
});
//,{ collection: 'templates' });

module.exports = mongoose.model('Template', templateSchema);
