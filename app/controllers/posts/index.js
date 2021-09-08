const create = require("./create");
const deletePost = require("./delete");
const {list, show, listInHome} = require("./read");
const update = require("./update");
const like = require("./like");
const setVisible = require("./setVisible");
const search = require("./search");
const synchronize = require("./synchronize");

module.exports = {
  name: "posts",
  create,
  delete: deletePost,
  list,
  show,
  update,
  like,
  setVisible,
  search,
  synchronize,
  listInHome,
};
