<template>
    <router-link to="Account" v-if="loggedIn">Account</router-link>
    <router-link to="login" v-else>Register / Login</router-link>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
    name: "Account",
    data() {
        return {
            loggedIn: false
        };
    }
});
</script>
