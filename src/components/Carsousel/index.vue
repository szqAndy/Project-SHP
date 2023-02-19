<template>
  <div class="swiper-container" ref="cur">
    <div class="swiper-wrapper">
      <div
        class="swiper-slide"
        v-for="(carousel, index) in list"
        :key="carousel.id"
      >
        <img :src="carousel.imgUrl" />
      </div>
    </div>
    <!-- 如果需要分页器 -->
    <div class="swiper-pagination"></div>

    <!-- 如果需要导航按钮 -->
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
  </div>
</template>

<script>
import Swiper from "swiper";
export default {
  name: "Carsousel",
  props: ["list"],
  watch: {
    list: {
      // 立即监听：不管数据有没有发生变化，上来就立即监听一次
      // 为什么watch监听不到list？因为这个数据从来没有发生过变化（数据是父组件给的，给时就是一个对象，对象里面该有的数据）
      immediate: true,
      handler(newValue, oldValue) {
        // 只能监听到数据已经有了，但是v-for动态渲染结构时是没有办法确定的，因此还是需要用nextTick
        this.$nextTick(() => {
          var mySwiper = new Swiper(this.$refs.cur, {
            loop: true,
            pagination: {
              // 如果需要分页器
              el: ".swiper-pagination",
              clickable: true, // 点击小球时也切换图片
            },
            navigation: {
              // 如果需要前后退按钮
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            },
          });
        });
      },
    },
  },
};
</script>

<style>
</style>