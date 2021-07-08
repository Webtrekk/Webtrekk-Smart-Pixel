import {nextTick} from 'vue';
import SmartPixelVue from './WebtrekkSmartPixelVue';
import {generalHandler} from './handlerFunctions';

export const autoTrack = (config) => {
    nextTick(()=>{
        if (config.activateLinkTracking) {
            SmartPixelVue.extension('action', 'reload');
        }
        if (SmartPixelVue.deactivateAutoTracking) {
            SmartPixelVue.deactivateAutoTracking = false;
        }
        else {
            // all the setTimeout hacks have to be done because of this issue: https://github.com/vuejs/vue-router/pull/2292, otherwise linkTracking is triggered after autoTracking
            // Otherwise automatic linkTracking requests come after PI
            setTimeout(() => {
                SmartPixelVue.call(function(pix) {
                    pix.track();
                });
            }, 0);
        }
    });
};

export const mappBeforeResolve = (to) => {
    SmartPixelVue.clear();
    const routerComponent = to.matched[0].components.default;
    const componentMappData = [];
    const getComponentMappDataRecursively = (component) => {
        if (component.data && component.data().webtrekk) {
            componentMappData.push(component.data().webtrekk);
        }
        if (component.hasOwnProperty('components')) {
            Object.keys(component.components).forEach((componentName)=> {
                getComponentMappDataRecursively(component.components[componentName]);
            });
        }
    };
    getComponentMappDataRecursively(routerComponent);
    componentMappData.forEach((data) => {
        generalHandler(data, Object.keys(data));
    });
};
