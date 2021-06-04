<template>
    <table>
        <tr>
            <th>ID</th>
            <th></th>
            <th>Name</th>
            <th>SKU</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Sum</th>
        </tr>
        <tr v-for="product in products" :key="product.id">
            <td>{{ product.id }}</td>
            <td>
                <img height="100" :src="product.imageUrl" :alt="product.name" />
            </td>
            <td>{{ product.name }}</td>
            <td>{{ product.sku }}</td>
            <td>{{ product.quantity }}</td>
            <td>{{ product.price }}</td>
            <td>{{ product.sum }}</td>
        </tr>
    </table>
</template>
<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
    name: "OrderProductList",
    props: {
        products: {
            type: Array,
            required: false
        }
    }
});
</script>
