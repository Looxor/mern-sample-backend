const Post = require('./post');
const WebPage = require('./webpage');

const searchWebPageByQuery = (query, cb) => Post.search(
  {
    query_string: {
      query
    }
  },
  {
    hydrate: true
  },
  async (error, posts) => {
    try {
      if (error) {
        cb(error);
      } else {
        const webpage_ids =
          posts.hits.hits
            .map(post => post && post.visible && post.webpage)
            .filter(webpage_id => webpage_id);
        const webpages = await WebPage
          .find({_id: {$in: webpage_ids}})
          .populate('author');
        cb(null, webpages);
      }
    } catch (error) {
      cb(error);
    }
  }
);


const findByCondition = (condition, sortBy = {}) => {
  return Post.find(condition)
    .sort(sortBy)
    .populate("author")
    .populate("attachments", "filename originalname _id")
    .populate({
      path: "comments",
      model: "Comment",
      select: "cmtValue cmtHelpfuls cmtUnHelpfuls postId visible email _id",
      // ...(req.user.role !== "admin" ? { match: { visible: true } } : {}),
      populate: [
        {
          path: "attachments",
          mode: "Attachment",
          select: "filename originalname _id",
        },
        {
          path: "author",
          mode: "User",
          select: "firstname lastname photo email _id",
        },
      ],
    });
}


module.exports = {
  searchWebPageByQuery,
  findByCondition
}
