<template>
  <div>
    <!-- 三级联动全局组件：三级联动已经注册为全局组件，因此不需要再import引入了 -->
    <type-nav />
    <list-container />
    <recommend />
    <rank />
    <like />
    <!-- Floor这个组件：自己在组件内部是没有发请求的，数据的来源父组件的 -->
    <floor v-for="(floor, index) in floorList" :key="floor.id" :list="floor" />
    <brand />
  </div>
</template>

<script>
// 引入其他组件
import ListContainer from "./ListContainer/index.vue";
import Recommend from "./Recommend/index.vue";
import Rank from "./Rank/index.vue";
import Like from "./Like/index.vue";
import Floor from "./Floor/index.vue";
import Brand from "./Brand/index.vue";

import { mapState } from "vuex";
export default {
  name: "",
  components: { ListContainer, Recommend, Rank, Like, Floor, Brand },
  mounted() {
    // 派发action，获取floor组件的数据
    this.$store.dispatch("getFloorList");
    // 获取用户信息在首页展示
    // this.$store.dispatch("getUserInfo");
  },
  computed: {
    ...mapState({
      floorList: (state) => state.home.floorList,
    }),
  },
};
</script>

<style>
</style>