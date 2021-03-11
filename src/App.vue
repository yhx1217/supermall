<template>
  <div id="app">
    <div id="nav">
      <main-tab-bar class="maintabbar"></main-tab-bar>
      <keep-alive exclude="Detail">
        <router-view/>
      </keep-alive>
    </div>
  </div>
</template>

<script>
import MainTabBar from "@/components/content/mainTabbar/MainTabBar";


export default {
  name: 'app',
  components: {
    MainTabBar,
  }
}
</script>

<style scoped>
@import "assets/css/base.css";


.maintabbar {
  z-index: 9;
}
</style>
