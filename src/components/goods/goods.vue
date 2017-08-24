<template>
    <div class="goods">
        <div class="menu-wrapper" ref="menuWrapper">
            <ul>
                <li v-for="(item,index) in goods" class="menu-item" :class="{'current':index === currentIndex}" @click="selectIndex(index,$event)">
                    <span class="text">
                        <span v-show="item.type > 0" class="icon" :class="classMap[item.type]"></span>{{item.name}}
                    </span>
                </li>
            </ul>
        </div>
        <div class="foods-wrapper" ref="foodsWrapper">
            <ul>
                <li v-for="item in goods" class="food-list food-list-hook">
                    <h1 class="title">{{item.name}}</h1>
                    <ul>
                        <li v-for="food in item.foods" class="food-item"> 
                            <div class="icon">
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
                                    <cartconcontrol :food="food"></cartconcontrol>
                                </div>
                            </div>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
        <shopcart :select-foods="selectFoods" :delivery-price="seller.deliveryPrice" :min-price="seller.minPrice"></shopcart>
    </div>
</template>

<script>
import BScroll from 'better-scroll'
import shopcart from '../shopcart/shopcart.vue'
import cartconcontrol from '../cartconcontrol/cartconcontrol.vue'


const ERR_OK = 0
export default {
  props:{
      seller:{
          type:Object,
          default:{}
      },
  },
  data() {
      return {
          goods:{

          },
          listHeight:[],
          scrollY:0
      }
  },
  created() {
      this.classMap = ['decrease','discount','special','invoice','guarantee']
      this.$http.get('/api/goods').then((res) => {
        // console.log(JSON.parse(res.bodyText))
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
       _initScroll() {
           this.menuScroll = new BScroll(this.$refs.menuWrapper,{
               click:true,
            //    preventDefault:false
           })
           this.foodsScroll = new BScroll(this.$refs.foodsWrapper,{
               click:true,
               probeType:3,
            //    preventDefault:false
               
           })

           this.foodsScroll.on('scroll',(pos) =>{
               this.scrollY = Math.abs(~~pos.y)
                // console.log(Math.abs(~~pos.y))
           })
        // console.log(this.$refs.menuWrapper)
       },
       _calclateHeight() {
        //    console.log(this.$refs.foodsWrapper.getElementsByClassName('food-list-hook'))
           let foodList = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook')
           let height = 0
           this.listHeight.push(height)
           for(let i = 0;i<foodList.length;i++){
               height += foodList[i].clientHeight;
               this.listHeight.push(height)
           }
        //    console.log(this.listHeight)
       },
       selectIndex(index,event) {
           if(!event._constructed){
               return;
           }
           let foodList = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook')
           let el =  foodList[index]
           console.log(el)
           this.foodsScroll.scrollToElement(el,300)
       }
   },
  computed:{
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
       cartconcontrol
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
