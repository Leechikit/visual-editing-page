import { fetch } from '@/api/index'

export default {
  /**
   * 获取模板列表
   *
   * @param: {String} templateName 模板名称-搜索
   * @param: {String} categoryId 分类id-搜索
   * @param: {Number} pageNum 分页页码
   * @param: {Number} pageSize 分页每页条数
   */
  getTemlateList(
    { templateName, categoryId, pageNum = 1, pageSize } = { pageNume: 1 }
  ) {
    return fetch('/eadp/getTemplateList', {
      templateName,
      categoryId,
      pageNum,
      pageSize
    })
  },
  /**
   * 获取模板详情
   *
   * @param: {String} templateId 模板id
   */
  getTemplateDetail({ templateId }) {
    return fetch('/eadp/getTemplateDetail', { templateId })
  },
  /**
   * 编辑 or 新建模板
   *
   * @param: {String} id 模板id,如果是编辑有id，如果是新建，没有id
   * @param: {String} name 模板名
   * @param: {Number} sort 模板序号
   * @param: {String} icon 模板图标
   * @param: {Array} busCategoryIds 业务分类里小类id数组：[id1, id2]
   * @param: {Array} indCategoryIds 行业分类里小类id数组：[id1, id2]
   * @param: {String} version 适用版本
   * @param: {String} introduction 模板介绍
   * @param: {Array} pcPic pc端展示图片
   * @param: {Array} mobilePic 移动端展示图片
   * @param: {Number} price double类型，模板价格
   * @param: {String} supplier 模板供应商
   * @param: {String} tag 标签
   * @param: {Object} configData 模板配置数据
   * @param: {Number} count 表单及报表数
   */
  saveOrUpdateTemplate({
    id,
    name,
    sort,
    icon,
    busCategoryIds,
    indCategoryIds,
    version,
    introduction,
    pcPic,
    mobilePic,
    price,
    supplier,
    tag,
    configData,
    count
  }) {
    return fetch('/eadp/saveOrUpdateTemplate', {
      id,
      name,
      sort,
      icon,
      busCategoryIds,
      indCategoryIds,
      version,
      introduction,
      pcPic,
      mobilePic,
      price,
      supplier,
      tag,
      configData,
      count
    })
  },
  /**
   * 删除模板
   *
   * @param: {String} templateId 模板id
   */
  delTemplate({ templateId }) {
    return fetch('/eadp/delTemplate', { templateId })
  },
  /**
   * 启用模板
   *
   * @param: {String} templateId 模板id
   */
  enableTemplate({ templateId }) {
    return fetch('/eadp/enableTemplate', { templateId })
  },
  /**
   * 停用模板
   *
   * @param: {String} templateId 模板id
   */
  disableTemplate({ templateId }) {
    return fetch('/eadp/disableTemplate', { templateId })
  },
  /**
   * 获取类别列表选项
   *
   * @param: {String} categoryId 类别id 00001-业务分类,00002-行业分类
   * @return: {String} return
   */
  getCategory({ categoryId }) {
    return fetch('/eadp/getCategory', { categoryId })
  },
  /**
   * 获取订单列表
   *
   * @param: {String} companyId 租户id-搜索
   * @param: {String} createUserId 创建用户id-搜索
   * @param: {Number} status 订单状态 0有效订单 1失效订单
   * @param: {Number} pageNum 分页页码
   * @param: {Number} pageSize 分页每页条数
   * @param: {String} eadpOrderId eadp订单ID
   */
  getOrderList(
    { companyId, createUserId, status, pageNum = 1, pageSize, eadpOrderId } = {
      pageNume: 1
    }
  ) {
    return fetch('/eadp/order/getEadpOrderList', {
      companyId,
      createUserId,
      status,
      pageNum,
      pageSize,
      eadpOrderId
    })
  },
  /**
   * 获取订单详情
   *
   * @param: {String} eadpOrderId eadp订单ID
   */
  getOrderDetl({ eadpOrderId }) {
    return fetch('/eadp/order/queryEadpOrder', {
      eadpOrderId
    })
  }
}
