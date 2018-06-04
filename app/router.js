'use strict';

module.exports = app => {
  const { router, controller } = app;
  // router.all('/api/*', controller.home.proxy);
  router.all('/api/current-user', controller.user.currentUser);
  router.post('/api/user-login', controller.user.login);
  router.get('/', controller.home.index);
  router.get('/now/currentUser', controller.home.test);
  router.get('/now/test', controller.home.test);
  router.post('/now/user-create', controller.user.create);
  router.post('/now/user-login', controller.user.login);
  router.get('/now/user-logout', controller.user.logout);
  router.get('/now/user-checkAuth', controller.user.checkAuth);
};
