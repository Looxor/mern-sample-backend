const WebPage = require("../../models/webpage");

const applyFollows = (follows, user_id) => {
  const newFollows = [...follows];
  const existingIndex = newFollows.findIndex(
    (followed_user_id) => String(followed_user_id) === user_id
  );
  if (existingIndex === -1) {
    newFollows.push(user_id);
  }
  return newFollows;
};

const unApplyFollows = (follows, user_id) => {
  const newFollows = [...follows];
  const existingIndex = newFollows.findIndex(
    (followed_user_id) => String(followed_user_id) === user_id
  );
  if (existingIndex > -1) {
    newFollows.splice(existingIndex, 1);
  }
  return newFollows;
};

const follow = async (req, res) => {
  try {
    WebPage.findById(req.params.id)
      .then((webpage) => {
        if (webpage) {
          if (
            String(webpage.author) === req.user._id
          ) {
            res.status(200).json({
              success: false,
              error_code: "ACCESS_DENIED",
              message: "You can't do this for your webpage",
            });
          } else {
            const followMethod = req.params.follow_method

            const user_id = String(req.user._id);

            if (followMethod === "follow") {
              webpage.followers = applyFollows(webpage.followers, user_id);
            } else if (followMethod === "unfollow") {
              webpage.followers = unApplyFollows(webpage.followers, user_id);
            }

            webpage.save((error, savedWebPage) => {
              if (error) res.status(400).json({success: false, error});
              else
                res.json({
                  success: true,
                  followers: savedWebPage.followers,
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

module.exports = follow;
