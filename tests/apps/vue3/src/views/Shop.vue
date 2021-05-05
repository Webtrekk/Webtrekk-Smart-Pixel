<template>
    <div>
        <h2>{{ content.title }}</h2>
        <p v-html="content.content"></p>
        <ProductList v-bind:products="products" />
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ProductList from "@/components/ProductList.vue";
import { getFixtureData } from "@/helpers/fixture";

export default defineComponent({
    name: "Shop",
    data() {
        return {
            content: {},
            products: []
        };
    },
    components: {
        ProductList
    },
    beforeCreate() {
        getFixtureData("pages/slug/shop", data => {
            this.content = data[0];
        });
        getFixtureData("products", data => {
            this.products = data;
        });
    }
});
</script>
