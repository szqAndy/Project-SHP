<template>
  <div>
    <Header />
    <router-view></router-view>
    <Footer v-show="$route.meta.show" />
  </div>
</template>

<script>
import Header from "components/Header/index";
import Footer from "components/Footer/index";
export default {
  name: "App",
  components: {
    Header,
    Footer,
  },
  mounted() {
    // 通知Vuex发请求，获取数据，存储于仓库当中
    // 派发一个action|获取商品分类的三级列表的数据
    this.$store.dispatch("categoryList");
  },
};
</script>

<style lang="less">
@import "assets/css/reset";
</style>
