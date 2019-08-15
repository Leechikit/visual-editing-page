import Vue from 'vue'
// 公共样式
import '@/rebuild/assets/style/common.scss'
// 布局样式
import '@/rebuild/assets/style/layout.scss'
// element
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/rebuild/assets/style/element.scss'
// 图标
import '@/rebuild/assets/commonIcon/iconfont.js'
import '@/rebuild/assets/commonIcon/iconfont.css'
import '@/rebuild/assets/appIcon/iconfont.js'

Vue.config.devtools = true
Vue.use(ElementUI)
