<template>
  <div id="detail">
    <detail-nav-bar class="detailnav" ref="nav" @titleClick="titleClick"/>
    <scroll class="content"
            ref="scroll"
            :pullUpLoad="true"
            :probeType="3"
            @scroll="contentScroll">
      <detail-swiper :top-images="topImages"/>
      <detail-base-info :goods="goods"/>
      <detail-shop-info :shop="shop"/>
      <detail-goods-info :detail-info="detailInfo" @detailImageLoad="detailImageLoad"/>
      <detail-param-info :param-info="paramInfo" ref="params"/>
      <detail-comment-info :comment-info="commentInfo" ref="comment"/>
      <goods-list :goods="recommend" ref="recommend"/>
    </scroll>
    <detail-bottom-bar @addToCart="addToCart"/>
    <back-top @click.native="backClick" v-show="isShowBackTop"/>
  </div>
</template>

<script>
import DetailNavBar from "@/views/detail/childComps/DetailNavBar";
import {getDetail, Goods, Shop, GoodsParam, getRecommend} from "@/network/detail";
import DetailSwiper from "@/views/detail/childComps/DetailSwiper";
import DetailBaseInfo from "@/views/detail/childComps/DetailBaseInfo";
import DetailShopInfo from "./childComps/DetailShopInfo";
import Scroll from "@/components/common/scroll/Scroll";
import DetailGoodsInfo from "@/views/detail/childComps/DetailGoodsInfo";
import DetailParamInfo from "@/views/detail/childComps/DetailParamInfo";
import DetailCommentInfo from "@/views/detail/childComps/DetailCommentInfo";
import GoodsList from "@/components/content/goods/GoodsList";
import DetailBottomBar from "@/views/detail/childComps/DetailBottomBar";
import BackTop from "@/components/content/backTop/BackTop";
import { mapActions } from 'vuex'


export default {
  name: "Detail",
  components: {
    BackTop,
    DetailBottomBar,
    GoodsList,
    DetailCommentInfo,
    DetailParamInfo,
    DetailGoodsInfo,
    Scroll,
    DetailBaseInfo,
    DetailNavBar,
    DetailSwiper,
    DetailShopInfo
  },
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommend: [],
      themeTopYs: [],
      currentIndex: 0,
      isShowBackTop: false,
    }
  },
  created() {
    this.iid = this.$route.params.iid
    getDetail(this.iid).then(res => {
      const data = res.result
      this.topImages = data.itemInfo.topImages
      this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)
      this.shop = new Shop(data.shopInfo)
      this.detailInfo = data.detailInfo;
      this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)
      if (data.rate.cRate !== 0) {
        this.commentInfo = data.rate.list[0]
      }


    })
    getRecommend().then(res => {
      this.recommend = res.data.list
    })
  },
  updated() {

  },
  methods: {
    ...mapActions(['addCart']),
    detailImageLoad() {
      this.themeTopYs = []
      this.themeTopYs.push(0)
      this.themeTopYs.push(this.$refs.params.$el.offsetTop - 44)
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop - 44)
      this.themeTopYs.push(this.$refs.recommend.$el.offsetTop - 44)
    },
    titleClick(index) {
      this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 200)

    },
    backClick() {
      this.$refs.scroll.scrollTo(0, 0)

    },
    contentScroll(position) {
      this.isShowBackTop = -position.y > 1000
      const positionY = -position.y
      if (positionY < this.themeTopYs[1]) {
        this.currentIndex = 0
      } else if (positionY < this.themeTopYs[2]) {
        this.currentIndex = 1
      } else if (positionY < this.themeTopYs[3]) {
        this.currentIndex = 2
      } else if (positionY < Number.MAX_VALUE) {
        this.currentIndex = 3
      }

      this.$refs.nav.currentIndex = this.currentIndex

    },
    addToCart(){
      const  product = {}
      product.image = this.topImages[0]
      product.title = this.goods.title
      product.desc =this.goods.desc
      product.price = this.goods.realPrice
      product.iid = this.iid
      this.addCart(product)
    }
  },

}
</script>

<style scoped>
#detail {
  position: relative;
  z-index: 9;
  background: #fff;
  height: 100vh;
}

.detailnav {
  position: relative;
  z-index: 9;
  background: #fff;
}

.content {
  height: calc(100% - 44px);
}
</style>