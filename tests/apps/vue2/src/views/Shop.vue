<template>
    <div>
        <h2>{{ content.title }}</h2>
        <p v-html="content.content"></p>
        <ProductList v-bind:products="products" />
    </div>
</template>

<script>
import Vue from "vue";
import ProductList from "@/components/ProductList.vue";
import { getFixtureData } from "@/helpers/fixture";

export default {
    name: "Shop",
    data() {
        return {
            content: {},
            products: [],
        };
    },
    components: {
        ProductList,
    },
    mounted() {
        getFixtureData("pages/slug/shop").then((data) => {
            this.content = data[0];
        });
        getFixtureData("products").then((data) => {
            this.products = data;
            Vue.nextTick(() => {
                this.$webtrekk.extension("action", "reload");
                const productListData = this.products.map((product, index) => {
                    return {
                        selector: document.getElementById(
                            "product_" + product.id
                        ),
                        data: {
                            id: product.id + "",
                            position: index + 1,
                            cost: product.price,
                            quantity: 1,
                        },
                    };
                });
                this.$webtrekk.extension(
                    "product_list_tracking",
                    "add",
                    productListData
                );
            });
        });
    },
};
</script>
