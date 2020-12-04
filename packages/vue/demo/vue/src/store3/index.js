import app from '../main3';
import Vuex from 'vuex';
import webtrekkVuexPlugin from './webtrekk_vuex';

export default new Vuex.Store({
    state: {clicks: 0},
    getters: {
        getClicks: state => state.clicks
    },
    mutations: {
        ADD_CLICK(state, payload) {
            state.clicks = payload;
        },
        REMOVE_CLICK(state, payload) {
            state.clicks = payload;
        }
    },
    actions: {
        addClick({commit, getters}) {
            const newAmount = getters.getClicks + 1;
            app.config.globalProperties.$webtrekk.action({name: 'click added', parameter: {1: 'Overall clicks: ' + newAmount}});
            app.config.globalProperties.$webtrekk.track();
            commit('ADD_CLICK', newAmount);
        },
        removeClick({commit, getters}) {
            const newAmount = getters.getClicks - 1;
            commit('REMOVE_CLICK', newAmount);
        }
    },
    plugins: [webtrekkVuexPlugin]
});
