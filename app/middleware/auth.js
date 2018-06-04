'use strict';

const utils = require('../util/utils');
const response = require('../util/response');

module.exports = () => {
  return async function auth(ctx, next) {
    if (ctx.url === '/api/user-login' || ctx.url.substr(0, 4) !== '/api' || ctx.url.substr(0, 4) !== '/now') {
      await next();
      return;
    }
    const token = ctx.cookies.get('token', {
      signed: false,
    });
    const data = utils.checkAuth(token);
    if (!data) {
      ctx.status = 401;
      ctx.body = response.error(401, '权限不足');
      return;
    }
    ctx.base = data;
    await next();
  };
};