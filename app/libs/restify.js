const {uploader} = require("../middlewares/uploader");

const restify = (resource, args1, args2) => {
  let router, middleware;

  if (args2 === undefined) {
    middleware = (req, res, next) => next();
    router = args1;
  } else {
    router = args1;
    middleware = args2;
  }

  const {name, list, create, show, update} = resource;
  const api = "/" + name;
  const self_name = name.substr(name.lastIndexOf('/') + 1);
  const self_api = "/" + self_name;

  router
    .route(api)
    .get(middleware, list)
    .post([middleware, uploader.array("attachments")], create);

  router
    .route(self_api + "/:id")
    .get(middleware, show)
    .put([middleware, uploader.array("attachments")], update)
    .delete(middleware, resource.delete);

};

const nested_from = (parent) => {
  return (callback, resource, args1, args2) => {
    resource.name = parent.name + '/:' + parent.id + '/' + resource.name
    callback(resource, args1, args2)
  }
}

module.exports = {
  restify,
  nested_from
};
