<template>
  <div v-if="Object.keys(banners).length !==0">
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white" >
      <van-swipe-item  v-for="(item,index) in banners" :key="index">
        <a :href="item.link">
          <img :src="item.image" alt="" @load="imageLoad">
        </a>
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>
  import {Swiper,SwiperItem} from 'components/common/swiper';

  export default {
    name: "HomeSwiper",
    data(){
      return {
        isLoad:true
      }
    },
    props: {
      banners: {
        type: Array,
        default() {
          return []
        }
      }
    },
    components: {
      Swiper,
      SwiperItem
    },
    methods:{
      imageLoad(){
        if (this.isLoad){
          this.$emit('swiperimageLoad')
          this.isLoad=!this.isLoad
        }
      }

    }
  }
</script>

<style scoped>
.my-swipe{
  width: 100vw;
}
.my-swipe img{
  width: 100%;
}
</style>