import { createStore } from "vuex";
import { get, post } from "@/helpers/request";
import Cart from "@/components/Cart.vue";
import router from "@/router/index";

interface Cart {
    id: number;
    sum: number;
    img: string;
    name: string;
    price: number;
    sku: string;
    quantity: number;
}

export default createStore({
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
            commit("SET_CART_MENU", true);
        },
        closeCart({ commit }) {
            commit("SET_CART_MENU", false);
        },
        getCart({ commit }) {
            get("cart").then(data => {
                commit("SET_CART", data);
            });
        },
        addToCart({ commit, dispatch }, data) {
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
                        dispatch("getUserData");
                        router.push("account");
                    } else {
                        dispatch("displayMessage", "Wrong credetials");
                    }
                }
            );
        },
        logout({ dispatch }) {
            get("user/logout").then(() => {
                dispatch("displayMessage", "You successfully logged out!");
                dispatch("getUserData");
                router.push("login");
            });
        },
        register({ dispatch }, data) {
            post("user/register", data).then(r => {
                if (r?.token) {
                    dispatch("getUserData");
                    dispatch("displayMessage", "Welcome " + data.firstName);
                    router.push("account");
                }
            });
        },
        addOrder({ dispatch }) {
            get("cart/order").then(() => {
                dispatch("closeCart");
                dispatch("getCart");
                router.push("/thankyou");
            });
        }
    },
    getters: {
        cartAmount: state =>
            state.cart
                .map((c: Cart) => c.quantity)
                .reduce((a, b) => a + b, 0)
                .toFixed(0),
        cartIsOpen: state => state.cartIsOpen,
        cart: state => state.cart,
        cartSum: state =>
            state.cart
                .map((c: Cart) => c.sum)
                .reduce((a, b) => a + b, 0)
                .toFixed(2),
        isLoggedOut: state => !state.userData,
        userData: state => state.userData,
        snackbar: state => state.snackbar
    },
    modules: {}
});
