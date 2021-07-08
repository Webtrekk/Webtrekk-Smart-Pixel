<template>
    <div>
        <div class="productlist" v-for="product in products" :key="product.id">
            <ProductPreview :product="product" />
        </div>
    </div>

</template>

<script>
import ProductPreview from "@/components/ProductPreview.vue";

export default {
    name: "ProductList",
    props: {
        products: {
            type: Array,
            required: false,
        },
    },
    components: {
        ProductPreview,
    },
};
</script>

<style></style>
