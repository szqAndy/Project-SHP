// 引入路由组件
import Home from '@/pages/Home'
import Search from '@/pages/Search';
import Login from '@/pages/Login';
import Register from '@/pages//Register';
import Detail from '@/pages/Detail';
import AddCartSuccess from '@/pages/AddCartSuccess';
import ShopCart from '@/pages/ShopCart';
import Trade from "@/pages/Trade";
import Pay from "@/pages/Pay"
import PaySuccess from '@/pages/PaySuccess'
import Center from '@/pages/Center'

// 引入二级组件
import MyOrder from '@/pages/Center/myOrder';
import GroupOrder from '@/pages/Center/groupOrder';

export default [
    {
        path: "/",
        redirect: "/home"
    },
    {
        path: "/home",
        component: Home,
        meta: {
            show: true
        }
    },
    {
        path: "/search/:keyword?",
        component: Search,
        meta: {
            show: true
        },
        name: "search"
    },
    {
        path: "/login",
        component: Login,
        meta: {
            show: false
        }
    },
    {
        path: "/register",
        component: Register,
        meta: {
            show: false
        }
    },
    {
        path: "/detail/:skuid",
        component: Detail,
        meta: {
            show: true
        }
    },
    {
        path: "/addCartSuccess",
        name: "addCartSuccess",
        component: AddCartSuccess,
        meta: {
            show: true
        }
    },
    {
        path: "/shopCart",
        name: "shopCart",
        component: ShopCart,
        meta: {
            show: true
        }
    },
    {
        path: "/trade",
        name: "Trade",
        component: Trade,
        meta: {
            show: true
        },
        // 路由独享守卫
        beforeEnter: (to, from, next) => {
            // 去交易页面，必须是从购物车而来
            if (from.path == "/shopCart") {
                next();
            } else {
                // 其他路由组件而来，停留在当前
                next(false);
            }
        }
    },
    {
        path: "/pay",
        name: "Pay",
        component: Pay,
        meta: {
            show: true
        },
        beforeEnter: (to, from, next) => {
            if (from.path == "/trade") {
                next();
            } else {
                next(false);
            }
        }
    },
    {
        path: "/paysuccess",
        name: "PaySuccess",
        component: PaySuccess,
        meta: {
            show: true
        }
    },
    {
        path: "/center",
        name: "Center",
        component: Center,
        meta: {
            show: true
        },
        // 二级路由组件
        children: [
            {
                path: 'center',
                redirect: '/center/myorder'
            },
            {
                path: 'myorder',
                component: MyOrder
            },
            {
                path: 'grouporder',
                component: GroupOrder
            }
        ]
    }
]