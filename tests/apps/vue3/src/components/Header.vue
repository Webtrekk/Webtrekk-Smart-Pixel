<template>
    <header>
        <nav>
            <ul>
                <li><router-link to="/">Home</router-link></li>
                <li><router-link to="Shop">Shop</router-link></li>
                <li><router-link to="Contact">Contact</router-link></li>
                <li class="header right"><Cart /></li>
                <li class="header right"><Account /></li>
                <li class="header right"><router-link to="About">About</router-link></li>
            </ul>
        </nav>
    </header>
</template>

<style>
nav a.router-link-exact-active {
    color: #42b983;
}
</style>

<script lang="ts">
import { defineComponent } from "vue";
import Account from "@/components/Account.vue";
import Cart from "@/components/Cart.vue";

export default defineComponent({
    name: "Header",
    components: {
        Account,
        Cart
    }
});
</script>
