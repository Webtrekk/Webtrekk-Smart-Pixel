<template>
    <div v-if="product.length === 0">
        <p>Loading product data...</p>
    </div>
    <div v-else>
        <h1>{{ product[0].name }}</h1>
        <img :src="product[0].imageUrl" :alt="product[0].name" />
        <p>{{ product[0].description }}</p>
        <p>
            <small>SKU: {{ product[0].sku }}</small>
        </p>
        <p>
            <strong>Price: ${{ product[0].price }}</strong>
        </p>
        <form>
            <input type="number" name="quantity" min="1" v-model="quantity" />
            <button
                type="submit"
                v-on:click.prevent="
                    () => {
                        this.addToCart({
                            ...product[0],
                            quantity: this.quantity
                        });
                    }
                "
            >
                Add to cart
            </button>
        </form>
    </div>
</template>
<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { getFixtureData } from "@/helpers/fixture";
import App from "./../main";

import { mapGetters, mapActions } from "vuex";

interface ProductDataWrapper {
    value: ProductData[];
}
interface ProductData {
    name: string;
    price: number;
    description: string;
    sku: string;
    id: number;
}

export default defineComponent({
    name: "Product",
    components: {},
    data() {
        return {
            quantity: 1,
            webtrekk: {
                page: {
                    parameter: {
                        1: "Single Product"
                    }
                }
            }
        };
    },
    computed: {
        ...mapGetters(["isLoggedOut", "userData"])
    },
    methods: {
        ...mapActions(["addToCart"])
    },
    setup() {
        App.$webtrekk.deactivateAutoTracking = true;
        const route = useRoute();
        const productId = route.params.id;
        const product: ProductDataWrapper = ref([]);
        const getProduct = async () => {
            product.value = await getFixtureData(`products/id/${productId}`);
            App.$webtrekk.product("view", {
                id: product.value[0].id + "",
                cost: product.value[0].price,
                quantity: 1
            });
            App.$webtrekk.track();
        };
        onMounted(getProduct);
        return {
            product
        };
    }
});
</script>
