const Comment = require("../../models/comment");

const applyHelpfuls = (helpfuls, user_id) => {
  const newHelpfuls = [...helpfuls];
  const existingIndex = newHelpfuls.findIndex(
    (helpful_user_id) => String(helpful_user_id) === user_id
  );
  if (existingIndex > -1) {
    newHelpfuls.splice(existingIndex, 1);
  } else {
    newHelpfuls.push(user_id);
  }
  return newHelpfuls;
};

const unApplyHelpfuls = (helpfuls, user_id) => {
  const newHelpfuls = [...helpfuls];
  const existingIndex = newHelpfuls.findIndex(
    (helpful_user_id) => String(helpful_user_id) === user_id
  );
  if (existingIndex > -1) {
    newHelpfuls.splice(existingIndex, 1);
  }
  return newHelpfuls;
};

const helpful = async (req, res) => {
  try {
    Comment.findById(req.params.id)
      .then((comment) => {
        if (comment) {
          if (
            String(comment.author) === req.user._id ||
            req.user.role === "admin"
          ) {
            res.status(200).json({
              success: false,
              error: {
                CODE: "ACCESS_DENIED",
                message: "You can't do this for your comment",
              },
            });
          } else {
            let helpfulMethod = req.route.path;
            helpfulMethod = helpfulMethod.substr(
              helpfulMethod.lastIndexOf("/") + 1
            );

            const user_id = String(req.user._id);

            if (helpfulMethod === "helpful") {
              comment.cmtHelpfuls = applyHelpfuls(comment.cmtHelpfuls, user_id);
              comment.cmtUnHelpfuls = unApplyHelpfuls(
                comment.cmtUnHelpfuls,
                user_id
              );
            } else if (helpfulMethod === "unhelpful") {
              comment.cmtUnHelpfuls = applyHelpfuls(
                comment.cmtUnHelpfuls,
                user_id
              );
              comment.cmtHelpfuls = unApplyHelpfuls(
                comment.cmtHelpfuls,
                user_id
              );
            }

            comment.save((error, savedComment) => {
              if (error) res.status(400).json({success: false, error});
              else
                res.json({
                  success: true,
                  cmtHelpfuls: savedComment.cmtHelpfuls,
                  cmtUnHelpfuls: savedComment.cmtUnHelpfuls,
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

module.exports = helpful;
