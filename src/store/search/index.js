import { reqGetSearchInfo } from "@/api";
// state：仓库存储数据的地方
const state = {
    // 仓库初始化
    searchList: {}
};

// mutations：修改state的唯一手段
const mutations = {
    GETSEARCHLIST(state, searchList) {
        state.searchList = searchList
    }
};

// action：处理action，可以书写自己的业务逻辑，也可以处理异步
const actions = {
    async getSearchList({ commit }, params = {}) {
        // 当前这个reqGetSearchInfo这函数在调用获取服务器数据时，至少传递一个参数（空对象）
        // parmas形参：是当用户派发action时，第二个参数传递过来的，至少是一个空对象
        let result = await reqGetSearchInfo(params)
        if (result.code == 200) {
            commit('GETSEARCHLIST', result.data);
        }
    }
};

// getters：理解为计算属性，用于简化仓库数据，让组件获取仓库的数据更加方便
// 计算属性：在项目当中，为了简化数据而来。
const getters = {
    // 当前形参state，当前仓库中的·state，并非大仓库中的那个state
    goodsList(state) {
        // state.searchList.goodsList如果服务器数据回来了，没问题是一个数组
        // 假如网络不给力|没有网络state.searchList.goodsList应该返回的是undefined
        // 计算新的属性的属性值至少给返回来的是一个数组
        return state.searchList.goodsList || [];
    },
    trademarkList(state) {
        return state.searchList.trademarkList;
    },
    attrsList(state) {
        return state.searchList.attrsList;
    }
};

export default {
    state,
    mutations,
    actions,
    getters
}