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
            import(/* webpackChunkName: "about" */ "../views/Shop.vue")
    },
    {
        path: "/contact",
        name: "Contact",
        component: () =>
            import(/* webpackChunkName: "about" */ "../views/Contact.vue")
    }
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
});

export default router;
