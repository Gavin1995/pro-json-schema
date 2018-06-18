'use strict';

const Controller = require('egg').Controller;
// const Joi = require('joi');

const response = require('../util/response');

class AuthController extends Controller {
  async create() {
    const { ctx } = this;
    const { userId } = ctx.base;
    const { app_id, user_ids } = ctx.request.body;
    // 查询当前操作者是否为该应用的owner
    const appRest = await ctx.model.Application.findIdByAppIdAndOwnerId(app_id, userId);
    if (!appRest || !appRest.dataValues) {
      ctx.body = response.simpleError('没有操作权限');
      return;
    }
    // 把现有权限记录全部软删除
    await ctx.model.Auth.deleteAuthByAppId(app_id, userId);

    const formatData = user_ids.map(user_id => ({
      app_id,
      user_id,
      creator_id: userId,
      updater_id: userId,
    }));
    // 批量添加权限
    const addRes = await ctx.model.Auth.bulkCreate(formatData);
    if (addRes && addRes.length > 0) {
      ctx.body = response.success();
      return;
    }
    ctx.body = response.simpleError('权限添加失败，请重试');
  }

  async update() {
    const { ctx } = this;
    const { app_id, description, operation_manager_id, associate_url, owner_id } = ctx.request.body;
    const { userId } = ctx.base;
    const res = await ctx.model.Application.findIdByAppIdAndOwnerId(app_id, userId);
    if (!res || !res.dataValues) {
      ctx.body = response.simpleError('权限不足');
      return;
    }
    const data = await ctx.model.Application.update({
      description: ctx.helper.escape(description),
      operation_manager_id,
      associate_url: ctx.helper.escape(associate_url),
      owner_id,
      updater_id: userId,
      update_time: new Date(),
    }, {
      where: {
        id: app_id,
      },
    });
    if (data[0] !== 1) {
      ctx.body = response.simpleError('更新失败，请重试');
      return;
    }
    ctx.body = response.success();
  }

  // 通过AppId获取权限列表
  async list() {
    const { ctx } = this;
    const { userId } = ctx.base;
    const { appId } = ctx.params;
    const res = await ctx.model.Application.findIdByAppIdAndOwnerId(appId, userId);
    if (!res) {
      ctx.body = response.simpleError('权限不足');
      return;
    }
    const userIdsRes = await ctx.model.Auth.findUserIdsByAppId(appId);
    const userIds = userIdsRes.map(userIdRes => userIdRes.user_id);
    console.log(userIdsRes);
    const usersInfo = await ctx.model.User.findUsersByIds(userIds);
    if (!usersInfo || !usersInfo.length === 0) {
      ctx.body = response.emptySuccess();
      return;
    }
    const users = [];
    usersInfo.forEach(userInfo => {
      users[userInfo.id] = userInfo.real_name;
    });
    userIdsRes.forEach(user => {
      user.real_name = users[user.user_id];
    });
    ctx.body = response.success(userIdsRes);
  }
}

module.exports = AuthController;
