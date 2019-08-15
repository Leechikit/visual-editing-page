import Vue from 'vue'
import App from './tablelist.vue'
import iView from 'iview';
import 'iview/dist/styles/iview.css';
import '../assets/iconfont/iconfont.css';
import '../assets/iconfont/iconfont.js'

Vue.use(iView);

document.title = '应用管理'

var app = new Vue({
  el: '#app',
  render: h => h(App)
})