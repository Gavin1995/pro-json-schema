'use strict';

const Controller = require('egg').Controller;
const moment = require('moment');
const jwt = require('jsonwebtoken');

const utils = require('../util/utils');
const constants = require('../util/constants');
const validates = require('../util/validates');
const response = require('../util/response');

class UserController extends Controller {
  // [need]
  async login() {
    const { ctx } = this;
    ctx.validate({
      username: validates.loginUsername,
      password: validates.loginPassword,
    });

    const data = await ctx.model.User.findPasswordByUsername(ctx.request.body.username);
    if (!data || !data.dataValues) {
      // 不存在该用户名
      ctx.body = response.simpleError('用户名或密码不正确');
      return;
    }
    const { dataValues } = data;
    if (dataValues.password !== utils.md5(ctx.request.body.password)) {
      // 密码不正确
      ctx.body = response.simpleError('用户名或密码不正确');
      return;
    }
    const expiration = moment(moment().add(30, 'd').format('YYYY-MM-DD 00:00:00')).unix();
    const token = jwt.sign({
      username: ctx.request.body.username,
      userId: dataValues.id,
      sub: dataValues.id,
      iat: moment().unix(),
      exp: expiration,
    }, constants.jwtSecret);
    ctx.cookies.set('token', token, {
      httpOnly: true,
      path: '/',
      expires: moment.utc(moment().add(30, 'd').format('YYYY-MM-DD 00:00:00')).toDate(),
    });
    ctx.body = response.success();
  }

  async all() {
    const { ctx } = this;
    const allRes = await ctx.model.User.findAllUser();
    const res = allRes.map(item => ({
      user_id: item.id,
      real_name: item.real_name,
    }));
    ctx.body = response.success(res);
  }

  async currentUser() {
    const { ctx } = this;
    const { userId } = ctx.base;

    const data = await ctx.model.User.findByUserId(userId);
    if (!data || !data.dataValues) {
      // 不存在
      ctx.cookies.set('token', null, {
        overwrite: true,
      });
      ctx.body = response.simpleError('系统错误');
      return;
    }

    const { dataValues } = data;
    ctx.body = response.success({
      userId: dataValues.id,
      username: dataValues.username,
      nickname: dataValues.nickname,
      avatar: dataValues.avatar,
    });
  }

  logout() {
    const { ctx } = this;
    ctx.cookies.set('token', null, {
      overwrite: true,
    });
    ctx.body = response.success();
  }

  checkAuth() {
    const { ctx } = this;
    if (!ctx.request.body.token) {
      ctx.body = response.simpleError('权限验证失败，请重新登录');
      return;
    }
    const data = utils.checkAuth(ctx.request.body.token);
    if (!data) {
      ctx.body = response.specialError(1001);
      return;
    }
    ctx.body = response.success();
  }

  async create() {
    const { ctx } = this;
    const createRule = {
      username: validates.username,
      password: validates.password,
    };
    ctx.validate(createRule);
    const isExist = await presenceDetection(ctx, ctx.request.body.username);
    if (isExist) {
      ctx.body = response.simpleError('用户名已注册');
      return;
    }
    ctx.request.body.password = utils.md5(ctx.request.body.password);
    const { username, password } = ctx.request.body;
    const data = await ctx.model.User.create({
      username,
      password,
    });
    if (!data || !data.dataValues) {
      ctx.body = response.simpleError('注册失败，请重试');
      return;
    }
    ctx.body = response.success();
  }
}

async function presenceDetection(ctx, username) {
  const data = await ctx.model.User.findByUsername(username);
  return data && data.dataValues;
}

module.exports = UserController;
