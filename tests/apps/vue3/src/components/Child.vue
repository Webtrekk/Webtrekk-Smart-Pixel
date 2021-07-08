<template>
    <div></div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
    name: "Child",
    data() {
        return {
            webtrekk: {
                page: {
                    parameter: {
                        2: "Child"
                    }
                }
            }
        };
    }
});
</script>
