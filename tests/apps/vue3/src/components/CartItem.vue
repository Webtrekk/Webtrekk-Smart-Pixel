<template>
    <tr>
        <td>
            <img
                :src="product.imageUrl"
                :alt="product.name + 'title'"
                style="width:50px"
            />
        </td>
        <td>
            <p>{{ product.name }}</p>
        </td>
        <td>
            <p>${{ product.price }}</p>
        </td>
        <td>
            <button
                v-on:click="
                    () => {
                        this.removeFromCart({ ...product, quantity: 1 });
                    }
                "
                class="cart-quantity-button"
                type="button"
                name="button"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                >
                    <path d="M0 10h24v4h-24z" />
                </svg>
            </button>
        </td>
        <td>
            <p>{{ product.quantity }}</p>
        </td>

        <td>
            <button
                v-on:click="
                    () => {
                        this.addToCart({ ...product, quantity: 1 });
                    }
                "
                class="cart-quantity-button"
                type="button"
                name="button"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                >
                    <path d="M24 10h-10v-10h-4v10h-10v4h10v10h4v-10h10z" />
                </svg>
            </button>
        </td>
        <td>
            <p>${{ product.sum }}</p>
        </td>
    </tr>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapActions } from "vuex";
export default defineComponent({
    name: "Cart",
    data() {
        return {};
    },
    props: {
        product: {
            type: Object,
            required: false
        }
    },
    methods: {
        ...mapActions(["addToCart", "removeFromCart"])
    }
});
</script>
