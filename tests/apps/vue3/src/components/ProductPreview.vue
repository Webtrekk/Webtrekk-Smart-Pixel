<template>
    <div class="card">
        <img :src="product.imageUrl" :alt="product.name + 'title'" style="width:100%">
        <h1>{{ product.name }}</h1>
        <p class="price">${{product.price}}</p>
        <p>{{product.description}}</p>
        <p><button v-on:click="()=>{this.addToCart({name: product.name, price: product.price, id:product.id, sku: product.sku, img: product.imageUrl})}">Add to Cart</button></p>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapActions } from "vuex";
export default defineComponent({
    name: "ProductPreview",
    props: {
        product: {
            type: Object,
            required: true
        }
    },
    methods: {
        ...mapActions(['addToCart'])
    }
});
</script>
