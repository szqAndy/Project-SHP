import Vue from 'vue';
import App from './App.vue';

Vue.config.productionTip = false;

// 三级联动组件---全局组件
import TypeNav from '@/components/TypeNav';
import Carsousel from "@/components/Carsousel"
import Pagination from "@/components/Pagination"

// 引入MockServer.js ---mock数据
import '@/mock/mockServer';

// 引入swiper样式
import "swiper/css/swiper.css";

import { MessageBox } from 'element-ui';

// 引入懒加载
import VueLazyLoad from 'vue-lazyload';

// 第一个参数：全局组件的名字 第二个参数：哪一个组件
Vue.component(TypeNav.name, TypeNav);
Vue.component(Carsousel.name, Carsousel);
Vue.component(Pagination.name, Pagination);

// elementUI注册组件
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;

// 引入路由
import router from './router';

// 引入仓库
import store from './store';

// 统一接口api文件夹里面全部请求函数
import * as API from '@/api';

// 注册插件 
Vue.use(VueLazyLoad, {
  // 设置懒加载默认图片
  loading: require('@/assets/img/lou.jpg')
})

// 引入表单校验插件
import "@/plugins/validate";

new Vue({
  render: h => h(App),
  // 全局事件总线$bus配置
  beforeCreate() {
    Vue.prototype.$bus = this;
    Vue.prototype.$API = API;
  },
  // 注册路由
  router,
  // 注册仓库
  store
}).$mount('#app')
