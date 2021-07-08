<template>
    <div>
        <h2>{{ content.title }}</h2>
        <p v-html="content.content"></p>
        <Child />
    </div>
</template>

<script>
import { getFixtureData } from "@/helpers/fixture";
import Child from "@/components/Child.vue";

export default {
    name: "Home",
    components: {
        Child,
    },
    data() {
        return {
            content: {},
            webtrekk: {
                page: {
                    parameter: {
                        1: "Homepage",
                    },
                },
            },
        };
    },
    beforeCreate() {
        getFixtureData("pages/slug/home").then((data) => {
            this.content = data[0];
        });
    },
};
</script>
