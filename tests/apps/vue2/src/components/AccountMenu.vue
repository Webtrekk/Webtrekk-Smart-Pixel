<template>
    <div>
        <li class="header right logout" v-if="!isLoggedOut" v-on:click="logout">
            Logout
        </li>
        <li class="header right" v-if="isLoggedOut">
            <router-link class="headerLink" to="/login">Register / Login</router-link>
        </li>
        <li class="header right" v-else>
            <router-link class="headerLink" to="/account">Account</router-link>
        </li>
    </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
    name: "AccountMenu",
    data() {
        return {};
    },
    computed: {
        ...mapGetters(["isLoggedOut"]),
    },
    methods: {
        ...mapActions(["logout"]),
    },
};
</script>
