<template>
    <li class="header right logout" v-if="!isLoggedOut" v-on:click="logout">
        Logout
    </li>
    <li class="header right" v-if="isLoggedOut">
        <router-link to="/login">Register / Login</router-link>
    </li>
    <li class="header right" v-else>
        <router-link to="/account">Account</router-link>
    </li>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapGetters, mapActions } from "vuex";
export default defineComponent({
    name: "AccountMenu",
    data() {
        return {};
    },
    computed: {
        ...mapGetters(["isLoggedOut"])
    },
    methods: {
        ...mapActions(["logout"])
    }
});
</script>
