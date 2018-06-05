'use strict';

const Controller = require('egg').Controller;
// const moment = require('moment');

// const utils = require('../util/utils');
// const constants = require('../util/constants');
const validates = require('../util/validates');
const response = require('../util/response');

class ApplicationController extends Controller {
  async create() {
    const { ctx } = this;
    ctx.validate({
      name_cn: validates.appNameCn,
      name_en: validates.appNameEn,
    });
    const { name_cn, name_en } = ctx.request.body;
    const res = await ctx.model.Application.findOneByName(name_cn, name_en);
    if (res && res.dataValues) {
      ctx.body = response.simpleError('应用已存在');
      return;
    }
    const data = await ctx.model.Application.create({
      name_cn,
      name_en,
    });
    if (!data || !data.dataValues) {
      ctx.body = response.simpleError('创建失败，请重试');
      return;
    }
    ctx.body = response.simpleError('创建成功');
  }
}

module.exports = ApplicationController;
