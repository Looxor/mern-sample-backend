const WebPage = require("../../models/webpage");
const Post = require("../../models/post");
const Attachment = require("../../models/attachment");
const User = require("../../models/user");

const create = async (req, res) => {
  const {
    pstOrder,
    pstTitle,
    pstContent,
    pstNumberOfLikes,
    pstNumberOfDislikes,
    pstRate,
    createdBy,
    updatedBy,
  } = req.body;

  const {webpage_id} = req.params;

  if (!pstTitle || !pstContent) {
    res.json({
      success: false, error: "All fields are mandatory !",
    });
  } else if (!webpage_id) {
    res.json({
      success: false, message: 'WebPage id is mandatory.',
    });
  } else {
    try {
      const webpage = await WebPage.findById(webpage_id);
      if (!webpage) {
        res.status(400).json({success: false, error: 'WebPage id is invalid'});
      } else {
        const post = new Post({
          pstOrder,
          pstTitle,
          pstContent,
          pstNumberOfLikes,
          pstNumberOfDislikes,
          pstRate,
          createdAt: new Date(),
          createdBy,
          updatedBy,
          attachments: [],
          author: await User.findById(req.user._id),
          webpage: webpage_id
        });
        post.save(async (error, createdPost) => {
          if (error) {
            res.json({error});
          } else {
            if (req.files && req.files.length > 0) {
              try {
                post.attachments = await Promise.all(
                  req.files.map(async (file) => {
                    const attachment = new Attachment(file);
                    return await attachment.save();
                  })
                );
                await post.save();
              } catch (error) {
                res.status(400).json({success: false, error});
              }
            }
            webpage.posts = webpage.posts.concat(createdPost._id);
            await webpage.save();
            res.json({
              createdPost,
              success: true,
            });
          }
        });
      }
    } catch (error) {
      res.status(400).json({error});
    }
  }
};

module.exports = create;
