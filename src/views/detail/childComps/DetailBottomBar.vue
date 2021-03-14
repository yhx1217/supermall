<template>
  <van-goods-action>
    <van-goods-action-icon icon="chat-o" text="客服"  />
    <van-goods-action-icon icon="cart-o" text="购物车" :badge="cartCount" @click="goCart" />
    <van-goods-action-icon icon="shop-o" text="店铺" />
    <van-goods-action-button type="warning" text="加入购物车"  @click="addToCart"/>
    <van-goods-action-button type="danger" text="立即购买" @click="buy" />
  </van-goods-action>
</template>

<script>
export default {
  name: "DetailBottomBar",
  computed:{
    cartCount() {
      return this.$store.getters.cartCount
    }
  },
  methods: {
    addToCart() {
      this.$toast('已添加到购物车')
      this.$emit('addToCart')
    },
    buy(){
      this.$toast('没钱了')
    },
    goCart(){
      this.$router.replace('/cart')
    }
  }
}
</script>

<style scoped>

</style>
