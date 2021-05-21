import { createStore } from "vuex";
import Cart from "@/components/Cart.vue";

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
        cartIsOpen: true
    },
    mutations: {
        SET_CART_MENU(state, data) {
            state.cartIsOpen = data;
        },
        SET_CART(state, data) {
            state.cart = data;
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
            fetch("https://" + location.hostname + ":4001/cart",{
                method: 'GET',
                credentials: "include",
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(r => {
                    return r.json();
                })
                .then(data => {
                    commit("SET_CART", data);
                });
        },
        addToCart({ commit }, data) {
            fetch("https://" + location.hostname + ":4001/cart/add", {
                method: 'POST',
                credentials: "include",
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
                .then(r => {
                    return r.json();
                })
                .then(data => {
                    commit("SET_CART", data);
                });
        },
        removeFromCart({ commit }, data) {
            fetch("https://" + location.hostname + ":4001/cart/delete", {
                method: 'POST',
                credentials: "include",
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
                .then(r => {
                    return r.json();
                })
                .then(data => {
                    commit("SET_CART", data);
                });
        }
    },
    getters: {
        cartAmount:  state =>
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
                .toFixed(2)
    },
    modules: {}
});
