import wt from './WebtrekkSmartPixelVue';

/**
 * @param {Object} data
 */
const actionHandler = data => {
    if (typeof data.action === 'string') {
        wt.action({name: data.action});
    }
    else {
        wt.action(data.action);
    }
};

/**
 * @param {Object} data
 */
const customerHandler = data => {
    if (typeof data.customer === 'string') {
        wt.customer(data.customer);
    }
    else {
        wt.customer(data.customer.id, data.customer, data.customer.validation);
    }
};

/**
 * @param {Object} data
 */
const productHandler = data => {
    const productStatusFilter = /^(?:view|basket|list|confirmation)$/;
    const productStatusList = Object.keys(data).filter(key => productStatusFilter.test(key));
    if (productStatusList.length === 0) {
        const status = data.product.status || 'view';
        wt.product(status, data.product);
    }
    else {
        productStatusList.forEach(status => {
            wt.product(status, data.product);
        });
    }
};

/**
 * @param {Object} data
 */
const productsHandler = data => {
    const productStatusFilter = /^(?:view|basket|list|confirmation)$/;
    const productStatusList = Object.keys(data).filter(key => productStatusFilter.test(key));
    if (productStatusList.length === 0) {
        const addProducts = productArray => {
            productArray.forEach(product => {
                const status = product.status || 'view';
                wt.product(status, product);
            });
        };
        addProducts(data.products);
    }
    else {
        productStatusList.forEach(status => {
            wt.products(status, data.products);
        });
    }
};

const extensionHelper = (extension, data, selector) => {
    wt.call(wtSmart => {
        wtSmart.extension[extension].add({
            ...data[extension],
            selector
        });
    });
};

const callWhenAvailable = (selector, extension, data) => {
    if (document.querySelector(selector)) {
        extensionHelper('teaser_tracking', data, selector);
    }
    else {
        setTimeout(()=>{
            callWhenAvailable(selector, extension, data);
        }, 1000);
    }
};

/**
 * @param {Object} data
 * @param {HTMLElement} element
 */
const teaserTrackingHandler = (data, element) => {
    if (data.teaser_tracking.selector) {
        callWhenAvailable(data.teaser_tracking.selector, 'teaser_tracking', data);
    }
    else {
        extensionHelper('teaser_tracking', data, element);
    }
};

/**
 * @param {Object} data
 * @param {HTMLElement} element
 */
const productListTrackingHandler = (data, element) => {
    const selector = data.product_list_tracking.selector
        ? data.product_list_tracking.selector
        : element;

    wt.call(wtSmart => {
        wtSmart.extension.product_list_tracking.add({
            ...data.product_list_tracking,
            selector
        });
    });
};

/**
 * @param {Object} data
 * @param {HTMLElement} element
 */
const contentEngagementHandler = (data, element) => {
    const selector = data.content_engagement.selector
        ? data.content_engagement.selector
        : element;
    wt.call(wtSmart => {
        wtSmart.extension.content_engagement.add({
            ...data.content_engagement,
            selector
        });
    });
};

/**
 * @param {Object} data
 * @param {Array} keys
 * @param {HTMLElement|null} [element]
 */
const generalHandler = (data, keys, element = null) => {
    // setTimeout(() => {
    const productStatusFilter = /^(?:view|basket|list|confirmation)$/;
    const trackFilter = /^(?:track|trackAction|trackPage)$/;

    keys
        // make sure track is used last by filtering it out here
        .filter(key => {
            return !productStatusFilter.test(key);
        })
        .filter(key => {
            return !trackFilter.test(key);
        })
        .forEach(key => {
            switch (key) {
                case 'action':
                    actionHandler(data);
                    break;
                case 'customer':
                    customerHandler(data);
                    break;
                case 'product':
                    productHandler(data);
                    break;
                case 'products':
                    productsHandler(data);
                    break;
                case 'teaser_tracking':
                    teaserTrackingHandler(data, element);
                    break;
                case 'product_list_tracking':
                    productListTrackingHandler(data, element);
                    break;
                case 'content_engagement':
                    contentEngagementHandler(data, element);
                    break;
                case 'deactivateAutoTracking':
                    wt.deactivateAutoTracking = data;
                    break;
                default:
                    if (wt[key]) {
                        wt[key](data[key]);
                    }
                    break;
            }
        });

    // make sure track is used last
    const shallDataBeKept = (key) => {
        return (data[key] === true || data[key][key] === true);
    };

    keys
        .filter(key => trackFilter.test(key))
        .forEach(key => {
            switch (key) {
                case 'track':
                    wt.track(shallDataBeKept(key));
                    break;
                case 'trackAction':
                    wt.trackAction(shallDataBeKept(key));
                    break;
                case 'trackPage':
                    wt.trackPage(shallDataBeKept(key));
                    break;
                    /* istanbul ignore next */
                default:
                    break;
            }
        });
    // }, 0);
};

export {
    generalHandler
};
