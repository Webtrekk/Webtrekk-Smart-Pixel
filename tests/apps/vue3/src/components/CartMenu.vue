<template>
    <div v-if="cartIsOpen" id="myModal" class="modal">
        <div class="modal-content">
            <div class="modal-header">
                <span class="close" v-on:click="closeCart">&times;</span>
                <h2>You have {{ cartAmount }} items in your cart</h2>
            </div>
            <div v-if="cartAmount > 0">
                <table class="cartTable">
                    <tr>
                        <th></th>
                        <th>Product</th>
                        <th>Price</th>
                        <th></th>
                        <th>Quantity</th>
                        <th></th>
                        <th>Sum</th>
                    </tr>
                    <CartItem
                        v-for="product in cart"
                        :key="product.id"
                        :product="product"
                    />
                </table>
            </div>
            <div v-else>
                <p>Your cart is empty</p>
            </div>
            <div class="modal-footer" v-if="cartAmount > 0">
                <p>${{ cartSum }}</p>
                <button
                    v-if="isLoggedOut"
                    type="submit"
                    v-on:click.prevent="
                        () => {
                            this.closeCart();
                            this.$router.push('login');
                        }
                    "
                >
                    Login or register to checkout
                </button>
                <button
                    id="addOrder"
                    v-else
                    type="submit"
                    v-on:click.prevent="addOrder"
                >
                    Order Items
                </button>
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
        return {};
    },
    computed: {
        ...mapGetters([
            "cartAmount",
            "cartIsOpen",
            "cart",
            "cartSum",
            "isLoggedOut"
        ])
    },
    methods: {
        ...mapActions(["closeCart", "getCart", "addToCart", "addOrder"])
    }
});
</script>
