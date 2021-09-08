const Comment = require("../../models/comment");

const setVisibleComment = (req, res) => {
  try {
    const setVisibledMethod = req.params.visibleMethod;
    Comment.findById(req.params.id).then((foundComment) => {
      if (foundComment) {
        foundComment.visible = setVisibledMethod === "visible";
        foundComment.save((error, updatedComment) => {
          if (error) {
            res.status(400).json({error});
          } else {
            if (updatedComment) {
              res.json({success: true, updatedComment});
            } else {
              res.json({success: false, error_code: "NO_EXIST"});
            }
          }
        });
      }
    });
  } catch (error) {
    res.status(400).json({error});
  }
};

module.exports = setVisibleComment;
