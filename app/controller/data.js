'use strict';

const Controller = require('egg').Controller;
const _ = require('lodash');

const response = require('../util/response');

class DataController extends Controller {
  async editTempData() {
    const { ctx } = this;
    const { params, module_id, data } = ctx.request.body;
    const { userId } = ctx.base;
    const paramsData = `y${params}`;
    // 删除前面的临时数据记录
    await ctx.model.Data.deleteDataByParams(paramsData, userId);
    // 插入新的临时数据
    const createRes = await ctx.model.Data.create({
      module_id,
      params: paramsData,
      data: JSON.stringify(data),
      creator_id: userId,
      updater_id: userId,
    });

    if (!createRes) {
      ctx.body = response.simpleError('保存数据失败，请重试');
      return;
    }
    ctx.body = response.success();
  }

  // 审核通过->真实数据
  async reviewTempData() {
    const { ctx } = this;
    const { data_id } = ctx.request.body;
    const { userId } = ctx.base;
    const tempData = await ctx.model.Data.findOneById(data_id);
    const { module_id, data, params } = tempData;
    const paramsData = `n${params.substring(1)}`;
    // 删除前面的真实数据记录
    await ctx.model.Data.deleteDataByParams(paramsData, userId);
    // 插入新的真实数据
    const createRes = await ctx.model.Data.create({
      data,
      module_id,
      params: paramsData,
      creator_id: userId,
      updater_id: userId,
    });

    if (!createRes) {
      ctx.body = response.simpleError('保存数据失败，请重试');
      return;
    }
    ctx.body = response.success();
  }
}

module.exports = DataController;
