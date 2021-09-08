const create = require('./create');
const deleteTemplate = require('./delete');
const {list, show, categories} = require('./read');
const update = require('./update');
const setEnabled = require('./setEnabled');
const makeInUse = require('./makeInUse');

module.exports = {
  name: 'templates',
  create,
  delete: deleteTemplate,
  list,
  show,
  categories,
  update,
  setEnabled,
  makeInUse
}
