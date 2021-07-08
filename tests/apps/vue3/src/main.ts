import { createApp } from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import WebtrekkSmartpixelVue from "../../../instrumented/vue/index";
import { WebtrekkSmartpixelVueOptions } from "../../../../packages/vue";
import "../../styles.css";

const webtrekkConfig: WebtrekkSmartpixelVueOptions = {
    trackId: "123123123123123",
    trackDomain: "phoenix:4001",
    activateLinkTracking: true,
    activateAutoTracking: router,
    activateTeaserTracking: true,
    activateProductListTracking: true,
    activateContentEngagement: true,
    secureCookie: false
};

export default createApp(App)
    .use(store)
    .use(router)
    .use(WebtrekkSmartpixelVue, webtrekkConfig)
    .mount("#app");
