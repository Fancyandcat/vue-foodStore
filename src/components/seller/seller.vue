<template>
    <div class="seller" ref="wrapper">
        <div class="seller-content">
            <div class="overview">
                <h1 class="title">{{seller.name}}</h1>
                <div class="desc">
                    <star :size="36" :score="seller.score"></star>
                    <span class="text">{{seller.ratingCount}}</span>
                    <span class="text">{{seller.sellCount}}</span>
                </div>
                <ul class="remark">
                    <li class="block">
                        <h2>起送价</h2>
                        <div class="content">
                            <span class="stress">
                                {{seller.minPrice}}元
                            </span>
                        </div>
                    </li>
                    <li class="block">
                        <h2>商家配送</h2>
                        <div class="content">
                            <span class="stress">
                                {{seller.deliveryPrice}}元
                            </span>
                        </div>
                    </li>
                    <li class="block">
                        <h2>平均配送时间</h2>
                        <div class="content">
                            <span class="stress">
                                {{seller.deliveryTime}}分钟
                            </span>
                        </div>
                    </li>
                </ul>
            </div>
            <split></split>
            <div class="bulletin">
                <h1 class="title">公告与活动</h1>
                <div class="content-wrapper">
                    <p class="content">{{seller.bulletin}}</p>
                </div>
                <ul v-if='seller.supports' class="supports">
                    <li v-for="(item,index) in seller.supports" class="supports-item">
                        <span class="icon" :class="classMap[seller.supports[index].type]"></span>
                        <span class="text">{{seller.supports[index].description}}</span>
                    </li>
                </ul>
            </div>
            <split></split>
            <div class="pics">
                <h1 class="title">商家实景</h1>
                <div class="pic-wrapper" ref='picwrapper'>
                    <ul class="pic-list" ref="piclist">
                        <li class="pic-item" v-for="pic in seller.pics">
                            <img :src="pic" alt="">
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import star from '../star/star.vue'
import split from '../split/split.vue'
import BScroll from 'better-scroll'

export default {
  props:{
      seller:{
          type:Object
      }
  },
  created() {
    this.classMap = ['decrease','discount','special','invoice','guarantee']
    this.$nextTick(()=>{
        this.scroll = new BScroll(this.$refs.wrapper,{
            click:true
        })
    })
	
  },
  mounted() {
	  if(this.seller.pics){
		let picW = 120
		let margin = 6
		let width = (picW + margin)*this.seller.pics.length
		this.$refs.piclist.style.width = width + 'px'
		this.$nextTick(()=>{
			this.picscroll = new BScroll(this.$refs.picwrapper,{
				scrollX:true
			})
		})
	}
  },
  components:{
      star,
      split
  }
}
</script>

<style lang="stylus">
    .seller
      position:absolute
      top:174px
      bottom:0
      left:0
      width:100%
      overflow:hidden
      .overview
        padding:18px
        .title
          margin-bottom:8px
          line-height:14px
          color:rgb(7,17,27)
          font-size:14px
        .desc
          padding-bottom:18px
          line-height:18px
          border-bottom:1px solid rgba(7,17,27,.1)
          font-size:0
          .star
            display:inline-block
            margin-right:8px
            vertical-align: top
          .text
            margin-right:12px
            display:inline-block
            vertical-align: top
            font-size:12px
        .remark
          display:flex
          padding-top:18px
          .block
            flex:1
            text-align:center
            border-right:1px solid #ccc
            h2  
              margin-bottom:4px
              line-height:10px
              font-size:12px
              color:rgb(147,153,159)
            .content
              line-height:24px
              font-size:12px
              color:rgb(7,17,27)
              .stress
                font-size:24px
      .bulletin 
        padding:18px 18px 0 18px
        .title
          margin-bottom:8px
          line-height:14px
          color:rgb(7,17,27)
          font-size:14px
        .content-wrapper
          padding:0 12px 16px 12px
          border-bottom:1px solid rgba(7,17,27,.2)
          .content
            line-height:24px
            font-size:12px
            color:rgb(240,20,20)
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
	  .pics
		padding:18px
		.title
		  margin-bottom:8px
		  line-height:14px
		  color:rgb(7,17,27)
		  font-size:14px
		.pic-wrapper
		  width:100%
		  overflow:hidden
		  white-space:nowrap
		.pic-list
		  font-size:0
		  .pic-item
		    display:inline-block
			margin-right:6px
			width:120px 
  
</style>
