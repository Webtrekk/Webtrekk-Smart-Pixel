import wtSmart from '@webtrekk-smart-pixel/core';

/**
 * @type {wtSmart|null}
 */
var pixel_ = null;

/**
 * @returns {Window}
 */
const getWindow_ = function() {
    return ((typeof window !== 'undefined') ? window : null);
};

/**
 * @returns {HTMLDocument}
 */
const getDocument_ = function() {
    return ((typeof window !== 'undefined' && typeof window.document !== 'undefined') ? window.document : null);
};

const emptyObject = {};

/**
 *
 */
const init_ = function() {
    const window_ = getWindow_();
    const document_ = getDocument_();

    if (window_ !== null && document_ !== null) {
        pixel_ = wtSmart.use(window_, document_);
        window_['wtSmart'] = pixel_;
    }
};

/**
 * @constructor
 */
class WebtrekkSmartPixelVue {
    constructor() {
        /**
        * @type {boolean}
        */
        this.deactivateAutoTracking = false;
    }

    /**
     * @param {function(wtSmart: wtSmart)} call
     */
    // eslint-disable-next-line
    call(call) {
        if (pixel_ === null) {
            init_();
        }

        if (pixel_ !== null) {
            pixel_.push(call);
        }
    }

    /**
     * @param {object} data
     */
    init(data = emptyObject) {
        this.call(function(pix) {
            pix.init.add(data);
        });
    }

    /**
     * @param {object} data
     */
    advanced(data = emptyObject) {
        this.call(function(pix) {
            pix.advanced.add(data);
        });
    }

    /**
     * @param {string} name
     * @param {object} data
     */
    page(name = '', data = emptyObject) {
        this.call(function(pix) {
            pix.page.data.add(name, data);
        });
    }

    /**
     * @param {object} data
     */
    action(data = emptyObject) {
        this.call(function(pix) {
            pix.action.data.add(data);
        });
    }

    /**
     * @param {object} data
     */
    session(data = emptyObject) {
        this.call(function(pix) {
            pix.session.data.add(data);
        });
    }

    /**
     * @param {object} data
     */
    campaign(data = emptyObject) {
        this.call(function(pix) {
            pix.campaign.data.add(data);
        });
    }

    /**
     * @param {string} id
     * @param {object} data
     * @param {boolean} validation
     */
    customer(id = '', data = emptyObject, validation = false) {
        this.call(function(pix) {
            pix.customer.data.add(id, data, validation);
        });
    }

    /**
     * @param {string} action
     * @param {object} data
     */
    product(action = 'view', data = emptyObject) {
        this.call(function(pix) {
            // const method = action === 'view' || action === 'basket' ? 'set' : 'add';
            pix.product[action].data.add([data]);
        });
    }

    /**
     * @param {string} action
     * @param {Array} data
     */
    products(action = 'view', data = []) {
        this.call(function(pix) {
            // const method = action === 'view' || action === 'basket' ? 'set' : 'add';
            pix.product[action].data.add(data);
        });
    }

    /**
     * @param {object} data
     */
    order(data = emptyObject) {
        this.call(function(pix) {
            pix.order.data.add(data);
        });
    }

    /**
     * @param {string} extension
     * @param {string} action
     * @param {object} config
     */
    extension(extension = '', action = 'activate', config = emptyObject) {
        if (!extension) {
            return;
        }
        this.call(function(pix) {
            pix.extension[extension][action](config);
        });
    }

    /**
     * @param {boolean} keepData
     */
    track(keepData = false) {
        this.call(function(pix) {
            pix.track(keepData);
        });
    }

    /**
     * @param {boolean} keepData
     */
    trackPage(keepData = false) {
        this.call(function(pix) {
            pix.trackPage(keepData);
        });
    }

    /**
     * @param {boolean} keepData
     */
    trackAction(keepData = false) {
        this.call(function(pix) {
            pix.trackAction(keepData);
        });
    }

    /**
     *
     */
    clear() {
        this.call(function(pix) {
            pix.page.data.remove();
            pix.product.view.data.remove();
            pix.product.list.data.remove();
            pix.product.confirmation.data.remove();
            pix.product.basket.data.remove();
            pix.order.data.remove();
        });
    }
}

export default new WebtrekkSmartPixelVue();
