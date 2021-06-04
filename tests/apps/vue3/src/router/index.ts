import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Home from "../views/Home.vue";

const routes: Array<RouteRecordRaw> = [
    {
        path: "/",
        name: "Home",
        component: Home
    },
    {
        path: "/about",
        name: "About",
        component: () =>
            import(/* webpackChunkName: "about" */ "../views/About.vue")
    },
    {
        path: "/shop",
        name: "Shop",
        component: () =>
            import(/* webpackChunkName: "shop" */ "../views/Shop.vue")
    },
    {
        path: "/account",
        name: "Account",
        component: () =>
            import(/* webpackChunkName: "account" */ "../views/Account.vue")
    },
    {
        path: "/login",
        name: "Login",
        component: () =>
            import(/* webpackChunkName: "login" */ "../views/Login.vue")
    },
    {
        path: "/thankyou",
        name: "ThankYou",
        component: () =>
            import(/* webpackChunkName: "thanks" */ "../views/ThankYou.vue")
    },
    {
        path: "/shop/:id",
        name: "SingleProduct",
        component: () =>
            import(/* webpackChunkName: "singleProduct" */ "../views/Product.vue")
    }
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
});

export default router;
