/**
* @name:  defaultValueSetting
* @description:  接口选择组件在jquery中使用
* @author: lizijie
* @update:
*/
import DefaultValueSetting from './defaultValueSetting.js';
/**
* $.fn.DefaultValueSetting
*
* @param: {Object} params 传递给组件的数据
* @param: {Function} callback 确定后回调
* @return: {String} return
*/
$.fn.DefaultValueSetting = function (params = {}, callback) {
  $(this).addClass('FormulaEditable').attr('readonly', 'true');
  DefaultValueSetting.init(params, callback);
  $(this).off('click.DefaultValueSetting').on('click.DefaultValueSetting', function () {
    DefaultValueSetting.show();
  });
};