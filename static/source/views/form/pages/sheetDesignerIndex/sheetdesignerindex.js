import 'babel-polyfill';
import Vue from 'vue';
import App from './App';
import $ from 'jquery';
import iView from 'iview';
import 'iview/dist/styles/iview.css';
import 'lib/H3/H3Plugins/H3.plugins.system.js';
Vue.config.productionTip = false;
Vue.use(iView);
/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App)
});


// WEBPACK FOOTER //
// ./src/pages/sheetDesignerIndex/sheetdesignerindex.js