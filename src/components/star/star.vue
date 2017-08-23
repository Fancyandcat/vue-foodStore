<template>
    <div class="star" :class="starType">
        <span v-for="itemClass in itemClasss" class="star-item" :class="itemClass"></span> 
    </div>
</template>

<script>
const LENGTH = 5
const CLE_ON = 'on'
const CLE_OFF = 'off'
const CLE_HALF = 'half'
export default {
  props:{
      size:{
          type:Number
      },
      score:{
          type:Number
      }
  },
  computed:{
      starType() {
          return 'star-' + this.size
      },
      itemClasss() {
        let result = []
        // 向下取0.5的倍数
        let score = Math.floor(this.score * 2)/2
        let hasDecimal = score % 1 !== 0
        let integer = Math.floor(score)
        for(let i = 0;i<integer;i++){
            result.push(CLE_ON)
        }
        if(hasDecimal){
            result.push(CLE_HALF)
        }
        while (result.length < LENGTH){
            result.push(CLE_OFF)
        }
        return result
      }
  }
}
</script>

<style lang="stylus">
  .star
  .star-48
    .star-item
      display: inline-block
      width:20px
      height:20px
      margin-right:22px
      background-size:20px 20px 
    .on
      background-image: url('./star48_on@2x.png')
      @media (-webkit-min-device-pixel-ratio:3),(min-device-pixel-ratio:3)
        background-image: url('./star48_on@3x.png')
    .half
      background-image: url('./star48_half@2x.png')
      @media (-webkit-min-device-pixel-ratio:3),(min-device-pixel-ratio:3)
        background-image: url('./star48_half@3x.png')
    .off
      background-image: url('./star48_off@2x.png')
      @media (-webkit-min-device-pixel-ratio:3),(min-device-pixel-ratio:3)
        background-image: url('./star48_off@3x.png')
    .last-child
      margin-right:0
  .star-36
    .star-item
      display: inline-block
      width:15px
      height:15px
      margin-right:6px
      background-size:15px 15px 
    .on
      background-image: url('./star36_on@2x.png')
      @media (-webkit-min-device-pixel-ratio:3),(min-device-pixel-ratio:3)
        background-image: url('./star36_on@3x.png')
    .half
      background-image: url('./star36_half@2x.png')
      @media (-webkit-min-device-pixel-ratio:3),(min-device-pixel-ratio:3)
        background-image: url('./star36_half@3x.png')
    .off
      background-image: url('./star36_off@2x.png')
      @media (-webkit-min-device-pixel-ratio:3),(min-device-pixel-ratio:3)
        background-image: url('./star36_off@3x.png')
    .last-child
      margin-right:0
  .star-24
    .star-item
      display: inline-block
      width:10px
      height:10px
      margin-right:3px
      background-size:10px 10px 
    .on
      background-image: url('./star24_on@2x.png')
      @media (-webkit-min-device-pixel-ratio:3),(min-device-pixel-ratio:3)
        background-image: url('./star24_on@3x.png')
    .half
      background-image: url('./star24_half@2x.png')
      @media (-webkit-min-device-pixel-ratio:3),(min-device-pixel-ratio:3)
        background-image: url('./star24_half@3x.png')
    .off
      background-image: url('./star24_off@2x.png')
      @media (-webkit-min-device-pixel-ratio:3),(min-device-pixel-ratio:3)
        background-image: url('./star24_off@3x.png')
    .last-child
      margin-right:0
</style>
