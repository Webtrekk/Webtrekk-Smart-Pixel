import { createStore, Store } from "vuex";
import { get, post } from "@/helpers/request";
import Cart from "@/components/Cart.vue";
import router from "@/router/index";
import App from "../main";
import { InjectionKey } from "vue";

interface Cart {
    id: number;
    sum: number;
    img: string;
    name: string;
    price: number;
    sku: string;
    quantity: number;
}

export interface State {
    cart: Cart[];
    userData: boolean | Userdata;
    cartIsOpen: boolean;
    snackbar: false | string;
}
export const key: InjectionKey<Store<State>> = Symbol();

type Userdata =
    | false
    | {
          name: string;
          firstName: string;
          lastName: string;
      };

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
            App.$webtrekk.action({ name: "Open cart" });
            App.$webtrekk.trackAction();
            commit("SET_CART_MENU", true);
        },
        closeCart({ commit }) {
            App.$webtrekk.action({ name: "Close cart" });
            App.$webtrekk.trackAction();
            commit("SET_CART_MENU", false);
        },
        getCart({ commit }) {
            get("cart").then(data => {
                commit("SET_CART", data);
            });
        },
        addToCart({ commit, dispatch }, data) {
            const q = data.quantity ? data.quantity : 1;
            App.$webtrekk.product("basket", {
                id: data.id + "",
                cost: parseFloat((data.price * q).toFixed(2)),
                quantity: q
            });
            App.$webtrekk.trackAction();
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
                        App.$webtrekk.customer(name);
                        App.$webtrekk.action({ name: "Login" });
                        App.$webtrekk.trackAction();
                        dispatch("getUserData");
                        router.push("account");
                    } else {
                        App.$webtrekk.action({ name: "Wrong login" });
                        App.$webtrekk.trackAction();
                        dispatch("displayMessage", "Wrong credentials");
                    }
                }
            );
        },
        logout({ dispatch }) {
            get("user/logout").then(() => {
                App.$webtrekk.action({ name: "Logout" });
                App.$webtrekk.trackAction();
                dispatch("displayMessage", "You successfully logged out!");
                dispatch("getUserData");
                router.push("login");
            });
        },
        register({ dispatch }, data) {
            post("user/register", data).then(r => {
                if (r?.token) {
                    App.$webtrekk.customer(data.name);
                    App.$webtrekk.action({ name: "Register" });
                    App.$webtrekk.trackAction();
                    dispatch("getUserData");
                    dispatch("displayMessage", "Welcome " + data.firstName);
                    router.push("account");
                }
            });
        },
        addOrder({ dispatch, getters }) {
            get("cart/order").then(e => {
                App.$webtrekk.page("Thank you");
                App.$webtrekk.customer(getters.userData.name);
                App.$webtrekk.order({
                    value: e.data.orderValue,
                    id: e.orderId + ""
                });
                e.data.products.forEach(product => {
                    App.$webtrekk.product("confirmation", {
                        id: product.id + "",
                        quantity: product.quantity,
                        cost: product.sum
                    });
                });
                App.$webtrekk.trackPage();
                App.$webtrekk.page("");
                App.$webtrekk.deactivateAutoTracking = true;
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
