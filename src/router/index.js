// 配置路由
import Vue from "vue";
import VueRouer from "vue-router";
import routes from './routes'

// 使用插件
Vue.use(VueRouer);

// 引入store
import store from "@/store"

// 先把VueRouter原型对象的push，先保存一份
let originPush = VueRouer.prototype.push

// 重写push|replace
// 第一个参数：告诉原来push方法，你往哪里跳转（传递哪些参数）
// 第二个参数：成功的回调
// 第三个参数：失败的回调
// call | apply区别
// 相同点：都可以调用一次，都可以篡改函数的上下文一次
// 不同点：call与apply传递参数；call传递参数用逗号隔开，apply方法执行，传递数组
VueRouer.prototype.push = function (location, resolve, reject) {
    if (resolve && reject) {
        originPush.call(this, location, resolve, reject);
    } else {
        originPush.call(this, location, () => { }, () => { })
    }
}


// 配置路由
let router = new VueRouer({
    // 配置路由
    routes,
    // 滚动行为
    scrollBehavior(to, from, savedPosition) {
        // 返回的这个y=0，代表的滚动条在最上方
        return { y: 0 }
    }
})

// 全局守卫：前置守卫（在路由跳转之间进行判断）
router.beforeEach(async (to, from, next) => {
    // to：可以获取到路由跳转的那个路由信息
    // from：可以获取到从那个路由而来的信息
    // next：放行函数  next()放行 next(path)放行到指令路由  next(false)
    // next();
    // 用户登录了，才会有token，未登录一定不会有toke
    let token = store.state.user.token;
    // 用户信息
    let name = store.state.user.userInfo.name;
    // 用户已经登录情况
    if (token) {
        // 用户已经登录还想去login页面【不能去，停留在首页】
        if (to.path == '/login') {
            next('/home');
        } else {
            // 登录，去的不是login[home|search|detail|shopcart]
            // 如果用户名已有
            if (name) {
                next();
            } else {
                // 没有用户信息，派发action让仓库存储用户信息在跳转
                try {
                    // 获取用户信息成功
                    await store.dispatch("getUserInfo");
                    next();
                } catch (error) {
                    // token失效了，获取不到用户的信息 重新登录
                    // 清除token
                    await store.dispatch('userLogout');
                    next('/login');
                }
            }
        }
    } else {
        // 未登录：不能去交易、支付相关【pay|paysuccess】、不能去个人中心
        // 未登录去上面这些路由 --登录
        let toPath = to.path;
        if (toPath.indexOf('/trade') != -1 || toPath.indexOf('/pay') != -1 || toPath.indexOf('/center') != -1) {
            // 把未登录时向去而没有去成的信息，存储于地址栏中【路由】
            next('/login?redirect=' + toPath);
        } else {
            // 去的不是上面这些路由 -- 放行
            next();
        }

    }

})

export default router;