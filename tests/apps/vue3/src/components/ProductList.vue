<template>
    <div class="productlist" v-for="product in products" :key="product.id">
        <ProductPreview :product="product" />
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ProductPreview from "@/components/ProductPreview.vue";

export default defineComponent({
    name: "ProductList",
    props: {
        products: {
            type: Array,
            required: false
        }
    },
    components: {
        ProductPreview
    }
});
</script>

<style></style>
