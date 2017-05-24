'use strict';

module.exports = function generateRoutes(router, modelName, actions, prefix) {
  if (prefix === null) {
    prefix = '';
  }

  router.get(prefix + ('/' + modelName), actions.findAll);
  router.get(prefix + ('/' + modelName + '/:id'), actions.findById);
  router.post(prefix + ('/' + modelName), actions.create);
  router.post(prefix + ('/' + modelName + '/:id'), actions.updateById);
  router.del(prefix + ('/' + modelName + '/:id'), actions.deleteById);
  router.put(prefix + ('/' + modelName), actions.create);
  router.put(prefix + ('/' + modelName + '/:id'), actions.replaceById);
  router.patch(prefix + ('/' + modelName + '/:id'), actions.updateById);
};
