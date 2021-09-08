const Comment = require("../../models/comment");
const Post = require("../../models/post");
const Attachment = require("../../models/attachment");
const User = require("../../models/user");

const create = (req, res) => {
  const {
    cmtValue,
    cmtHelpfulCounts,
    cmtUnhelpfulCounts,
    cmtFlagCounts,
    createdBy,
    updatedBy,
  } = req.body;
  if (!cmtValue) {
    res.json({
      error: "All fields are mandatory !",
    });
  } else {
    Post.findById(req.params.post_id)
      .then(async (post) => {
        const comment = new Comment({
          cmtValue,
          cmtHelpfulCounts,
          cmtUnhelpfulCounts,
          cmtFlagCounts,
          createdBy,
          updatedBy,
          postId: post._id,
          author: await User.findById(req.user._id),
        });
        try {
          comment.save(async (error, createdComment) => {
            if (error) {
              res.json({error});
            } else {
              try {
                post.comments = post.comments.concat(createdComment._id);
                post.save(async (error) => {
                  if (error) {
                    res.json({error});
                  } else {
                    let comment2;
                    if (req.files && req.files.length > 0) {
                      try {
                        comment.attachments = await Promise.all(
                          req.files.map(async (file) => {
                            const attachment = new Attachment(file);
                            return await attachment.save();
                          })
                        );
                        comment2 = await comment.save();
                      } catch (error) {
                        res.status(400).json({success: false, error});
                      }
                    }
                    res.json({
                      createdComment: comment2 || comment,
                      success: true,
                    });
                  }
                });
              } catch (error) {
                res.status(400).json({error});
              }
            }
          });
        } catch (error) {
          res.status(400).json({error});
        }
      })
      .catch((error) => res.status(400).json({success: false, error}));
  }
};

module.exports = create;
