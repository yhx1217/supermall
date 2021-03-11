<template>
  <div>
    <goods-list :goods="categoryDetail"></goods-list>
  </div>
</template>

<script>

  import GoodsList from "@/components/content/goods/GoodsList";
  import GoodsListItem from "@/components/content/goods/GoodsListItem";

  export default {
    name: "TabContentDetail",
    components: {
      GoodsList,
      GoodsListItem
    },
    props: {
      categoryDetail: {
        type: Array,
        default() {
          return []
        }
      }
    },

  }
</script>

<style scoped>

</style>
