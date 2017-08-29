<template>
    <div>
        <div class="shopcart" >
            <div class="content" @click="toggleList">
                <div class="content-left">
                    <div class="logo-wrapper">
                        <div class="logo" :class="{'heightlight':totalCount > 0}">
                            <i class="icon-shopping_cart" :class="{'heightlight':totalCount > 0}"></i>
                        </div>
                        <div class="num" v-show="totalCount > 0">{{totalCount}}</div>
                    </div>
                    <div class="price" :class="{'heightlight':totalPrice > 0}">￥{{totalPrice}}</div>
                    <div class="desc">另需配送费{{deliveryPrice}}元</div>
                </div>
                <div class="content-right">
                    <div class="pay" :class="payClass" @click="sub">
                        {{payDesc}}
                    </div>
                </div>
            </div>
            <div class="ball-container">
                <div v-for="ball in balls">
                    <transition name="drop" @before-enter="beforeDrop" @enter="dropping" @after-enter="afterDrop">
                        <div class="ball" v-show="ball.show">
                        <div class="inner inner-hook"></div>
                        </div>
                    </transition>
                </div>
            </div>
            <transition name="slide-fade">
                <div class="shopcart-list" v-show="listShow">
                    <div class="list-header">
                        <h1 class="title">购物车</h1>
                        <span class="empty" @click="empty">清空</span>
                    </div>
                    <div class="list-content"  ref="listWrapper">
                        <transition-group tag="ul" name="fade">
                            <li v-for="food in selectFoods" class="food" :key="food.name">
                                
                                <div class="price">
                                    <span class="name">{{food.name}}</span>
                                    <span class="money">￥{{food.price*food.count}}</span>
                                    <div class="cartconcontrol-wrapper">
                                        <cartconcontrol :food="food"></cartconcontrol>
                                    </div>
                                </div>
                            </li>
                        </transition-group>
                    </div>
                </div>
            </transition>
            
        </div>
        <transition name="fade">
            <div class="list-mask" v-show="listShow">
            </div>
        </transition>
    </div>
</template>

<script>
// 购物车组件 购物车功能 购物小球动画

// 引入better-scroll插件 数量框组件
import BScroll from 'better-scroll'
import cartconcontrol from '../cartconcontrol/cartconcontrol.vue'

export default {
  // 依赖父组件提供选择食品 配送费 最低配送费
  props:{
      selectFoods:{
          type:Array,
          default() {
              return []
          }
      },
      deliveryPrice:{
          type:Number,
          default:0
      },
      minPrice:{
          type:Number,
          default:0
      }
  },
  data() {
      return {
          tagOff : false,
          balls: [ //小球 设为3个
               {
                   show: false
               },
               {
                   show: false
               },
                {
                   show: false
               },
           ],
           dropBalls:[],
           fold:true
      }
  },
  computed:{
     // 计算总价
     totalPrice() {

         let sum = 0
         this.selectFoods.forEach((food) =>{
             sum += food.price*food.count
         })
         return sum
     },
     // 计算总数量
     totalCount() {

         let sum = 0
         this.selectFoods.forEach((food) =>{
             sum += food.count
         })
         return sum
     },
     // 计算是否满足起送价
     payDesc() {

        if(this.totalPrice === 0){

            this.tagOff = false
            return `￥${this.minPrice}元起送`

        }else if(this.totalPrice < this.minPrice){

            let diff = this.minPrice - this.totalPrice
            this.tagOff = false
            return `还差￥${diff}元起送`

        }else {

            this.tagOff = true
            return '去结算'
        }
     },
     // 根据总价和起送价完成class动态绑定
     payClass() {

         if(this.totalPrice < this.minPrice){

             return "not-enough"

         }else {

             return "enough"

         }
     },
     // 控制购物车商品展示列表的展示与隐藏
     listShow() {
         if(this.totalCount <= 0){

             this.fold = true
             return false
         }else {
             if(!this.fold){

                 this.$nextTick(()=>{

                     if(!this.scroll){

                        this.scroll = new BScroll(this.$refs.listWrapper,{
                            click:true
                        })
                    }else{

                         this.scroll.refresh()
                    }
                 })
             }
             return !this.fold
         }
     }
  },
  methods:{
     // 将总价传送给父组件
     sub() {

         if(!this.tagOff){

             return false;

         }else {

             this.$emit("submitOK",this.totalPrice)
         }
     },
     // 小球动画 --- start
     drop(el){ //抛物
        for(let i=0;i<this.balls.length;i++){
            let ball= this.balls[i];
            if(!ball.show){
                ball.show = true;
                ball.el=el;
                this.dropBalls.push(ball);
                return;
            }
        }
     },
     beforeDrop(el) {/* 购物车小球动画实现 */
        let count = this.balls.length;
        while (count--) {
            let ball = this.balls[count];
            if (ball.show) {
                let rect = ball.el.getBoundingClientRect(); //元素相对于视口的位置
                let x = rect.left - 32;
                let y = -(window.innerHeight - rect.top - 22);  //获取y
                el.style.display = '';
                el.style.webkitTransform = 'translateY('+y+'px)';  //translateY
                el.style.transform = 'translateY('+y+'px)';
                let inner = el.getElementsByClassName('inner-hook')[0];
                inner.style.webkitTransform = 'translateX('+x+'px)';
                inner.style.transform = 'translateX('+x+'px)';
            }
        }
     },
     dropping(el, done) { /*重置小球数量  样式重置*/
        let rf = el.offsetHeight;
        el.style.webkitTransform = 'translate3d(0,0,0)';
        el.style.transform = 'translate3d(0,0,0)';
        let inner = el.getElementsByClassName('inner-hook')[0];
        inner.style.webkitTransform = 'translate3d(0,0,0)';
        inner.style.transform = 'translate3d(0,0,0)';
        el.addEventListener('transitionend', done);
     },
     afterDrop(el) { /*初始化小球*/
        let ball = this.dropBalls.shift();
        if (ball) {
        ball.show=false;
        el.style.display = 'none';
       }
     },
     // 小球动画 --- end
     // 控制购物车商品展示列表的展示与隐藏 
     toggleList() {
         if(!this.totalCount){
             return;
         }
         this.fold = !this.fold
         this.maskShow = !this.maskShow
     },
     // 清空按钮
     empty() {
         this.selectFoods.forEach((food) =>{
             food.count = 0
         })
     }
  },
  components:{
      cartconcontrol
  }
}
</script>

<style lang="stylus">
@import "../../common/stylus/style.css";
  .shopcart
    position:fixed
    left:0
    bottom:0
    z-index:50
    width:100%
    height: 48px
    .content
      display:flex
      background:#141d27
      font-size:0
      .content-left
        flex:1
        .logo-wrapper
          display:inline-block
          position: relative
          top:-10px
          margin:0 12px
          padding:6px
          width:56px
          height:56px
          box-sizing:border-box
          vertical-align: top
          border-radius: 50%
          background:#141d27
          .logo
            width:100%
            height:100%
            border-radius: 50%
            background:#2b343c
            text-align: center
          .heightlight
              background:rgb(0,160,220)
            .icon-shopping_cart
              font-size:24px
              color:#80858a
              line-height: 44px
            .heightlight
              color:#fff
          .num
            position: absolute
            top:0
            right:0
            width:24px
            height:16px
            line-height: 16px
            font-size:12px
            text-align:center
            font-weight: 700
            border-radius: 16px
            color:#fff
            background:rgb(240,20,20)
            box-shadow:0 4px 8px 0 rgba(0,0,0,.4)
            

        .price
          display:inline-block
          vertical-align: top
          line-height: 24px
          margin-top:12px
          box-sizing:border-box
          padding-right:12px
          border-right:1px solid rgba(255,255,255,.1)
          font-size:16px
          font-weight: 700
          color:rgba(255,255,255,.4)
        .heightlight
          color:#fff
        .desc
          display:inline-block
          vertical-align: top
          line-height: 24px
          margin:12px 0 0 12px
          color:rgba(255,255,255,.4)
          font-size:12px
      .content-right
        flex:0 0 105px
        width:105px
        .pay
          height:48px
          line-height:48px
          text-align:center
          font-size:12px
          color:rgba(255,255,255,.4)
          font-weight: 700
          background:#2b333b  
        .not-enough
          background:#2b333b
        .enough
          background:#00b43c
          color:#fff     
    .ball-container
      .ball
        position: fixed
        left: 32px
        bottom: 22px
        z-index: 200
        opacity: 0.5
        transition: all 0.8s cubic-bezier(0.49, -0.29, 0.75, 0.41)   
      .inner
        width: 16px
        height: 16px
        border-radius: 50%
        background-color: rgb(0,160,220)
        opacity: 1
        transition: all 0.8s linear  
    .shopcart-list 
      position: absolute
      left:0
      bottom:48px
      z-index:-1
      width:100%
      background:rgba(0,0,0,.4)
      .list-header
        height:40px
        line-height:40px
        padding:0 18px
        background:#f3f5f7
        border-bottom:1px solid rgba(7,17,27,.1)
        .title
          float:left
          font-size:14px
          color:rgb(7,17,27)
        .empty
          float:right
          font-size:12px
          color:rgb(0,160,220)
      .list-content
        padding:0 18px
        max-height:217px
        overflow: hidden
        background:#fff
        .food
          position: relative
          padding:12px 0
          box-sizing:border-box
          border-bottom:1px solid #ccc
          .name
            line-height:24px
            font-size:14px
            color:rgb(7,17,27)
          .price
            /*position: absolute
            right:90px
            bottom:12px*/
            line-height:24px
            font-size:14px
            font-weight:700
            color:rgb(240,20,20)
            .money
              position:absolute
              left: 60%
              bottom: 14px
          .cartconcontrol-wrapper
            position: absolute
            right:0
            bottom:6px
    .slide-fade-enter-active 
      transition: all .3s ease
    .slide-fade-leave-active
      transition: all .5s cubic-bezier(1.0, 0.5, 0.8, 1.0)
    .slide-fade-enter, .slide-fade-leave-to
      transform: translateY(100%)
      opacity: 0
  .fade-enter-active, .fade-leave-active 
    transition: opacity .5s
  .fade-enter, .fade-leave-to 
    opacity: 0
  .list-mask
    position: fixed
    top:0
    left:0
    background: rgba(7,17,27,0.5);
    height: 100%
    width: 100%
</style>
