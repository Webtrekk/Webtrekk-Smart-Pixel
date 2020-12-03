import SmartPixelVue from './WebtrekkSmartPixelVue';
import {childObductor} from './helper';
import {generalHandler} from './handlerFunctions';
import {nextTick} from 'vue';

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

export const wtBeforeRouteEnter = (webtrekkConfig, next) => {
    next(vm => {
        if (vm.webtrekk) {
            generalHandler(vm.webtrekk, Object.keys(vm.webtrekk), vm.$el);
        }
        // delegate tracking data of component property 'webtrekk' to pixel, incl. all children
        childObductor(vm).forEach((child) => {
            generalHandler(child.webtrekk, Object.keys(child.webtrekk), child.$el);
        });

        vm.$nextTick(() => {
            if (webtrekkConfig.activateLinkTracking) {
                // reload links for auto linktracking
                SmartPixelVue.extension('action', 'reload');
            }

            if (SmartPixelVue.deactivateAutoTracking) {
                SmartPixelVue.deactivateAutoTracking = false;
            }
            else {
                // Send pagerequest
                SmartPixelVue.track();
            }
        });
    });
};

export const wtBeforeRouteLeave = (next) => {
    // cleanup if autotrack was deactivated but no track happened before the route changes
    if (SmartPixelVue.deactivateAutoTracking) {
        SmartPixelVue.deactivateAutoTracking = false;
        SmartPixelVue.clear();
    }
    next();
};

