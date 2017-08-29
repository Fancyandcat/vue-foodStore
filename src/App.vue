<template>
  <div id="app">
    <fs-header :seller='seller'></fs-header>
    <div class="s-tab">
      <div class="fs-tab-item">
        <router-link to='/goods'>商品</router-link>
      </div>
      <div class="fs-tab-item">
        <router-link to='/seller'>商家</router-link>
      </div>
      <div class="fs-tab-item">
        <router-link to='/ratings'>评价</router-link>
      </div>
    </div>
    <router-view :seller='seller'></router-view>
  </div>
</template>

<script>
// 根组件 框架搭建 路由入口

// 引入头部组件
import fsHeader from './components/header/header.vue'

const ERR_OK = 0//模仿后台数据状态码验证使用

export default {
  data() {
    return {
      seller:{}
    }
  },
  created() {
    // ajax请求 
    this.$http.get('/api/seller').then((res) => {

      if(JSON.parse(res.bodyText).errno === ERR_OK){

        this.seller = JSON.parse(res.bodyText).data

      }

    },() => {

      console.log('error')

    })
    
  },
  components:{

    fsHeader

  }
}
</script>

<style lang="stylus">
  .s-tab 
    display:flex
    height:40px
    line-height:40px
    .fs-tab-item 
      flex:1
      text-align: center
      border-bottom:1px solid #cccccc
    .active 
      color: #ff0000
</style>
