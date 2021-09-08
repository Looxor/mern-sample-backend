const Post = require("../../models/post");
const synchronize = (req, res) => {
  try {
    Post.esTruncate({}, (result) => {
      console.log('result', result);
    })
    const stream = Post.synchronize({}, {saveOnSynchronize: true});
    let count = 0;
    stream.on('data', function (err, doc) {
      count++;
    });
    stream.on('close', function () {
      console.log('indexed ' + count + ' documents!');
      res.json({success: true, synced_count: count})
    });
    stream.on('error', function (error) {
      res.status(400).json({caught: true, error});
    });
  } catch (error) {
    res.status(400).json({caught: true, error});
  }
};

module.exports = synchronize;
