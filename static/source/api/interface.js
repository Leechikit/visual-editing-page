import { fetch, fetchGet } from './index';

export default {
  /**
  * get 获取所有接口
  *
  * @param: {Number} page 页数
  * @param: {Number} count 每页展示条数
  * @param: {String} name 查询字符串
  * @param: {String} affect 查询作用范围
  * @return: {String} id
  * @return: {String} name 接口名称
  * @return: {String} url 调用地址
  * @return: {String} beanName 处理类
  * @return: {String} token 接口调用凭证
  * @return: {String} affect 作用范围
  * @return: {String} describes 描述信息
  */
  get ({ page, count, name, affect }) {
    return fetch('/apiconfig/get', { page, count, name, affect });
  },
  /**
  * save
  *
  * @param: {String} id 传id为修改，不传为新增
  * @param: {String} name 接口名称
  * @param: {String} url 调用地址
  * @param: {String} beanName 处理类
  * @param: {String} token 调用凭证
  * @param: {String} affect 作用范围
  * @param: {String} describes 描述信息
  * @return: {Object} return
  */
  save ({ id, name, url, beanName, token, affect, describes }) {
    return fetch('/apiconfig/save', { id, name, url, beanName, token, affect, describes });
  },
  /**
  * delete
  *
  * @param: {String} id
  * @return: {Object} return
  */
  delete (id) {
    return fetch('/apiconfig/delete', { id });
  },
  /**
  * query 根据id查询
  *
  * @param: {String} id
  * @return: {Object} return
  */
  query (id) {
    return fetch('/apiconfig/query', { id });
  },
  /**
  * getInterfaceData 获取接口内容
  *
  * @param: {String} appId 应用id
  * @param: {String} controlId 控件key
  * @param: {String} appRunId 表单id // only代码嵌入控件
  * @param: {String} query 远程搜索 // only下拉框控件
  * @return: {String} return
  */
  getInterfaceData ({ appId, controlId, appRunId = '', query = '' }) {
    return fetchGet('/html/get', { params: { appId, controlId, appRunId, query } });
  }
};
