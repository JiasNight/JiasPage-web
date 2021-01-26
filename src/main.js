import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
// 导入axios
import axios from 'axios'
// 导入qs
import qs from 'qs'
// 引入iview依赖
import ViewUI from 'view-design'
// 引入iview css样式
import 'view-design/dist/styles/iview.css'
// 导入全局样式文件
import './assets/css/global.scss'

Vue.config.productionTip = false
Vue.use(ViewUI)
axios.defaults.baseURL = 'http://49.233.217.34:8090'
// axios.defaults.baseURL = 'http://127.0.0.1:8090'
Vue.prototype.$axios = axios
Vue.prototype.qs = qs

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
