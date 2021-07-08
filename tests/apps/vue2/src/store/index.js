import Vue from "vue";
import Vuex from "vuex";
import {get, post} from "../../../vue2/src/helpers/request";
import router from "../../../vue2/src/router";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        cart: [],
        cartIsOpen: false,
        userData: false,
        snackbar: false
    },
    mutations: {
        SET_CART_MENU(state, data) {
            state.cartIsOpen = data;
        },
        SET_CART(state, data) {
            state.cart = data;
        },
        SET_SNACKBAR(state, data) {
            state.snackbar = data;
        },
        SET_USER(state, data) {
            state.userData = data;
        }
    },
    actions: {
        openCart({ commit }) {
            Vue.prototype.$webtrekk.action({ name: "Open cart" });
            Vue.prototype.$webtrekk.trackAction();
            commit("SET_CART_MENU", true);
        },
        closeCart({ commit }) {
            Vue.prototype.$webtrekk.action({ name: "Close cart" });
            Vue.prototype.$webtrekk.trackAction();
            commit("SET_CART_MENU", false);
        },
        getCart({ commit }) {
            get("cart").then(data => {
                commit("SET_CART", data);
            });
        },
        addToCart({ commit, dispatch }, data) {
            const q = data.quantity ? data.quantity : 1;
            Vue.prototype.$webtrekk.product("basket", {
                id: data.id + "",
                cost: parseFloat((data.price * q).toFixed(2)),
                quantity: q
            });
            Vue.prototype.$webtrekk.trackAction();
            post("cart/add", data).then(data => {
                commit("SET_CART", data);
                dispatch("displayMessage", "Product added to cart");
            });
        },
        removeFromCart({ commit }, data) {
            post("cart/delete", data).then(data => {
                commit("SET_CART", data);
            });
        },
        displayMessage({ commit }, message) {
            commit("SET_SNACKBAR", message);
            setTimeout(() => {
                commit("SET_SNACKBAR", false);
            }, 3000);
        },
        getUserData({ commit }) {
            get("user").then(response => {
                if (response?.name) {
                    commit("SET_USER", response);
                } else {
                    commit("SET_USER", false);
                }
            });
        },
        login({ dispatch }, { name, password }) {
            get("user/login/?name=" + name + "&password=" + password).then(
                r => {
                    if (r?.token) {
                        Vue.prototype.$webtrekk.customer(name);
                        Vue.prototype.$webtrekk.action({ name: "Login" });
                        Vue.prototype.$webtrekk.trackAction();
                        dispatch("getUserData");
                        router.push("account");
                    } else {
                        Vue.prototype.$webtrekk.action({ name: "Wrong login" });
                        Vue.prototype.$webtrekk.trackAction();
                        dispatch("displayMessage", "Wrong credentials");
                    }
                }
            );
        },
        logout({ dispatch }) {
            get("user/logout").then(() => {
                Vue.prototype.$webtrekk.action({ name: "Logout" });
                Vue.prototype.$webtrekk.trackAction();
                dispatch("displayMessage", "You successfully logged out!");
                dispatch("getUserData");
                router.push("login");
            });
        },
        register({ dispatch }, data) {
            post("user/register", data).then(r => {
                if (r?.token) {
                    Vue.prototype.$webtrekk.customer(data.name);
                    Vue.prototype.$webtrekk.action({ name: "Register" });
                    Vue.prototype.$webtrekk.trackAction();
                    dispatch("getUserData");
                    dispatch("displayMessage", "Welcome " + data.firstName);
                    router.push("account");
                }
            });
        },
        addOrder({ dispatch, getters }) {
            get("cart/order").then(e => {
                Vue.prototype.$webtrekk.page("Thank you");
                Vue.prototype.$webtrekk.customer(getters.userData.name);
                Vue.prototype.$webtrekk.order({
                    value: e.data.orderValue,
                    id: e.orderId + ""
                });
                e.data.products.forEach(product => {
                    Vue.prototype.$webtrekk.product("confirmation", {
                        id: product.id + "",
                        quantity: product.quantity,
                        cost: product.sum
                    });
                });
                Vue.prototype.$webtrekk.trackPage();
                Vue.prototype.$webtrekk.page("");
                Vue.prototype.$webtrekk.deactivateAutoTracking = true;
                dispatch("closeCart");
                dispatch("getCart");
                router.push("/thankyou");
            });
        }
    },
    getters: {
        cartAmount: state =>
            state.cart
                .map((c) => c.quantity)
                .reduce((a, b) => a + b, 0)
                .toFixed(0),
        cartIsOpen: state => state.cartIsOpen,
        cart: state => state.cart,
        cartSum: state =>
            state.cart
                .map((c) => c.sum)
                .reduce((a, b) => a + b, 0)
                .toFixed(2),
        isLoggedOut: state => !state.userData,
        userData: state => state.userData,
        snackbar: state => state.snackbar
    },
    modules: {}
});
