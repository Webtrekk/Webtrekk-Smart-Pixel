<template>
    <div class="snackbar" v-if="snackbar">{{ snackbar }}</div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
    name: "Snackbar",
    data() {
        return {};
    },
    computed: {
        ...mapGetters(["snackbar"]),
    },
};
</script>
