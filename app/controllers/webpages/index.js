const create = require('./create');
const deleteWebPage = require('./delete');
const {list, show} = require('./read');
const update = require('./update');
const follow = require('./follow');

module.exports = {
  name: 'webpages',
  create,
  delete: deleteWebPage,
  list,
  show,
  update,
  follow,
}
