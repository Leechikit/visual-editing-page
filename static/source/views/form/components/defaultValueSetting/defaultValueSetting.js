/**
* @name:  defaultValueSetting
* @description:  默认值设置组件在js文件中实例化
* @author: lizijie
* @update:
*/
import DefaultValueSetting from './defaultValueSetting.vue';
import Vue from 'vue';

/**
* DefaultValueSetting.newInstance
*
* @param: {Object} properties 传递给组件的数据
* @param: {Function} callback 确定后回调
* @return: {String} return
*/
DefaultValueSetting.newInstance = (properties = {}, callback ) => {
  const Instance = new Vue({
    data () {
      return { ...properties };
    },
    render (h) {
      return h(DefaultValueSetting, {
        props: { properties },
        on: {
          confirm (val) {
            if (typeof callback === 'function') {
              callback(val);
            }
          }
        }
      });
    }
  });
  const component = Instance.$mount();
  document.body.appendChild(component.$el);
  const defaultValueSetting = Instance.$children[0];
  return {
    show () {
      defaultValueSetting.show();
    },
    component: defaultValueSetting,
    destroy (element) {
      defaultValueSetting.cancel();
      setTimeout(function () {
        document.body.removeChild(document.getElementsByClassName(element)[0]);
      }, 500);
    }
  };
};

let instance = null;

function init (options = {}, callback) {
  instance = DefaultValueSetting.newInstance(options, callback );
}
function show () {
  instance.show();
  return instance;
};

export default {
  init,
  show
};
