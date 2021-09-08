const mongoose = require('mongoose');
const Comment = require('./comment');
const Attachment = require('./attachment');
const mongoosastic = require('mongoosastic');

const postSchema = new mongoose.Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  pstOrder: {type: String},
  pstTitle: {type: String, required: true, es_indexed: true},
  pstContent: {type: String, required: true, es_indexed: true},
  pstLikes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }],
  pstDislikes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }],
  attachments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Attachment"
  }],
  pstRate: {type: String},
  visible: {type: Boolean, default: null,},
  webpage: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'WebPage'
  },
  createdAt: {type: Date, default: Date.new},
  updatedAt: {type: Date, default: Date.new},
  createdBy: {type: String},
  updatedBy: {type: String},
  comments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Comment"
  }]
});

postSchema.plugin(mongoosastic);

postSchema.post('remove', async (doc, next) => {
  await Comment
    .find({_id: {$in: doc.comments}})
    .then((comments) => comments.map(comment => comment.remove()))
  await Attachment
    .find({_id: {$in: doc.attachments}})
    .then(attachments => attachments.map(attachment => attachment.remove()))
  doc.on('es-removed', function (err, res) {
    if (err) throw err;
  });
  next();
});

postSchema.post('save', async (doc, next) => {
  doc.on('es-indexed', function (err, res) {
    if (err) throw err;
    /* Document is indexed */
  });
  next();
});


module.exports = mongoose.model('Post', postSchema);
