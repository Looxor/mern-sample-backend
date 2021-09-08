const mongoose = require('mongoose');
const Post = require('./post');

const webpageSchema = new mongoose.Schema({
  followers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  design: {
    type: String
  },
  html: {
    type: String
  },
  name: {
    type: String,
    required: true
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  posts: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post'
  }],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
  createdBy: {
    type: String,
    required: true
  },
  updatedBy: {
    type: String,
    required: true
  },
});
//,{ collection: 'webpages' });

webpageSchema.post('remove', async (doc, next) => {
  try {
    const posts = await Post.find({_id: {$in: doc.posts}});
    for (let k = 0; k < posts.length; k++) {
      await posts[k].remove();
    }
    next();
  } catch (e) {
    console.log('error on remove webpage', e);
    next();
  }
});

module.exports = mongoose.model('WebPage', webpageSchema);
