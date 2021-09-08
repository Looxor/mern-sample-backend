const create = require('./create');
const deleteComment = require('./delete');
const {list, show} = require('./read');
const update = require('./update');
const helpful = require('./helpful');
const setVisible = require('./setVisible');

module.exports = {
  name: 'comments',
  create,
  delete: deleteComment,
  list,
  show,
  update,
  helpful,
  setVisible
}