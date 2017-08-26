<template>
    <div class="ratings" ref="wrapper">
        <div class="ratings-content">
            <div class="overview">
                <div class="overview-left">
                    <h1 class="score">{{seller.score}}</h1>
                    <div class="title">综合评分</div>
                    <div class="rank">高于周边{{seller.rankRate}}%</div>
                </div>
                <div class="overview-right">
                    <div class="score-wrapper">
                        <span class="title">服务态度</span>
                        <star :size='36' :score='seller.serviceScore'></star>
                        <span class="score">{{seller.serviceScore}}</span>
                    </div>
                    <div class="score-wrapper">
                        <span class="title">商品评分</span>
                        <star :size='36' :score='seller.foodScore'></star>
                        <span class="score">{{seller.foodScore}}</span>
                    </div>
                    <div class="delivery-wrapper">
                        <span class="title">送达时间</span>
                        <span class="delivery">{{seller.deliveryTime}}</span>
                    </div>
                </div>
            </div>
            <split></split>
            <ratingselect :selectType="selectType" :onlyContent="onlyContent" :desc="desc" :ratings="ratings" @selectT="select" @toggleT="toggle"></ratingselect>
            <div class="rating-wrapper">
                <ul v-show="ratings.length !== 0">
                    <li v-for="rating in ratings" class="rating-item" v-show="needShow(rating.rateType,rating.text)">
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
            </div>
        </div>
    </div>
</template>

<script>
import star from '../star/star.vue'
import split from '../split/split.vue'
import ratingselect from '../ratingselect/ratingselect.vue'
import BScroll from 'better-scroll'
import {fliterDate} from '../../common/js/date.js'


const POSITIVE = 0
const NEGATIVE = 1
const All = 2
const ERR_OK = 0

export default {
    props:{
        seller:{
            type:Object,
            default() {
                return {}
            }
        }
    },
    data() {
        return {
            ratings:[],
            selectType:All,
            onlyContent:false,
            desc:{
              all:'全部',
              positive:'推荐',
              negative:'吐槽'
           }
        }
    },
    components:{
        star,
        split,
        ratingselect
    },
    methods:{
        select(type) {
            this.selectType = type
            this.$nextTick( ()=>{
              this.scroll.refresh()
            })
        },
        toggle() {
            this.onlyContent = !this.onlyContent
            this.$nextTick( ()=>{
              this.scroll.refresh()
            })
        },
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
    created() {
        this.$http.get('/api/ratings').then((res) => {
        // console.log(JSON.parse(res.bodyText))
        if(JSON.parse(res.bodyText).errno === ERR_OK){
            this.ratings = JSON.parse(res.bodyText).data
            this.$nextTick(()=>{
                this.scroll = new BScroll(this.$refs.wrapper,{
                    click:true
                })
            })
        }
        },() => {
        console.log('error')
        })
    },
      filters:{
        filterTime(time) {
            let date = new Date(time)
            return fliterDate(date,'yyyy-MM-dd hh:mm')
        }
    },
}
</script>

<style lang="stylus">
  .ratings
    position:absolute
    top:174px
    bottom:0
    left:0
    width:100%
    overflow:hidden
    .overview
      display:flex
      padding:18px 0
      .overview-left
        flex:0 0 137px
        width:137px
        border-right:1px solid rgba(7,17,27,.5)
        text-align:center
        @media only screen and (max-width:320px)
          flex:0 0 110px
          width:120px
        .score
          margin-bottom:6px
          line-height:28px
          font-size:24px
          color:rgb(255,153,0)
        .title
          line-height:12px
          font-size:12px
          color:rgb(7,17,27)
          margin-bottom:8px
        .rank
          line-height:10px
          font-size:10px
          color:rgb(147,153,159)
      .overview-right
        flex:1
        padding-left:24px
        @media only screen and (max-width:320px)
          padding-left:6px
        .score-wrapper
          margin-bottom:8px
          line-height:18px
          font-size:0
          .title
            display:inline-block
            font-size:12px
            color:rgb(7,17,27)
            vertical-align: top
          .star
            display:inline-block
            margin:0 12px
            vertical-align: top
          .score
            display:inline-block
            vertical-align: top
            font-size:12px
            color:rgb(255,151,0)            
        .delivery-wrapper
          font-size:0
          .title
            font-size:12px
            color:rgb(7,17,27)
            vertical-align: top
          .delivery
            font-size:12px
            color:rgb(147,153,159)
            margin-left:12px
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
          
</style>
