const Post = require("../../models/post");
const WebPage = require("../../models/webpage");
const {findByCondition} = require("../../models/post_funcs");

const str2Boolean = str => {
  return (str === 'true'
      ? true
      : str === 'false'
        ? false
        : str === 'null'
          ? null
          : false
  );
};

const list = (req, res) => {
  try {
    const condition = req.query;
    let sortBy = {};
    if (req.user.role === "admin") {
      sortBy = {visible: 1, createdAt: -1};
      if(condition['visible'] !== undefined) {
        condition['visible'] = str2Boolean(condition['visible']);
      }
    } else {
      condition['$or'] = [
        {'author': req.user._id},
        {'visible': true}
      ];
      sortBy = {visible: 1, createdAt: -1};
    }
    findByCondition(condition, sortBy)
      .then((posts) => {
        res.json({
          success: true,
          posts,
        });
      })
      .catch(error => {
        res.json({error});
      });
  } catch (error) {
    res.status(400).json({error});
  }
};

const listInHome = (req, res) => {
  try {
    WebPage.find({followers: req.user._id})
      .then(webpages => {
        let post_ids = [];
        webpages.map(webpage => post_ids = post_ids.concat(webpage.posts));
        const condition = {
          '_id': {'$in': post_ids},
          visible: true,
        };
        findByCondition(condition, {createdAt: -1, webpage: 1})
          .then(posts => {
            res.json({success: true, posts, webpages});
          })
          .catch(error => {
            res.json({success: false, caught1: true, error});
          });
      })
      .catch(error => {
        res.json({success: false, caught2: true, error});
      })
  } catch (error) {
    res.status(400).json({caught3: true, error});
  }
};

const show = (req, res) => {
  try {
    Post.findById(req.params.id)
      .populate("attachments", "filename originalname _id")
      .populate(
        "comments",
        "cmtValue cmtHelpfuls cmtUnHelpfuls postId visible email _id"
      )
      .populate("author")
      .populate({
        path: "comments",
        model: "Comment",
        select: "cmtValue cmtHelpfuls cmtUnHelpfuls postId visible email _id",
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
      .then((post) => {
        res.json({
          success: true,
          post,
        });
      })
      .catch((error) => {
        res.json({error});
      });
  } catch (error) {
    res.status(400).json({error});
  }
};

module.exports = {
  list,
  show,
  listInHome,
};
