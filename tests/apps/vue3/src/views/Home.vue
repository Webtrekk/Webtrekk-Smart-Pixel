<template>
    <div class="home">
        <h2>{{ content.title }}</h2>
        <p v-html="content.content"></p>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { getFixtureData } from "@/helpers/fixture";

export default defineComponent({
    name: "Home",
    data() {
        return {
            content: {}
        };
    },
    beforeCreate() {
        getFixtureData("pages/slug/home").then(data => {
            this.content = data[0];
        });
    }
});
</script>
