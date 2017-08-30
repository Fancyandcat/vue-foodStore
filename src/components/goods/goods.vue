<template>
    <div class="goods">
        <!--菜单列表-->
        <div class="menu-wrapper" ref="menuWrapper">
            <ul>
                <li v-for="(item,index) in goods" class="menu-item" :class="{'current':index === currentIndex}" @click="selectIndex(index,$event)">
                    <span class="text">
                        <span v-show="item.type > 0" class="icon" :class="classMap[item.type]"></span>{{item.name}}
                    </span>
                </li>
            </ul>
        </div>  
        <!--菜品列表-->
        <div class="foods-wrapper" ref="foodsWrapper">
            <ul>
                <li v-for="item in goods" class="food-list food-list-hook">
                    <h1 class="title">{{item.name}}</h1>
                    <ul>
                        <li v-for="food in item.foods" class="food-item"> 
                            <div class="icon" @click="select(food,$event)">
                                <img :src="food.icon">
                            </div>
                            <div class="content">
                                <h2 class="name">{{food.name}}</h2>
                                <p class="desc">{{food.description}}</p>
                                <div class="extra">
                                    <span>月售{{food.sellCount}}份</span>
                                    <span>好评率{{food.rating}}%</span>
                                </div>
                                <div class="price">
                                    <span class="now">￥{{food.price}}</span>
                                    <span v-show="food.oldPrice" class="old">￥{{food.oldPrice}}</span>
                                </div>
                                <div class="cartconcontrol-wrapper">
                                    <cartconcontrol :food="food" @addOK="ballOK"></cartconcontrol>
                                </div>
                            </div>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
        <shopcart :select-foods="selectFoods" :delivery-price="seller.deliveryPrice" :min-price="seller.minPrice" @submitOK="submitData" ref="shopcartBall"></shopcart>
        <food :food="selectFood" ref="goSelectFood" @addOK="ballOK"></food>
    </div>
</template>

<script>
// 商品组件 购物车功能 利用better-scroll插件实现左右菜单列表联动

// 引入better-scroll插件 购物车组件 数量框组件 食物组件
import BScroll from 'better-scroll'
import shopcart from '../shopcart/shopcart.vue'
import cartconcontrol from '../cartconcontrol/cartconcontrol.vue'
import food from '../food/food.vue'

const ERR_OK = 0//模仿后台数据状态码验证使用

export default {
  props:{
      seller:{
          type:Object,
          default:{}
      },
  },
  data() {
      return {
          goods:{},
          listHeight:[],//左右菜单列表联动-存高度
          scrollY:0,//左右菜单列表联动-默认滚动高度
          selectFood:{}
      }
  },
  created() {
      this.classMap = ['decrease','discount','special','invoice','guarantee']//控制类名实现不同icon 通过数据的type
     
      //  数据请求
      this.$http.get('/api/goods').then((res) => {

        if(JSON.parse(res.bodyText).errno === ERR_OK){

          this.goods = JSON.parse(res.bodyText).data

          this.$nextTick(()=>{

            this._initScroll()

            this._calclateHeight()

          })
        }
      },() => {

        console.log('error')

      })
   },
  methods:{
      // 加‘_’为私有方法，外部请勿调用 
      // 初始化better scroll实例，完成配置
       _initScroll() {
           this.menuScroll = new BScroll(this.$refs.menuWrapper,{
                // 为bscroll配置参数 
               click:true,// 接受外部点击
            //    preventDefault:false// 取消默认

           })
           this.foodsScroll = new BScroll(this.$refs.foodsWrapper,{

               click:true,
               probeType:3,// 开启滚动事件监听
            //    preventDefault:false
               
           })

           // 监听菜品列表滚动事件    
           this.foodsScroll.on('scroll',(pos) =>{

               this.scrollY = Math.abs(~~pos.y)//菜品列表滚动高度

           })
        
       },
       // 计算菜品列表各个子列表高度 并存起来
       _calclateHeight() {

           let foodList = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook')

           let height = 0

           this.listHeight.push(height)

           for(let i = 0;i<foodList.length;i++){

               height += foodList[i].clientHeight;

               this.listHeight.push(height)
           }

       },
       // 使用bsroll 的api将菜品列表滚动到点击菜单列表对应的index子标签
       selectIndex(index,event) {

           if(!event._constructed){

               return;

           }

           let foodList = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook')

           let el =  foodList[index]

           this.foodsScroll.scrollToElement(el,300)
       },
       // 实现提交按钮后的逻辑  
       submitData(data) {
           // TODO 确认提交之后  
           alert('一共消费' + data + '元')
           

       },
       // 监听food组件 实现购物车小球动画
       ballOK(event) {

           this.$refs.shopcartBall.drop(event.target)
       },
       // 监听子组件
       select(food,event) {

           this.selectFood = food

           this.$refs.goSelectFood.show()
       }
   },
  computed:{
       // 配合selectIndex方法 返回下标
       currentIndex() {

           for(let i = 0;i<this.listHeight.length;i++){
               
               let height = this.listHeight[i]
               let height1 = this.listHeight[i+1]
               if(!height1 || (this.scrollY>=height && this.scrollY<height1)){
                   return i
               }
           }
           return 0
       },
       // 遍历所有foods对象 找到所有有count属性的对象 为购物车组件准备参数
       selectFoods() {

           let foods = []

           for(let i = 0;i<this.goods.length;i++){

               var temp = this.goods[i].foods
               for(let j = 0;j<temp.length;j++){
                   if(temp[j].count){
                       foods.push(temp[j])
                   }
               }
           }
           return foods
       }
   },
   components:{
       
       shopcart,
       cartconcontrol,
       food
   }
}
</script>

<style lang="stylus">
    .goods
      display:flex
      position:absolute
      top:174px
      bottom:46px
      overflow:hidden
      .menu-wrapper
        flex:0 0 80px
        width:80px
        background:#f3f5f7
        .current
          position:relative
          z-index:10
          margin-top:-1px
          background:#fff
          /*color:red*/
          font-weight: 700
        .menu-item
          display:table
          height: 54px
          width: 56px
          line-height:14px
          border-bottom:1px solid #ccc
          margin: 0 auto
          .icon
            display:inline-block
            vertical-align: top
            width:12px
            height:12px
            margin-right:4px
            background-size:12px 12px
          .decrease
            background-image: url('./decrease_3@2x.png')
            @media (-webkit-min-device-pixel-ratio:3),(min-device-pixel-ratio:3)
              background-image: url('./decrease_3@3x.png')
          .discount
            background-image: url('./discount_3@2x.png')
            @media (-webkit-min-device-pixel-ratio:3),(min-device-pixel-ratio:3)
              background-image: url('./discount_3@3x.png')
          .guarantee
            background-image: url('./guarantee_3@2x.png')
            @media (-webkit-min-device-pixel-ratio:3),(min-device-pixel-ratio:3)
              background-image: url('./guarantee_3@3x.png')
          .invoice
            background-image: url('./invoice_3@2x.png')
            @media (-webkit-min-device-pixel-ratio:3),(min-device-pixel-ratio:3)
              background-image: url('./invoice_3@3x.png')
          .special
            background-image: url('./special_3@2x.png')
            @media (-webkit-min-device-pixel-ratio:3),(min-device-pixel-ratio:3)
              background-image: url('./special_3@3x.png')
          .text
            display:table-cell
            vertical-align: middle
            font-size:14px
            text-align:center
      .foods-wrapper 
        flex:1
        -webkit-transform:translate3d(0,0,0)
        height:100%
        .title
          padding-left:14px
          height:26px
          line-height:26px
          border-left:2px solid #d9dde1
          font-size:12px
          color:rgb(147,153,159)
          background:#f3f5f7
        .food-item 
          display:flex
          margin:18px
          padding-bottom:18px
          border-bottom:1px solid #ccc
          .icon
            flex:0 0 57px
            margin-right:10px
          .content
            flex:1
            position: relative
            .name
              magin:2px 0 8px 0
              height:14px
              line-height:14px
              font-size:14px
              color:rgb(7,17,27)
            .desc
              margin-bottom:8px
              margin-top:8px
              line-height:14px
              font-size:14px
              color:rgb(147,153,159)
            .extra
              line-height:14px
              font-size:14px
              color:rgb(147,153,159)
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
            .cartconcontrol-wrapper
              position: absolute
              right:0
              bottom:12px


</style>
