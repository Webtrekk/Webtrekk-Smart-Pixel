<template>
    <div class="snackbar" v-if="snackbar">{{ snackbar }}</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapGetters } from "vuex";
export default defineComponent({
    name: "Snackbar",
    data() {
        return {};
    },
    computed: {
        ...mapGetters(["snackbar"])
    }
});
</script>
