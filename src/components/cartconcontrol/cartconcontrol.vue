<template>
    <div class="cartconcontrol">
        <transition name="slide-fade">
            <div class="cart-decrease icon-remove_circle_outline" v-show="food.count>0" @click="removeCart"></div>
        </transition>
        <div class="cart-count " v-show="food.count>0">{{food.count}}</div>
        <div class="cart-add icon-add_circle" @click="addCart"></div>
    </div>
</template>

<script>
// 计数器组件

// 引入vue组件
import Vue from 'vue'
export default {
  props:{
      food:{
          type:Object
      }
  },
  methods:{
      // 实现add功能
      addCart() {

        if(!this.food.count){
            
            Vue.set(this.food,'count',1)

        }else {

            this.food.count++; 

        }
        this.$emit("addOK",event)
      },
      // 实现remove功能
      removeCart() {

        if(this.food.count<=0){
          return false
        }
        
        this.food.count--; 
      }
  }
}
</script>

<style lang="stylus">
  .cartconcontrol
    font-size:0
    .cart-decrease
      display:inline-block
      padding:4px
      line-height:24px
      font-size:24px
      color:rgb(0,160,220)
    .cart-count
      display:inline-block
      font-size:14px
    .cart-add
      padding:6px
      display:inline-block
      line-height:24px
      font-size:24px
      color:rgb(0,160,220)
    .slide-fade-enter-active 
      transition: all .3s ease
    .slide-fade-leave-active
      transition: all .5s cubic-bezier(1.0, 0.5, 0.8, 1.0)
    .slide-fade-enter, .slide-fade-leave-to
      transform: translateX(10px)
      opacity: 0
</style>
