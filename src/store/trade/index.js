import { reqAddressInfo, reqOrderInfo } from '@/api'

const state = {
    addressInfo: [],
    orderInfo: {}
};
const mutations = {
    GETUSERADDRESS(state, addressInfo) {
        state.addressInfo = addressInfo;
    },
    GETORDERINFO(state, orderInfo) {
        state.orderInfo = orderInfo;
    }
};
const actions = {
    // 获取用户地址信息
    async getUserAddress({ commit }) {
        let result = await reqAddressInfo();
        if (result.code == 200) {
            commit("GETUSERADDRESS", result.data);
            return 'ok';
        }
    },
    // 获取订单商品清单数据
    async getOrderInfo({ commit }) {
        let result = await reqOrderInfo();
        console.log(result);
        if (result.code == 200) {
            commit("GETORDERINFO", result.data);
        }
    }
};
const getters = {};
export default {
    state,
    mutations,
    actions,
    getters
}