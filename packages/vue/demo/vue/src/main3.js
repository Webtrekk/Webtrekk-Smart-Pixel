import { createApp } from 'vue';
// import WebtrekkSmartpixelVue from 'wt/smart-pixel-vue.umd';
import WebtrekkSmartpixelVue from '../../../../vue/src/index';
import App from './App.vue';
import Home from './views/Home3.vue';
// import store from './store/index';

import { createWebHistory, createRouter } from "vue-router";

const routes = [
        {
            path: '/',
            name: 'home',
            component: Home
        },
        {
            path: '/data',
            name: 'data',
            component: () => import('./views/Data.vue')
        },
        {
            path: '/directive',
            name: 'directive',
            component: () => import('./views/Directive.vue')
        },
        {
            path: '/async',
            name: 'async',
            component: () => import('./views/Async3.vue')
        },
        {
            path: '/vuex',
            name: 'vuex',
            component: () => import('./views/Vuex.vue')
        }
    ];

const routerInstance = createRouter({
    history: createWebHistory(),
    routes,
});

// console.log('routes: ', routes);
// console.log(routes[0].component.setup);


// router.beforeResolve( to => {
//
//     if(to.matched[0].components.default.data) {
//         console.log('add Data ', to.matched[0].components.default.data());
//     }
// });
// router.afterEach((to, from) => {
//     console.log('track');
// })

//
// const router = createRouter({
//     mode: 'history',
//     base: process.env.BASE_URL,
//     routes:
// })

// app.use(router);
// const routerInstance = new VueRouter();

const webtrekkConfig = {
    trackId: '136699033798929',
    trackDomain: 'analytics01.wt-eu02.net',
    activateLinkTracking: true,
    activateAutoTracking: routerInstance,
    activateTeaserTracking: true,
    activateProductListTracking: true,
    activateContentEngagement: true
};

const app = createApp(App);
app.use(routerInstance);
// app.use(store);
app.use(WebtrekkSmartpixelVue, webtrekkConfig);
app.mount('#app');

// new Vue({
//     router: routerInstance,
//     store,
//     render: h => h(App)
// }).$mount('#app');