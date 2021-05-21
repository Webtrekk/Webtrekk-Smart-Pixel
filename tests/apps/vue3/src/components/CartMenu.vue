<template>
    <div v-if="cartIsOpen" id="myModal" class="modal">
        <div class="modal-content">
            <div class="modal-header">
                <span class="close" v-on:click="closeCart">&times;</span>
                <h2>You have {{cartAmount}} items in your cart</h2>
            </div>
            <div >

                <table class="cartTable">
                    <tr>
                        <th></th>
                        <th>Product</th>
                        <th>Price</th>
                        <th></th>
                        <th>Quantity</th>
                        <th>Quantity</th>
                        <th>Sum</th>
                    </tr>
                <CartItem v-for="product in cart" :key="product.id" :product="product" />
                    <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td>${{ cartSum }}</td>
                    </tr>
                </table>
            </div>
            <div class="modal-footer">
                <h3>Mapp Intelligence demo store</h3>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import CartItem from "@/components/CartItem.vue";
import { mapGetters, mapActions } from "vuex";
export default defineComponent({
    name: "CartMenu",
    components: {
        CartItem
    },
    data() {
        return {
        };
    },
    computed: {
        ...mapGetters([
            'cartAmount',
            "cartIsOpen",
            "cart",
            "cartSum"
        ])
    },
    methods: {
        ...mapActions([
            'closeCart', 'getCart', 'addToCart'
        ])
    }
});
</script>