import { createApp } from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import WebtrekkSmartpixelVue, {
    WebtrekkSmartpixelVueOptions
} from "../plugin/vue";
import "../../styles.css";

const webtrekkConfig: WebtrekkSmartpixelVueOptions = {
    trackId: "123123123123123",
    trackDomain: "localhost:4001",
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
