<template>
    <div id="app">
        <div class="sticky">
            <Header />
        </div>
        <div class="content">
            <router-view />
        </div>
        <Snackbar />
    </div>
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

<script>
import Header from "@/components/Header.vue";
import Snackbar from "@/components/Snackbar.vue";
import { mapActions } from "vuex";

export default {
    name: "App",
    components: {
        Header,
        Snackbar,
    },
    methods: {
        ...mapActions(["getUserData"]),
    },
    created() {
        this.getUserData();
    },
};
</script>
