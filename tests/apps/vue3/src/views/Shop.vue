<template>
    <div>
        <h2>{{ content.title }}</h2>
        <p v-html="content.content"></p>
        <ProductList v-bind:products="products" />
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { nextTick } from "vue";
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
    mounted() {
        getFixtureData("pages/slug/shop").then(data => {
            this.content = data[0];
        });
        getFixtureData("products").then(data => {
            this.products = data;
            nextTick(() => {
                this.$webtrekk.extension("action", "reload");
            });
        });
    }
});
</script>
