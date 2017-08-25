import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
// 加载所需组建
import goods from './components/goods/goods.vue'
import seller from './components/seller/seller.vue'
import ratings from './components/ratings/ratings.vue'


Vue.use(VueRouter)
Vue.use(VueResource)
// 配置路由映射
let router = new VueRouter({
  routes:[
    {
      path:'/goods',
      component:goods
    },
    {
      path:'/seller',
      component:seller
    },
    {
      path:'/ratings',
      component:ratings
    }
  ],
  linkActiveClass:'active'//配置配选中是class
})


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template:'<App/>',
  components:{App}
})
