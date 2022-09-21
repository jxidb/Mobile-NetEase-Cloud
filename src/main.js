import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import * as API from '@/api'
// 全部引入vant组件，  缺点：代码体积过大
// import Vant from 'vant'
// import 'vant/lib/index.css'

// 引入样式实现样式初始化和适配问题
import '@/mobile/flexible.js'
import '@/styles/reset.css'

// 引入vant组件并全局注册
import { NavBar, List, PullRefresh, Search, Tabbar, TabbarItem, Col, Row, Image as VanImage, Cell, CellGroup, Icon } from 'vant'
Vue.use(VanImage)
Vue.use(Search)
Vue.use(List)
Vue.use(PullRefresh)
Vue.use(Icon)

Vue.use(Cell)
Vue.use(CellGroup)

Vue.use(Col)
Vue.use(Row)
Vue.use(Tabbar)
Vue.use(TabbarItem)

Vue.use(NavBar) // 自动按需引入

// Vue.use(Vant) // 注册vant组件在全局

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: (h) => h(App),
  beforeCreate () {
    Vue.prototype.$bus = this
    Vue.prototype.$API = API
  }
}).$mount('#app')
