/**
* @name:  interfaceOptions
* @description:  接口选择组件在js文件中实例化
* @author: lizijie
* @update:
*/
import InterfaceOptions from './interfaceOptions.vue';
import Vue from 'vue';

/**
* InterfaceOptions.newInstance
*
* @param: {Object} properties 传递给组件的数据
* @param: {Function} callback 确定后回调
* @return: {String} return
*/
InterfaceOptions.newInstance = (properties = {}, callback ) => {
  const Instance = new Vue({
    data () {
      return { ...properties };
    },
    render (h) {
      return h(InterfaceOptions, {
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
  const interfaceOptions = Instance.$children[0];
  return {
    show () {
      interfaceOptions.show();
    },
    component: interfaceOptions,
    destroy (element) {
      interfaceOptions.cancel();
      setTimeout(function () {
        document.body.removeChild(document.getElementsByClassName(element)[0]);
      }, 500);
    }
  };
};

let instance = null;

function init (options = {}, callback ) {
  instance = InterfaceOptions.newInstance(options, callback );
}
function show () {
  instance.show();
  return instance;
};

export default {
  init,
  show
};
