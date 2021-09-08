const create = require("./create");
const deleteContactMessage = require("./delete");
const {list, show, getUnSeenAdminMessages} = require("./read");
const update = require("./update");
const markAsSeen = require("./markAsSeen");

module.exports = {
  name: "contact_messages",
  create,
  delete: deleteContactMessage,
  list,
  show,
  getUnSeenAdminMessages,
  update, markAsSeen,
};
