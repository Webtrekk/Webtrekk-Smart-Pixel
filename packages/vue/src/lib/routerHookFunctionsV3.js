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
            SmartPixelVue.track();
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
