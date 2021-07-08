import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import WebtrekkSmartpixelVue from "../../../instrumented/vue/index";
import "../../styles.css";

Vue.config.productionTip = false;

const webtrekkConfig = {
    trackId: "123123123123123",
    trackDomain: "phoenix:4001",
    activateLinkTracking: true,
    activateAutoTracking: router,
    activateTeaserTracking: true,
    activateProductListTracking: true,
    activateContentEngagement: true,
    secureCookie: false,
};

Vue.use(WebtrekkSmartpixelVue, webtrekkConfig);

new Vue({
    router,
    store,
    render: (h) => h(App),
}).$mount("#app");
