<template>
    <div v-if="product.length === 0">
        <p>Loading product data...</p>
        <button v-on:click="getProduct">getp</button>
    </div>
    <div v-else>
        <h1>{{ product[0].name }}</h1>
        <img :src="product[0].imageUrl" :alt="product[0].name" />
        <p>{{ product[0].description }}</p>
        <p>
            <small>SKU: {{ product[0].sku }}</small>
        </p>
        <p>
            <strong>Price: ${{ product[0].price }}</strong>
        </p>
        <form>
            <input type="number" name="quantity" min="1" v-model="quantity" />
            <button type="submit" v-on:click.prevent="addToCartHandler">
                Add to cart
            </button>
        </form>
    </div>
</template>
<script>
import { getFixtureData } from "@/helpers/fixture";

import { mapGetters, mapActions } from "vuex";

export default {
    name: "Product",
    components: {},
    data() {
        return {
            product: [],
            quantity: 1,
            webtrekk: {
                page: {
                    parameter: {
                        1: "Single Product",
                    },
                },
            },
        };
    },
    computed: {
        ...mapGetters(["isLoggedOut", "userData"]),
    },
    methods: {
        ...mapActions(["addToCart"]),
        getProduct() {
            const productId = this.$route.params.id;
            getFixtureData(`products/id/${productId}`).then((product) => {
                this.$webtrekk.product("view", {
                    id: product[0].id + "",
                    cost: product[0].price,
                    quantity: 1,
                });
                this.$webtrekk.track();
                this.product = product;
            });
        },
        addToCartHandler() {
            this.addToCart({
                ...this.product[0],
                quantity: this.quantity,
            });
        },
    },
    created() {
        this.$webtrekk.deactivateAutoTracking = true;
        this.getProduct();
    },
};
</script>
