const Post = require("../../models/post");
const Attachment = require("../../models/attachment");
const User = require("../../models/user");

const update = (req, res) => {
  const {
    pstOrder,
    pstTitle,
    pstContent,
    pstRate,
    createdBy,
    updatedBy,
  } = req.body;
  if (!pstTitle || !pstContent) {
    res.json({
      error: "All fields are mandatory !",
    });
  } else {
    try {
      Post.findById(req.params.id)
        .populate("attachments", "filename originalname _id")
        .populate({
          path: "comments",
          model: "Comment",
          select: "cmtValue cmtHelpfuls cmtUnHelpfuls postId _id",
          populate: [
            {
              path: "attachments",
              mode: "Attachment",
              select: "filename originalname _id",
            },
            {
              path: "author",
              mode: "User",
              select: "firstname lastname photo _id",
            },
          ],
        })
        .then(async (post) => {
          if (post) {
            if (String(post.author) !== req.user._id) {
              res.status(403).json({
                success: false,
                error: {
                  CODE: "ACCESS_DENIED",
                  message: "Only author can update his own post",
                },
              });
            } else {
              post.pstOrder = pstOrder;
              post.pstTitle = pstTitle;
              post.pstContent = pstContent;
              post.pstRate = pstRate;
              post.updatedAt = new Date();
              post.updatedBy = updatedBy;
              post.createdBy = createdBy;
              try {
                if (req.files && req.files.length > 0) {
                  await Attachment.find({
                    _id: {$in: post.attachments},
                  }).then((attachments) =>
                    attachments.map((attachment) => attachment.remove())
                  );
                  post.attachments = await Promise.all(
                    req.files.map(async (file) => {
                      const attachment = new Attachment(file);
                      return await attachment.save();
                    })
                  );
                }
                post.save(async (error, updatedPost) => {
                  if (error) res.status(400).json({success: false, error});
                  else {
                    updatedPost.attachments = await Attachment.find({
                      _id: {$in: updatedPost.attachments},
                    });
                    updatedPost.author = await User.findById(req.user._id);
                    res.json({success: true, updatedPost});
                  }
                });
              } catch (error) {
                res.status(400).json({success: false, error});
              }
            }
          } else {
            res.status(400).json({success: false});
          }
        })
        .catch((error) => res.status(400).json({success: false, error}));
    } catch (error) {
      res.status(400).json({success: false, error});
    }
  }
};

module.exports = update;
