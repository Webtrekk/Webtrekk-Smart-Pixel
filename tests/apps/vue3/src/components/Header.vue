<template>
    <header>
        <nav>
            <ul>
                <li><router-link to="/">Home</router-link></li>
                <li><router-link to="/shop">Shop</router-link></li>
                <li><router-link to="/teaser">Teaser</router-link></li>
                <li>
                    <router-link to="/content-engagement"
                        >Content Engagement</router-link
                    >
                </li>
                <li><router-link to="/directive">Directive</router-link></li>
                <li class="header right"><Cart /></li>
                <AccountMenu />
                <li class="header right">
                    <router-link to="/about">About</router-link>
                </li>
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
import AccountMenu from "@/components/AccountMenu.vue";
import Cart from "@/components/Cart.vue";

export default defineComponent({
    name: "Header",
    components: {
        AccountMenu,
        Cart
    }
});
</script>
