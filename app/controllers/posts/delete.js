const Post = require("../../models/post");
const WebPage = require("../../models/webpage");

const deletePost = (req, res) => {
  try {
    Post.findById(req.params.id).then(async (post) => {
      if (post) {
        if (false && req.user.role !== 'admin' && String(post.author) !== req.user._id) {
          res.status(403).json({
            success: false,
            error: {
              CODE: "ACCESS_DENIED",
              message: "Only author can delete his own post.",
            },
          });
        } else {
          try {
            if (post.webpage) {
              const webpage = await WebPage.findById(post.webpage);
              if (webpage) {
                const postsArray = [...webpage.posts || []];
                const existingIndex = postsArray.findIndex(webpagePost => String(webpagePost) === String(post._id));
                if (existingIndex > -1) {
                  postsArray.splice(existingIndex, 1);
                  webpage.posts = postsArray;
                  await webpage.save();
                }
              }
            }
            await post.remove();
            res.json({success: true, deletedPost: post});
          } catch (error) {
            res.status(400).json({caught1: true, error});
          }
        }
      } else {
        res.json({success: false, error_code: "NO_EXIST"});
      }
    });
  } catch (error) {
    res.status(400).json({caught2: true, error});
  }
};

module.exports = deletePost;
