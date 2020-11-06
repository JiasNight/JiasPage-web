import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
// 引入iview依赖
import ViewUI from 'view-design'
// 引入iview css样式
import 'view-design/dist/styles/iview.css'
// 导入全局样式文件
import './assets/css/global.css'

Vue.config.productionTip = false
Vue.use(ViewUI)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
