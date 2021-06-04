<template>
    <div>
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
            content: {},
            webtrekk: {
                page: {
                    parameter: {
                        1: 'Homepage'
                    }
                }
            }
        };
    },
    beforeCreate() {
        getFixtureData("pages/slug/home").then(data => {
            this.content = data[0];
        });
    }
});
</script>
