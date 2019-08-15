/**
* @name:  interfaceOptions
* @description:  接口选择组件在jquery中使用
* @author: lizijie
* @update:
*/
import InterfaceOptions from './interfaceOptions.js';
/**
* $.fn.InterfaceOptions
*
* @param: {Object} params 传递给组件的数据
* @param: {Function} callback 确定后回调
* @return: {String} return
*/
$.fn.InterfaceOptions = function (params = {}, callback) {
  $(this).addClass('FormulaEditable').attr('readonly', 'true');
  InterfaceOptions.init(params, callback);
  $(this).off('click.InterfaceOptions').on('click.InterfaceOptions', function () {
    InterfaceOptions.show();
  });
};