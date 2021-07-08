<template>
    <h1>Content Engagement</h1>
    <div class="content-engagement" style="white-space: pre-wrap" ref="content">
        {{ lorem }}
    </div>
</template>

<script lang="ts">
import { defineComponent, nextTick } from "vue";
import lorem from "./../../../lorem.js";

export default defineComponent({
    name: "ContentEngagement",
    data() {
        return { lorem };
    },
    mounted() {
        nextTick(() => {
            const contentEngagementData = {
                selector: this.$refs.content,
                name: "Demo content",
                config: {
                    percentageStepsInAnalytics: 5,
                    sendContentEngagement: 1,
                    percentageReached: 25,
                    secondsReached: 30,
                    largeBrowserResolution: 1080,
                    largeBrowserSeconds: 2,
                    mediumBrowserResolution: 700,
                    mediumBrowserSeconds: 2,
                    smallBrowserResolution: 400,
                    smallBrowserSeconds: 2
                }
            };
            this.$webtrekk.extension(
                "content_engagement",
                "add",
                contentEngagementData
            );
        });
    }
});
</script>
