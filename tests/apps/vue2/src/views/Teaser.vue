<template>
    <div>
        <div class="teaser" ref="teaser1">
            <router-link to="/">
                <h1>This is a teaser</h1>
            </router-link>
        </div>
        <p>Scroll down to find another teaser.</p>

        <div class="teaser teaser-bottom" ref="teaser2">
            <router-link to="/">
                <h1>This is another teaser</h1>
            </router-link>
        </div>
    </div>
</template>

<script>
import Vue from "vue";
export default {
    name: "Teaser",
    mounted() {
        Vue.nextTick(() => {
            const teaserElements = [this.$refs.teaser1, this.$refs.teaser2];
            const teaserData = teaserElements.map((teaser, index) => {
                return {
                    selector: teaser,
                    data: {
                        name: "Teaser " + index,
                        rank: index === 0 ? "header" : "bottom",
                        content: "Teasertest",
                        variant: "demo",
                    },
                    conversion: {
                        type: "click",
                        goal: "order",
                        value: "10%",
                    },
                };
            });
            this.$webtrekk.extension("teaser_tracking", "add", teaserData);
        });
    },
};
</script>
