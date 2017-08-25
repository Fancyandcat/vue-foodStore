<template>
    <transition name="slide-fade">
        <div v-show="showFlag" class="food" ref="wrapper">
            <div class="food-content">
                <div class="image-header">
                    <img :src="food.image">
                    <div class="back" @click="showFlag=false">
                        <i class="icon-arrow_lift"></i>
                    </div>
                </div>
                <div class="content">
                    <h1 class="title">{{food.name}}</h1>
                    <div class="detail">
                        <span class="sell-count">月售{{food.sellCount}}份</span>
                        <span class="rating">好评率{{food.rating}}%</span>
                    </div>
                    <div class="price">
                        <span class="now">￥{{food.price}}</span>
                        <span v-show="food.oldPrice" class="old">￥{{food.oldPrice}}</span>
                    </div>
                    

                </div>
                <div class="cartcontrol-wrapper">
                    <cartconcontrol :food="food" @addOK="ballOK"></cartconcontrol>
                </div>
                <div class="buy" @click="addFirst" v-show="!food.count || food.count === 0">
                    加入购物车
                </div>
            </div>
        </div>
    </transition>
   
</template>

<script>
import BScroll from 'better-scroll'
import Vue from 'vue'
import cartconcontrol from '../cartconcontrol/cartconcontrol.vue'

export default {
  props:{
      food:{
          type:Object
      }
  },
  data() {
      return {
          showFlag:false
      }
  },
  methods: {
      show() {
          this.showFlag = true
          this.$nextTick(() =>{
            if(!this.scroll){
              this.scroll = new BScroll(this.$refs.wrapper,{
                  click:true
              })
            }
          })
      },
      addFirst(event) {
          if(!event._constructed){
              return
          }
          Vue.set(this.food,'count',1)
      },
      ballOK() {
          this.$emit("addOK",event)
      }

  },
  components:{
      cartconcontrol
  }
}
</script>

<style lang="stylus">
  .food
    position:fixed
    left:0
    top:0
    bottom:48px
    z-index:30
    width:100%
    background:#fff
    .image-header
      position: relative
      width:100%
      height:0
      padding-top:100%
      img  
        position:absolute
        top:0
        left:0
        width:100%
        height:100%
      .back
        position:absolute
        top:10px
        left:0
        .icon-arrow_lift
          display:block
          padding:10px  
          font-size:20px
          color:#fff
    .content
      padding:10px
      .title
        line-height:14px
        margin-bottom:8px
        font-size:14px
        font-weight:700
        color:rgb(7,17,27)  
      .detail
        margin-bottom:18px
        line-height:10px
        font-size:0
        height:10px
        .sell-count,.rating
          font-size:10px
          color:rgb(147,153,159)
        .sell-count
          margin-right:12px
      .price
        margin-top:14px
        font-weight:700
        line-height:24px
        .now
          margin-right:8px
          font-size:16px
          color:rgb(240,20,20)
        .old
          text-decoration: line-through
          font-size:14px
          color:rgb(147,153,159)   
    .cartcontrol-wrapper
      position:absolute
      right:12px
      bottom:12px
    .buy
      position:absolute
      right:18px
      bottom:18px
      z-index:10
      height:24px
      line-height:24px
      padding:0 12px
      box-sizing:border-box
      font-size:12px
      color:#fff
      background:rgb(0,160,220)
      border-radius: 10px

          
  .slide-fade-enter-active
    transition: all .7s ease
  .slide-fade-leave-active 
    transition: all .8s ease
  .slide-fade-enter, .slide-fade-leave-to
    transform: translateX(100%)

</style>
