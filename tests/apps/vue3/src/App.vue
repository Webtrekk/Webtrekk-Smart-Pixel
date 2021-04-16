<template>
    <Header />
    <router-view />
</template>

<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}

h2 {
    font-size: x-large !important;
    font-weight: bold !important;
}
</style>

<script lang="ts">
import { defineComponent } from "vue";
import Header from "@/components/Header.vue";

export default defineComponent({
    name: "App",
    props: {
        msg: {
            type: String,
            required: false
        }
    },
    components: {
        Header
    }
});
</script>
