import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        name: "Home",
        component: Home,
    },
    {
        path: "/about",
        name: "About",
        component: () =>
            import(/* webpackChunkName: "about" */ "../views/About.vue"),
    },
    {
        path: "/shop",
        name: "Shop",
        component: () =>
            import(/* webpackChunkName: "shop" */ "../views/Shop.vue"),
    },
    {
        path: "/account",
        name: "Account",
        component: () =>
            import(/* webpackChunkName: "account" */ "../views/Account.vue"),
    },
    {
        path: "/login",
        name: "Login",
        component: () =>
            import(/* webpackChunkName: "login" */ "../views/Login.vue"),
    },
    {
        path: "/thankyou",
        name: "ThankYou",
        component: () =>
            import(/* webpackChunkName: "thanks" */ "../views/ThankYou.vue"),
    },
    {
        path: "/teaser",
        name: "Teaser",
        component: () =>
            import(/* webpackChunkName: "teaser" */ "../views/Teaser.vue"),
    },
    {
        path: "/content-engagement",
        name: "ContentEngagement",
        component: () =>
            import(
                /* webpackChunkName: "content_eng" */ "../views/ContentEngagement.vue"
            ),
    },
    {
        path: "/directive",
        name: "Directive",
        component: () =>
            import(
                /* webpackChunkName: "directive" */ "../views/Directive.vue"
            ),
    },
    {
        path: "/shop/:id",
        name: "SingleProduct",
        component: () =>
            import(
                /* webpackChunkName: "singleProduct" */ "../views/Product.vue"
            ),
    },
];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes,
});

export default router;
