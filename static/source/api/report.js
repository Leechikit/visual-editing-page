import { BASE_URL, fetch } from './index';

export default {
  /**
   * 获取基本的SQL
   */
  getPreSql (param) {
    return fetch('/act/report/getPreSql', { create_sql_json: param });
  },
  /**
   * 获取元数据列配置
   */
  execSqlText (sqlText, jsonStr) {
    return fetch('/act/report/execSqlText', {
      sqlText,
      create_sql_json: jsonStr
    });
  },
  /**
   * 保存报表设计
   */
  saveReportDesign (params) {
    return fetch('/act/report/saveReportDesign', params);
  },
  /**
   * 保存报表
   */
  createReport (params) {
    return fetch('/act/report/createReport', params);
  },
  /**
   * 获取报表结果
   */
  getData (params) {
    return fetch('/act/report/getData', params);
  },
  /**
   * 获取带sql条件的报表结果
   */
  getDataSqlQry (params) {
    return fetch('/act/report/getDataSqlQry', params);
  },
  /**
   * 刪除报表
   */
  delReport (param) {
    return fetch('/act/report/delReport', { id: param });
  },
  /**
   * 修改报表
   */
  updateReport (params) {
    return fetch('/act/report/updateReport', params);
  },
  /**
   * 修改报表设计
   */
  updateReportDesign (params) {
    return fetch('/act/report/updateReportDesign', params);
  },
  queryReport (param) {
    return fetch('/act/report/queryReport', { id: param });
  },
  getColumns ({ id, index }) {
    return fetch('/act/report/getColumns', { id, index });
  },
  exportExcelForReport ({ id, index, column }) {
    window.location.href = `${BASE_URL}/act/report/exportExcelForReport?id=${id}&index=${index}&column=${column}`;
  }
};
