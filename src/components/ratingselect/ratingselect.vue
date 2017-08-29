<template>
    <div class="ratingselect">
        <div class="rating-type">
            <span class="block positive" :class="{'active':selectType===2}" @click="select(2,$event)">{{desc.all}}<span class="count">{{ratings.length}}</span></span>
            <span class="block positive" :class="{'active':selectType===0}" @click="select(0,$event)">{{desc.positive}}<span class="count">{{goodRatings}}</span></span>
            <span class="block negative" :class="{'active':selectType===1}" @click="select(1,$event)">{{desc.negative}}<span class="count">{{badRatings}}</span></span>
        </div>
        <div class="switch" @click="toggle($event)">
            <span class="icon-check_circle" :class="{'active':onlyContent}"></span>
            <span class="text">只看内容的评价</span>
        </div>
    </div>
</template>

<script>
// 过滤评论状态

// 初始化状态码
const POSITIVE = 0 // 正面评价状态码
const NEGATIVE = 1 // 负面评价状态码
const All = 2 // 全部评价状态码

export default {
    props:{
        ratings:{
            type:Array,
            default() {
                return []
            }
        },
        selectType:{
            type:Number,
            default:All
        },
        onlyContent:{
            type:Boolean,
            default:false
        },
        desc:{
            type:Object,
            default() {
                return {
                    all:'全部',
                    positive:'满意',
                    negative:'不满意'
                }
            }
        }
    },
    data() {
        return {
            ratingLists:[]
        }
    },
    methods:{
        // 向父组件通信
        select(type,event) {
            if(!event._constructed){
                return
            }
            // 不要在子组件中修改父组件传进来的值
            this.$emit("selectT",type)
        },
        toggle(event) {
            if(!event._constructed){
                return
            }
            this.$emit("toggleT")
        }
    },
    computed:{
      // 显示各种类型的评论的数量  
      goodRatings() {
          let leg = 0
          this.ratings.forEach((rating) =>{
              if(rating.rateType === 0){
                  leg++
              }
          })
          return leg
      },
      badRatings() {
          let leg = 0
          this.ratings.forEach((rating) =>{
              if(rating.rateType === 1){
                  leg++
              }
          })
          return leg
      },
    }
}
</script>

<style lang="stylus">
  .ratingselect
    .rating-type
      padding:18px 0
      margin:0 18px
      border-bottom:1px solid rgba(7,17,27,.1)
      font-size:0
      .block
        display:inline-block
        padding:8px 12px
        margin-right:8px
        border-radius:1px
        color:rgb(77,85,93)
        font-size:14px
        .count
          margin-left:2px
          font-size:12px
      .positive
        background:rgba(0,160,220,.2)
      .negative
        background:rgba(77,85,93,.2)
      .active
        background:rgb(0,160,220) !important
        color:#fff
    .switch
      padding:12px 18px
      line-height:24px
      border-bottom:1px solid rgba(7,17,27,.4)
      color:rgb(147,153,159)
      font-size:0
      .icon-check_circle
        font-size:24px
        margin-right:4px
      .text
        font-size:12px
        display:inline-block
      .active
        color:#00a0dc
   

        

</style>
