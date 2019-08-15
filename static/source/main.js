import Vue from 'vue';
import iView from 'iview';
import {router} from './router/index';
import {appRouter} from './router/router';
import store from './store';
import App from './app.vue';
import '@/locale';
import 'iview/dist/styles/iview.css';
import VueI18n from 'vue-i18n';
// import util from './libs/util';
// import $ from 'jquery';
import {authorization} from './directive';
// import Store from './store/index';
import './style/index.less';
import './views/main.less';
// 图标
import './iconfont/iconfont.css';
// import './iconfont/iconfont.js';
import './assets/icons/icons/iconfont.css';
// import  './iconfont/demo.css';
import './libs/funExtend.js';

import './views/role/role.css';
// import "./views/form/pages/sheetDesignerIndex/sheetDesign.css"
import './views/form/sheetDesigner/page/style.css';
// 导入过滤器
import '@/filters';

// 引入样式
import 'vue-easytable/libs/themes-base/index.css';
/* import VueVirtualScroller from 'vue-virtual-scroller';
Vue.use(VueVirtualScroller); */
// 导入 table 和 分页组件
import { VTable, VPagination } from 'vue-easytable';
import tablelistDatatitle from '@/views/listview/components/tablelist-datatitle';
import tablelistAssotable from '@/views/listview/components/tablelist-assotable';
import tablelistStatus from '@/views/listview/components/tablelist-status';

// import mavonEditor from 'mavon-editor'
// import 'mavon-editor/dist/css/index.css'
// // use
// Vue.use(mavonEditor)
// 重构
import '@/rebuild/main.js'

// 注册到全局
Vue.component(VTable.name, VTable);
Vue.component(VPagination.name, VPagination);
Vue.component('tablelistDatatitle', tablelistDatatitle);
Vue.component('tablelistAssotable', tablelistAssotable);
Vue.component('tablelistStatus', tablelistStatus);

Vue.dev = true;
Vue.config.devtools = true

Vue.use(VueI18n);
Vue.use(iView);

Vue.directive('hasPer', authorization.permissions);

// axios.get('serverConfig.json').then((result)=>{
//       window.expconfig = result.data; //设置成Vue的全局属性
//       console.log(window.expconfig)
//   }).catch((error)=>{
//       console.log(error)
//   })

Vue.prototype.$_has = function (type, rArray) {
  // return true;
  let resources = [];
  let permission = true;
  // 提取权限数组
  if (Array.isArray(rArray)) {
    rArray.forEach(function (e) {
      resources = resources.concat(e);
    });
  } else {
    resources = resources.concat(rArray);
  }
  // 校验权限
  let resourcePermission = store.getters['user/permissions'];
  resources.forEach(function (p) {
    if (!resourcePermission[p]) {
      return (permission = false);
    }
  });
  return permission;
};
const loadStyle = () => {
  const style = document.createElement('style');
  style.innerHTML = 'body{background:yellow;}';
  const bodyEl = document.querySelector('body');
  bodyEl.insertBefore(style, bodyEl.firstChild);
};
new Vue({
  el: '#app',
  router: router,
  store: store,
  render: h => h(App),
  data: {
    currentPageName: '',
    eventHub: new Vue()
  },
  mounted () {
    this.currentPageName = this.$route.name;
    // 显示打开的页面的列表
    this.$store.commit('setOpenedList');
    this.$store.commit('initCachepage');
    // 权限菜单过滤相关
    this.$store.commit('updateMenulist');
    // iview-admin检查更新
    // util.checkUpdate(this);
    loadStyle();
  },
  created () {
    let tagsList = [];
    appRouter.map((item) => {
      if (item.children.length <= 1) {
        tagsList.push(item.children[0]);
      } else {
        tagsList.push(...item.children);
      }
    });
    this.$store.commit('setTagsList', tagsList);
  }
});
