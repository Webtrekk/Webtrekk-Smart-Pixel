<template>
    <div>
        <h1>Directive tests</h1>
        <p v-webtrekk.deactivateAutoTracking="true">Deactivate auto tracking</p>
        <p>Current directive: {{ activeDirective }}</p>

        <button
            v-for="directive in directiveList"
            :key="directive"
            class="button"
            :id="directive"
            v-on:click="clickHandler(directive)"
        >
            {{ directive }}
        </button>

        <div v-if="activeDirective === 'pageDir'">
            <p v-webtrekk.page="{ parameter: { 1: 'Directive page test' } }">
                Page
            </p>
            <p v-webtrekk.customer="'Directive customer test'">Customer</p>
            <p
                v-webtrekk.session="{
                    parameter: { 1: 'Directive session test' },
                }"
            >
                Session
            </p>
            <p
                v-webtrekk.campaign.trackPage="{
                    parameter: { 1: 'Directive campaign test' },
                }"
            >
                campaign
            </p>
        </div>

        <div
            v-if="activeDirective === 'noModifiers'"
            v-webtrekk="{
                page: {
                    parameter: {
                        1: 'no modifiers',
                    },
                },
                customer: {
                    id: 'no mod customer',
                    city: 'testcity',
                },
                track: true,
            }"
        >
            Product view
        </div>

        <div
            v-if="activeDirective === 'productViewDir'"
            v-webtrekk.product.view.track="{
                id: 'Directive product view test',
                cost: 99.9,
                quantity: 1,
            }"
        >
            Product view
        </div>
        <div
            v-if="activeDirective === 'productBasketDir'"
            v-webtrekk.product.basket.track="{
                id: 'Directive product basket test',
                cost: 99.9,
                quantity: 1,
            }"
        >
            Product basket
        </div>
        <div
            v-if="activeDirective === 'productConfirmationDir'"
            v-webtrekk.product.track="{
                id: 'Directive product confirmation test',
                cost: 99.9,
                status: 'confirmation',
                quantity: 1,
            }"
        >
            Product confirmation
        </div>
        <div
            v-if="activeDirective === 'productListDir'"
            v-webtrekk.product.trackAction="{
                id: 'Directive product list test',
                cost: 99.9,
                status: 'list',
                quantity: 1,
            }"
        >
            Product list directive
        </div>
        <div
            v-if="activeDirective === 'productsDir'"
            v-webtrekk.products.basket.track="[
                {
                    id: 'product_1',
                    cost: 99.9,
                    quantity: 9,
                },
                {
                    id: 'product_2',
                    cost: 49.9,
                    quantity: 3,
                },
            ]"
        >
            Several Products
        </div>

        <div
            v-if="activeDirective === 'productsDirNoStatus'"
            v-webtrekk.products.track="[
                {
                    id: 'product_1',
                    cost: 99.9,
                    quantity: 9,
                },
                {
                    id: 'product_2',
                    cost: 49.9,
                    quantity: 3,
                },
            ]"
        >
            Several Products without status
        </div>

        <div v-if="activeDirective === 'actionDir'">
            <p v-webtrekk.action="'Directive action test'">Action</p>
            <p
                v-webtrekk.action.trackAction="{
                    parameter: { 1: 'Action parameter' },
                }"
            >
                Action parameter
            </p>
        </div>

        <div v-if="activeDirective === 'teaserDir'">
            <a
                v-webtrekk.teaser_tracking="{
                    data: {
                        name: 'Directive teaser test',
                        rank: 'Main Page Banner',
                        content: 'Women Collection',
                        variant: 'campaign',
                    },
                    conversion: {
                        type: 'view',
                        goal: 'order',
                        value: '10%',
                    },
                }"
                href="#"
                >Teaser</a
            >
        </div>
        <div v-if="activeDirective === 'teaserWithSelectorDir'">
            <p
                v-webtrekk.teaser_tracking="{
                    selector: '#teaserElement',
                    data: {
                        name: 'Directive teaser with selector test',
                        rank: 'Main Page Banner',
                        content: 'Women Collection',
                        variant: 'campaign',
                    },
                    conversion: {
                        type: 'view',
                        goal: 'order',
                        value: '10%',
                    },
                }"
            >
                Element with teaser directive
            </p>
            <a v-if="showTeaser" id="teaserElement" href="#">Teaser element</a>
        </div>
        <div
            v-if="activeDirective === 'productListExtensionDir'"
            v-webtrekk.product_list_tracking="{
                data: {
                    id: 'Directive productlist extension test',
                    position: 1,
                    cost: 49.99,
                    quantity: 1,
                },
            }"
        >
            product list extension
        </div>
        <div
            v-if="activeDirective === 'contentEngagementDir'"
            v-webtrekk.content_engagement="{
                name: 'Directive content engagement test',
                config: {
                    percentageStepsInAnalytics: 5,
                    sendContentEngagement: 1,
                    percentageReached: 100,
                    secondsReached: 30,
                    largeBrowserResolution: 1080,
                    largeBrowserSeconds: 1,
                    mediumBrowserResolution: 700,
                    mediumBrowserSeconds: 1,
                    smallBrowserResolution: 400,
                    smallBrowserSeconds: 1,
                },
            }"
        >
            content engagement
        </div>
    </div>
</template>
<script>
export default {
    name: "Directive",
    created() {
        this.$webtrekk.extension("");
    },
    data() {
        return {
            activeDirective: "none",
            showTeaser: false,
            directiveList: [
                "pageDir",
                "noModifiers",
                "productViewDir",
                "productBasketDir",
                "productConfirmationDir",
                "productListDir",
                "productsDir",
                "productsDirNoStatus",
                "actionDir",
                "teaserDir",
                "teaserWithSelectorDir",
                "productListExtensionDir",
                "contentEngagementDir",
            ],
        };
    },
    methods: {
        clickHandler: function (dir) {
            this.activeDirective = dir;
            if (dir === "teaserWithSelectorDir") {
                window.setTimeout(() => {
                    this.showTeaser = true;
                }, 1000);
            }
        },
    },
};
</script>
