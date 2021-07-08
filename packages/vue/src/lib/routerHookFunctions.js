import SmartPixelVue from './WebtrekkSmartPixelVue';
import {generalHandler} from './handlerFunctions';

/**
 * @param {Array} root
 * @returns {Array} Child component instances with webtrekk property
 */
const childObductor = (root) => {
    const flatten = (arr) => arr.reduce((flat, next) => flat.concat(Array.isArray(next) ? flatten(next) : next), []);
    const allChildren = [];
    const getChild = el => {
        if (el.$children.length > 0) {
            allChildren.push([...el.$children]);
            el.$children.forEach(newEl => {
                getChild(newEl);
            });
        }
    };
    getChild(root);
    return flatten(allChildren).filter((child) => child.webtrekk);
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
                // all the setTimeout hacks have to be done because of this issue: https://github.com/vuejs/vue-router/pull/2292, otherwise linkTracking is triggered after autoTracking
                // Otherwise automatic linkTracking requests come after PI
                setTimeout(() => {
                    SmartPixelVue.call(function(pix) {
                        pix.track();
                    });
                }, 0);
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

