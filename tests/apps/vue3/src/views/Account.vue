<template>
    <div>
        <h1>Account</h1>
        <p>Hello {{ userData.firstName }} {{ userData.lastName }}!</p>
        <p>Your username is: {{ userData.name }}</p>
        <h2>Your orders</h2>
        <hr />
        <div v-for="order in userData.orders" :key="order.id">
            <h3>Order ID: {{ order.orderId }}</h3>
            <OrderProductList :products="order.products" />
            <strong>Order Value: $ {{ order.orderValue }}</strong>
            <hr />
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import OrderProductList from "@/components/OrderProductList.vue";
import { mapGetters, useStore } from "vuex";

export default defineComponent({
    name: "Account",
    components: {
        OrderProductList
    },
    data() {
        return {
            content: {},
            webtrekk: {
                page: {
                    parameter: {
                        1: "Account"
                    }
                }
            }
        };
    },
    computed: {
        ...mapGetters(["isLoggedOut", "userData"])
    },
    setup() {
        const store = useStore();
        store.dispatch("getUserData");
    }
});
</script>
