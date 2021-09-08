const create = require("./create");
const deleteUser = require("./delete");
const login = require("./login");
const profile = require("./profile");
const update = require("./update");
const setEnabled = require("./setEnabled");
const {list} = require("./list");


module.exports = {
  create,
  list,
  delete: deleteUser,
  login,
  profile,
  update,
  setEnabled,
};
