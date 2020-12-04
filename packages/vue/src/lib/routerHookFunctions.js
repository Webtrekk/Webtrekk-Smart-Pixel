import SmartPixelVue from './WebtrekkSmartPixelVue';
import {childObductor} from './helper';
import {generalHandler} from './handlerFunctions';

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

