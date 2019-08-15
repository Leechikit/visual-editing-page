import Vue from 'vue'
import App from './listviewdesign.vue'
import iView from 'iview';
import 'iview/dist/styles/iview.css';
import '../assets/iconfont/iconfont.css';
import '../assets/iconfont/iconfont.js'

Vue.use(iView);

document.title = '流程列表'

var app = new Vue({
  el: '#app',
  render: h => h(App)
})