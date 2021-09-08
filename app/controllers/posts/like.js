const Post = require("../../models/post");

const applyLikes = (likes, user_id) => {
  const newLikes = [...likes];
  const existingIndex = newLikes.findIndex(
    (liked_user_id) => String(liked_user_id) === user_id
  );
  if (existingIndex > -1) {
    newLikes.splice(existingIndex, 1);
  } else {
    newLikes.push(user_id);
  }
  return newLikes;
};

const unApplyLikes = (likes, user_id) => {
  const newLikes = [...likes];
  const existingIndex = newLikes.findIndex(
    (liked_user_id) => String(liked_user_id) === user_id
  );
  if (existingIndex > -1) {
    newLikes.splice(existingIndex, 1);
  }
  return newLikes;
};

const like = async (req, res) => {
  try {
    Post.findById(req.params.id)
      .then((post) => {
        if (post) {
          if (
            String(post.author) === req.user._id
          ) {
            res.status(200).json({
              success: false,
              error: {
                CODE: "ACCESS_DENIED",
                message: "You can't do this for your post",
              },
            });
          } else {
            let likeMethod = req.route.path;
            likeMethod = likeMethod.substr(likeMethod.lastIndexOf("/") + 1);

            const user_id = String(req.user._id);

            if (likeMethod === "like") {
              post.pstLikes = applyLikes(post.pstLikes, user_id);
              post.pstDislikes = unApplyLikes(post.pstDislikes, user_id);
            } else if (likeMethod === "dislike") {
              post.pstDislikes = applyLikes(post.pstDislikes, user_id);
              post.pstLikes = unApplyLikes(post.pstLikes, user_id);
            }

            post.save((error, savedPost) => {
              if (error) res.status(400).json({success: false, error});
              else
                res.json({
                  success: true,
                  pstLikes: savedPost.pstLikes,
                  pstDislikes: savedPost.pstDislikes,
                });
            });
          }
        } else {
          res.status(400).json({success: false});
        }
      })
      .catch((error) => res.status(400).json({success: false, error}));
  } catch (error) {
    res.status(400).json({success: false, error});
  }
};

module.exports = like;
