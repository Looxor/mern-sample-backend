const Comment = require('../../models/comment');

const list = (req, res) => {
  try {
    const condition = req.query;
    if (req.params.post_id && req.params.post_id !== 'undefined') {
      condition['postId'] = req.params.post_id;
    }
    Comment
      .find(condition)
      .populate('author')
      .then(comments => {
        res.json({
          success: true,
          comments
        })
      })
      .catch(error => {
        res.json({error})
      });
  } catch (error) {
    res.status(400).json({error});
  }

};

const show = (req, res) => {
  try {
    Comment
      .findById(req.params.id)
      .populate('author')
      .then(comment => {
        res.json({
          success: true,
          comment
        })
      })
      .catch(error => {
        res.json({error})
      });
  } catch (error) {
    res.status(400).json({error});
  }

};


module.exports = {
  list, show
}