<template>
    <div class="sticky">
        <Header />
    </div>
    <div class="content">
        <router-view />
    </div>
    <Snackbar />
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
import { useStore } from "vuex";
import Header from "@/components/Header.vue";
import Snackbar from "@/components/Snackbar.vue";

export default defineComponent({
    name: "App",
    props: {
        msg: {
            type: String,
            required: false
        }
    },
    components: {
        Header,
        Snackbar
    },
    setup() {
        const store = useStore();
        store.dispatch("getUserData");
    }
});
</script>
