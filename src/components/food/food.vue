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
                     <div class="cartcontrol-wrapper">
                        <cartconcontrol :food="food" @addOK="ballOK"></cartconcontrol>
                    </div>
                    <div class="buy" @click="addFirst" v-show="!food.count || food.count === 0">
                        加入购物车
                    </div>
                </div>
               <split v-show="food.info"></split>
               <div class="info" v-show="food.info">
                   <h1 class="title">商品详情</h1>
                   <p class="text">{{food.info}}</p>
               </div>
               <split></split>
               <div class="rating">
                    <h1 class="title">商品评价</h1>
                    <ratingselect :selectType="selectType" :onlyContent="onlyContent" :desc="desc" :ratings="food.ratings" @selectT="select" @toggleT="toggle"></ratingselect>
                    <div class="rating-wrapper">
                        <ul v-show="food.ratings && food.ratings.length">
                            <li v-for="rating in food.ratings" class="rating-item" v-show="needShow(rating.rateType,rating.text)">
                                <div class="user">
                                    <span class="name">{{rating.username}}</span>
                                    <img :src="rating.avatar" width="12" height="12" class="avatar">
                                </div>
                                <div class="time">{{rating.rateTime | filterTime}}</div>
                                <p class="text">
                                    <span :class="{'icon-thumb_up':rating.rateType === 0,'icon-thumb_down':rating.rateType === 1}"></span>{{rating.text}}
                                </p>
                            </li>
                        </ul>
                        <div class="no-rating" v-show="!food.ratings || !food.ratings">暂无评价</div>
                    </div>
               </div>
            </div>
        </div>
    </transition>
   
</template>

<script>
// 商品详情页 过滤评论

//引入 better-scroll插件 数量框组件 空格组件 选择评论组件 vue组件
import BScroll from 'better-scroll'
import Vue from 'vue'
import {fliterDate} from '../../common/js/date.js'
import cartconcontrol from '../cartconcontrol/cartconcontrol.vue'
import split from '../split/split.vue'
import ratingselect from '../ratingselect/ratingselect.vue'

// 初始化代码状态
const POSITIVE = 0 // 正面评价状态码
const NEGATIVE = 1 // 负面评价状态码
const All = 2 // 全部评价状态码

export default {
  props:{
      food:{
          type:Object
      }
  },
  data() {
      return {
          showFlag:false,
          selectType:All,
          onlyContent:false,
          desc:{
              all:'全部',
              positive:'推荐',
              negative:'吐槽'
          }
      }
  },
  methods: {
      // 控制组件的展示与隐藏
      show() {

          this.showFlag = true
          this.selectType = All
          this.onlyContent = false

          this.$nextTick(() =>{

            if(!this.scroll){
              this.scroll = new BScroll(this.$refs.wrapper,{
                  click:true
              })
            }
          })
      },
      // 为food对象设置count属性
      addFirst(event) {
          if(!event._constructed){
              return
          }
          Vue.set(this.food,'count',1)
      },
      // 与父组件通信,告知可以调用小球动画
      ballOK() {
          this.$emit("addOK",event)
      },
      // 改变评论状态码(根据状态码)   
      select(type) {

          this.selectType = type
          this.$nextTick( ()=>{
              this.scroll.refresh()
          })
      },
      // 改变评论状态码(根据有无内容)
      toggle() {

          this.onlyContent = !this.onlyContent
          this.$nextTick( ()=>{
              this.scroll.refresh()
          })
      },
      // 实现评论内容的过滤展示
      needShow(type,text) {
          if(this.onlyContent && !text){
              return false
          }
          if(this.selectType === All){
              return true
          }else {
              return type === this.selectType
          }
      }

  },
  filters:{
      // 过滤器
      filterTime(time) {
          let date = new Date(time)
          return fliterDate(date,'yyyy-MM-dd hh:mm')
      }
  },
  components:{
      cartconcontrol,
      split,
      ratingselect
  }
}
</script>

<style lang="stylus">
  .food
    position:fixed
    left:0
    bottom:48px
    top:0
    z-index:30
    width:100%
    background:#fff
    overflow:hidden
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
      position:relative
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
    .info
      padding:18px
      .title
        line-height:14px
        margin-bottom:6px
        font-size:14px
        color:rgb(7,17,27)
      .text
        line-height:24px
        padding:0 8px
        font-size:12px
        color:rgb(77,85,93)  
    .rating
      padding-top:18px
      .title
        line-height:14px
        margin-left:18px
        font-size:14px
        color:rgb(7,17,27)
      .rating-wrapper
        padding:0 18px
        .rating-item
          position:relative
          padding:16px 0
          border-bottom:1px solid rgba(7,17,27,.1)
          .user
            position:absolute
            right:0
            top:16px
            line-height:12px
            font-size:0
            .name
              display:inline-block
              vertical-align: top
              font-size:12px
              margin-right:6px
              color:rgb(147,153,159)
            .avatar
              border-radius:50%
          .time
            margin-bottom:6px
            line-height:12px
            font-size:12px
            color:rgb(127,153,159)
          .text
            line-height:16px
            font-size:12px
            color:rgb(7,17,27)
            .icon-thumb_up,.icon-thumb_down
              margin-right:4px
              line-height:16px
              font-size:12px
            .icon-thumb_up
              color:rgb(0,160,220)
            .icon-thumb_down
              color:rgb(147,153,159)
  .slide-fade-enter-active
    transition: all .7s ease
  .slide-fade-leave-active 
    transition: all .8s ease
  .slide-fade-enter, .slide-fade-leave-to
    transform: translateX(100%)

</style>
