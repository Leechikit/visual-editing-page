import 'babel-polyfill';
import Vue from 'vue';
import App from './App';
import $ from 'jquery';
import iView from 'iview';
import 'iview/dist/styles/iview.css';

Vue.config.productionTip = false;
Vue.use(iView);

/* eslint-disable no-new */
import store from 'src/store/';
new Vue({
  el: '#app',
  data: {
    eventHub: new Vue()
  },
  store,
  render: h => h(App)
});



// WEBPACK FOOTER //
// ./src/pages/workflowDesigner/workflowdesigner.js