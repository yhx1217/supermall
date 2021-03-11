<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>

    <scroll
        class="centent"
        ref="scroll"
        :probe-type="3"
        @scroll="contentScroll"
        :pull-up-load="true"
        @pullingUp="loadMore">

      <home-swiper :banners="banners" @swiperimageLoad="swiperimageLoad"/>
      <recommend-view :recommends="recommends"/>
      <feature-view/>
      <tab-control :titles="titles" @tabClick="tabClick" :class="{tabControl:isTabTop}" ref="tabControl"/>
      <goods-list :goods="showGoods"/>
    </scroll>

    <back-top @click.native="backClick" v-show="isShowBackTop"/>

  </div>

</template>

<script>
import NavBar from "@/components/common/navbar/NavBar";
import {getHomeMultidata, getHomeGoods} from "network/home";
import HomeSwiper from "views/home/childComps/HomeSwiper";
import FeatureView from "@/views/home/childComps/FeatureView";
import RecommendView from "@/views/home/childComps/RecommendView";
import TabControl from "@/components/content/tabControl/TabControl";
import GoodsList from "@/components/content/goods/GoodsList";
import Scroll from "@/components/common/scroll/Scroll";
import BackTop from "@/components/content/backTop/BackTop";

export default {
  name: "Home",
  components: {
    HomeSwiper,
    NavBar,
    FeatureView,
    RecommendView,
    TabControl,
    GoodsList,
    Scroll,
    BackTop,

  },
  data() {
    return {
      banners: [],
      recommends: [],
      titles: ['流行', '新款', '精选'],
      goods: {
        'pop': {page: 0, list: []},
        'new': {page: 0, list: []},
        'sell': {page: 0, list: []}
      },
      currentType: 'pop',
      isShowBackTop: false,
      tabControlTop: Number,
      isTabTop: false
    }
  },
  created() {
    this.getHomeMultidata()
    this.getHomeGoods('pop')
    this.getHomeGoods('new')
    this.getHomeGoods('sell')

  },
  mounted() {

  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list;
    }
  },
  methods: {
    // 事件监听
    tabClick(index) {
      if (index === 0) {
        this.currentType = 'pop'
      }
      if (index === 1) {
        this.currentType = 'new'
      }
      if (index === 2) {
        this.currentType = 'sell'
      }
    },
    backClick() {
      this.$refs.scroll.scrollTo(0, 0)

    },
    contentScroll(position) {
      this.isShowBackTop = -position.y > 1000
      this.isTabTop = -position.y > this.tabControlTop

    },
    loadMore() {
      this.getHomeGoods(this.currentType)
    },
    swiperimageLoad() {
      this.tabControlTop = this.$refs.tabControl.$el.offsetTop
    },


    // 网络请求
    getHomeMultidata() {
      getHomeMultidata().then(res => {
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      })
    },
    getHomeGoods(type) {
      const page = this.goods[type].page + 1
      getHomeGoods(type, page).then(res => {
        this.goods[type].list.push(...res.data.list)
        this.goods[type].page += 1

        this.$refs.scroll.finishPullUp()
      })
    },

  }

}
</script>

<style scoped>
#home {
  height: 100vh;
  padding-top: 44px;
  position: relative;
}

.home-nav {
  background-color: var(--color-tint);
  color: #fff;

  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 9;
}

.centent {
  position: absolute;
  top: 44px;
  bottom: 49px;

}

.tabControl {


}
</style>