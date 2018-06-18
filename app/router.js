'use strict';

module.exports = app => {
  const { router, controller } = app;
  // router.all('/api/*', controller.home.proxy);
  router.post('/api/user-login', controller.user.login);
  router.get('/api/user-all', controller.user.all);
  router.post('/api/app-create', controller.application.create);
  router.post('/api/app-update', controller.application.update);
  router.get('/api/app-list/:page', controller.application.list);
  router.post('/api/app-delete', controller.application.delete);
  router.post('/api/auth-create', controller.auth.create);
  router.get('/api/auth-list/:appId', controller.auth.list);
  router.post('/api/module-create', controller.module.create);
  router.post('/api/module-edit-definition', controller.module.editDefinition);
  router.get('/api/module-list/:appId', controller.module.list);
  router.post('/api/param-create', controller.param.create);
  router.post('/api/param-edit', controller.param.edit);
  router.get('/api/param-list/:appId', controller.param.list);
  router.post('/api/data-edit-temp', controller.data.editTempData);
  router.post('/api/data-edit', controller.data.reviewTempData); // 审核通过保存为真实数据

  router.all('/api/current-user', controller.user.currentUser);
  router.get('/', controller.home.index);
  router.get('/now/currentUser', controller.home.test);
  router.get('/now/test', controller.home.test);
  router.post('/now/user-create', controller.user.create);
  router.post('/now/user-login', controller.user.login);
  router.get('/now/user-logout', controller.user.logout);
  router.get('/now/user-checkAuth', controller.user.checkAuth);
};
