<template>
  <div class="header">
    <div class="content-wrapper">
      <div class="avatar">
        <img :src="seller.avatar" width="64" height="64">
      </div>
      <div class="content">
        <div class="title">
          <span class="brand"></span>
          <span class="name">{{seller.name}}</span>  
        </div>
        <div class="description">
          {{seller.description}}/{{seller.deliveryTime}}分钟送达
        </div>
        <div v-if="seller.supports" class="support">
          <span class="icon" :class="classMap[seller.supports[0].type]"></span>
          <span class="text">{{seller.supports[0].description}}</span>
        </div>
      </div>
      <div v-if='seller.supports' class="count-content" @click="detailShow = true">
        <span class="count">{{seller.supports.length}}个</span>
        <i class="icon-keyboard_arrow_right"></i>
      </div>
    </div>
    <div class="bulletin-wrapper">
      <span class="bulletin-title"></span><span class="bulletin-text">{{seller.bulletin}}</span>
      <i class="icon-keyboard_arrow_right" @click="detailShow = true"></i>
    </div>
    <div class="background">
      <img :src="seller.avatar" width="100%" height="100%">
    </div>
    <transition name="fade">
      <div class="detail" v-show="detailShow">
        <div class="detail-wrapper clearfix">
          <div class="detail-main">
            <h1 class="name">{{seller.name}}</h1>
            <div class="star-wrapper">
              <star :size="48" :score="seller.score"></star>
            </div>
            <div class="title">
              <div class="line"></div>
              <div class="text">优惠信息</div>
              <div class="line"></div>
            </div>
            <ul v-if='seller.supports' class="supports">
              <li v-for="(item,index) in seller.supports" class="supports-item">
                <span class="icon" :class="classMap[seller.supports[index].type]"></span>
                <span class="text">{{seller.supports[index].description}}</span>
              </li>
            </ul>
            <div class="title">
              <div class="line"></div>
              <div class="text">商家公告</div>
              <div class="line"></div>
            </div>
            <div class="seller-description">
              <p class="content">{{seller.bulletin}}</p>
            </div>
          </div>
        </div>
        <div class="detail-close" @click="detailShow = false">
          <i class="icon-close"></i>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
// 头部组件 门店信息遮罩层

// 引入评分组件
import star from '../star/star.vue'

export default {
  props:{
    seller:{
      type:Object,
      default:{}
    }
  },
  data() {
    return {
      detailShow:false// 控制遮罩层
    }
  },
  created() {
    this.classMap = ['decrease','discount','special','invoice','guarantee']//控制类名实现不同icon 通过数据的type
  },
  components:{
    star
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
  @import "../../common/stylus/style.css";
  @import "../../common/stylus/base.css";
  .header 
    position: relative
    color:#fff
    overflow: hidden
    background:rgba(7,17,27,.5)
    .content-wrapper 
      position:relative
      padding:24px 12px 18px 24px
      font-size: 0
      .avatar 
        display: inline-block
        vertical-align: top
        border-radius: 2px
        overflow: hidden
      .content
        display: inline-block
        font-size: 14px
        margin-left:16px
        .title
          margin 2px 0 8px 0
          .brand
            display: inline-block
            vertical-align: top
            width:30px
            height:18px
            background-size: 30px 18px
            background-image: url('./brand@2x.png')
            @media (-webkit-min-device-pixel-ratio:3),(min-device-pixel-ratio:3)
              background-image: url('./brand@3x.png')
          .name
            margin-left:6px
            font-size:16px
            line-height:18px
            font-weight: bold
        .description 
          margin-bottom:10px
          line-height:12px
          font-size:12px
        .support
          .icon
            display:inline-block
            vertical-align: top
            width:12px
            height:12px
            margin-right:4px
            background-size:12px 12px
          .decrease
            background-image: url('./decrease_1@2x.png')
            @media (-webkit-min-device-pixel-ratio:3),(min-device-pixel-ratio:3)
              background-image: url('./decrease_1@3x.png')
          .discount
            background-image: url('./discount_1@2x.png')
            @media (-webkit-min-device-pixel-ratio:3),(min-device-pixel-ratio:3)
              background-image: url('./discount_1@3x.png')
          .guarantee
            background-image: url('./guarantee_1@2x.png')
            @media (-webkit-min-device-pixel-ratio:3),(min-device-pixel-ratio:3)
              background-image: url('./guarantee_1@3x.png')
          .invoice
            background-image: url('./invoice_1@2x.png')
            @media (-webkit-min-device-pixel-ratio:3),(min-device-pixel-ratio:3)
              background-image: url('./invoice_1@3x.png')
          .special
            background-image: url('./special_1@2x.png')
            @media (-webkit-min-device-pixel-ratio:3),(min-device-pixel-ratio:3)
              background-image: url('./special_1@3x.png')
      .count-content
          position: absolute
          right:12px
          bottom:14px
          padding:0 8px
          height:24px
          line-height: 24px
          border-radius: 14px
          background: rgba(0,0,0,.2)
          text-align: center
          .count
            vertical-align: top
            font-size:12px
          .icon-keyboard_arrow_right
            line-height: 24px
            margin-left:2px
            font-size:12px
    .bulletin-wrapper 
      position: relative
      height:28px
      line-height: 28px
      padding 0 22px 0 12px
      white-space:nowrap
      overflow: hidden
      text-overflow: ellipsis
      background:rgba(7,12,27,0.2)
      .bulletin-title
        display: inline-block
        width: 22px
        height: 12px
        vertical-align: top
        margin-top:9px
        background-image: url('./bulletin@2x.png')
        @media (-webkit-min-device-pixel-ratio:3),(min-device-pixel-ratio:3)
          background-image: url('./bulletin@3x.png')
        background-size:22px 12px
      .bulletin-text
        vertical-align: top
        font-size:12px
        font-weight: bold
        margin 0 4px
      .icon-keyboard_arrow_right
        position: absolute
        font-size:10px
        right:5px
        bottom:8px
    .background
      position: absolute
      top:0
      left:0
      width: 100%
      height: 100%
      z-index:-1
      filter:blur(10px)
    .detail
      position:fixed
      top:0
      left:0
      z-index:100
      width: 100%
      height: 100%
      overflow: auto
      background:rgba(7,17,27,.8)
      backdrop-filter:blur(10px)
      .detail-wrapper
        min-height:100%
        width:100%
        .detail-main
          margin-top:64px
          padding-bottom:64px
          .name
            line-height: 16px
            text-align: center
            font-size: 16px
            font-weight: 700
          .star-wrapper
            margin-top:18px
            padding:2px 0
            text-align:center
          .title
            display:flex
            width:80%
            margin:30px auto 24px auto
            .line
              flex:1
              position:relative
              top:-6px
              border-bottom:1px solid rgba(255,255,255,.2)
            .text
              padding:0 12px
              font-size:14px
          .supports
            width: 80%
            margin: 0 auto
            .supports-item
              padding: 0 12px
              margin-bottom: 12px
              font-size:0
              .icon
                display: inline-block
                width: 16px
                height: 16px
                vertical-align: top
                background-size:16px 16px
              .decrease
                background-image: url('./decrease_1@2x.png')
                @media (-webkit-min-device-pixel-ratio:3),(min-device-pixel-ratio:3)
                  background-image: url('./decrease_1@3x.png')
              .discount
                background-image: url('./discount_1@2x.png')
                @media (-webkit-min-device-pixel-ratio:3),(min-device-pixel-ratio:3)
                  background-image: url('./discount_1@3x.png')
              .guarantee
                background-image: url('./guarantee_1@2x.png')
                @media (-webkit-min-device-pixel-ratio:3),(min-device-pixel-ratio:3)
                  background-image: url('./guarantee_1@3x.png')
              .invoice
                background-image: url('./invoice_1@2x.png')
                @media (-webkit-min-device-pixel-ratio:3),(min-device-pixel-ratio:3)
                  background-image: url('./invoice_1@3x.png')
              .special
                background-image: url('./special_1@2x.png')
                @media (-webkit-min-device-pixel-ratio:3),(min-device-pixel-ratio:3)
                  background-image: url('./special_1@3x.png')  
              .text
                font-size:14px
                margin-left:6px
          .seller-description
            width: 80%
            margin: 0 auto
            .content
              padding: 0 12px 
              line-height:24px
              font-size:14px
      .detail-close
        position: relative
        width: 32px
        height: 32px
        margin:-64px auto 0 auto
        font-size:32px
  .fade-enter-active 
    transition: opacity .5s
  .fade-leave-active 
    transition: opacity .5s
  .fade-enter
    opacity: 0
  .fade-leave-to
    opacity: 0
</style>

