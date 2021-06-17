(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@webtrekk-smart-pixel/core'), require('vue')) :
  typeof define === 'function' && define.amd ? define(['exports', '@webtrekk-smart-pixel/core', 'vue'], factory) :
  (global = global || self, factory(global['@webtrekk-smart-pixel/vue'] = {}, global.wtSmart, global.Vue));
}(this, (function (exports, wtSmart, vue) { 'use strict';

  wtSmart = wtSmart && Object.prototype.hasOwnProperty.call(wtSmart, 'default') ? wtSmart['default'] : wtSmart;

  function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);

    if (Object.getOwnPropertySymbols) {
      var symbols = Object.getOwnPropertySymbols(object);

      if (enumerableOnly) {
        symbols = symbols.filter(function (sym) {
          return Object.getOwnPropertyDescriptor(object, sym).enumerable;
        });
      }

      keys.push.apply(keys, symbols);
    }

    return keys;
  }

  function _objectSpread2(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i] != null ? arguments[i] : {};

      if (i % 2) {
        ownKeys(Object(source), true).forEach(function (key) {
          _defineProperty(target, key, source[key]);
        });
      } else if (Object.getOwnPropertyDescriptors) {
        Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
      } else {
        ownKeys(Object(source)).forEach(function (key) {
          Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
      }
    }

    return target;
  }

  function _typeof(obj) {
    "@babel/helpers - typeof";

    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      _typeof = function (obj) {
        return typeof obj;
      };
    } else {
      _typeof = function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };
    }

    return _typeof(obj);
  }

  function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
    try {
      var info = gen[key](arg);
      var value = info.value;
    } catch (error) {
      reject(error);
      return;
    }

    if (info.done) {
      resolve(value);
    } else {
      Promise.resolve(value).then(_next, _throw);
    }
  }

  function _asyncToGenerator(fn) {
    return function () {
      var self = this,
          args = arguments;
      return new Promise(function (resolve, reject) {
        var gen = fn.apply(self, args);

        function _next(value) {
          asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
        }

        function _throw(err) {
          asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
        }

        _next(undefined);
      });
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
  }

  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) return _arrayLikeToArray(arr);
  }

  function _iterableToArray(iter) {
    if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
  }

  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
  }

  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;

    for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

    return arr2;
  }

  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  /**
   * @type {wtSmart|null}
   */

  var pixel_ = null;
  /**
   * @returns {Window}
   */

  var getWindow_ = function getWindow_() {
    return typeof window !== 'undefined' ? window : null;
  };
  /**
   * @returns {HTMLDocument}
   */


  var getDocument_ = function getDocument_() {
    return typeof window !== 'undefined' && typeof window.document !== 'undefined' ? window.document : null;
  };

  var emptyObject = {};
  /**
   *
   */

  var init_ = function init_() {
    var window_ = getWindow_();
    var document_ = getDocument_();

    if (window_ !== null && document_ !== null) {
      pixel_ = wtSmart.use(window_, document_);
      window_['wtSmart'] = pixel_;
    }
  };
  /**
   * @constructor
   */


  var WebtrekkSmartPixelVue = /*#__PURE__*/function () {
    function WebtrekkSmartPixelVue() {
      _classCallCheck(this, WebtrekkSmartPixelVue);

      /**
      * @type {boolean}
      */
      this.deactivateAutoTracking = false;
    }
    /**
     * @param {function(wtSmart: wtSmart)} call
     */
    // eslint-disable-next-line


    _createClass(WebtrekkSmartPixelVue, [{
      key: "call",
      value: function call(_call) {
        if (pixel_ === null) {
          init_();
        }

        if (pixel_ !== null) {
          pixel_.push(_call);
        }
      }
      /**
       * @param {object} data
       */

    }, {
      key: "init",
      value: function init() {
        var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : emptyObject;
        this.call(function (pix) {
          pix.init.add(data);
        });
      }
      /**
       * @param {object} data
       */

    }, {
      key: "advanced",
      value: function advanced() {
        var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : emptyObject;
        this.call(function (pix) {
          pix.advanced.add(data);
        });
      }
      /**
       * @param {string} name
       * @param {object} data
       */

    }, {
      key: "page",
      value: function page() {
        var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
        var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : emptyObject;
        this.call(function (pix) {
          pix.page.data.add(name, data);
        });
      }
      /**
       * @param {object} data
       */

    }, {
      key: "action",
      value: function action() {
        var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : emptyObject;
        this.call(function (pix) {
          pix.action.data.add(data);
        });
      }
      /**
       * @param {object} data
       */

    }, {
      key: "session",
      value: function session() {
        var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : emptyObject;
        this.call(function (pix) {
          pix.session.data.add(data);
        });
      }
      /**
       * @param {object} data
       */

    }, {
      key: "campaign",
      value: function campaign() {
        var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : emptyObject;
        this.call(function (pix) {
          pix.campaign.data.add(data);
        });
      }
      /**
       * @param {string} id
       * @param {object} data
       * @param {boolean} validation
       */

    }, {
      key: "customer",
      value: function customer() {
        var id = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
        var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : emptyObject;
        var validation = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
        this.call(function (pix) {
          pix.customer.data.add(id, data, validation);
        });
      }
      /**
       * @param {string} action
       * @param {object} data
       */

    }, {
      key: "product",
      value: function product() {
        var action = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'view';
        var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : emptyObject;
        this.call(function (pix) {
          var method = action === 'view' || action === 'basket' ? 'set' : 'add';
          pix.product[action].data[method]([data]);
        });
      }
      /**
       * @param {string} action
       * @param {Array} data
       */

    }, {
      key: "products",
      value: function products() {
        var action = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'view';
        var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
        this.call(function (pix) {
          var method = action === 'view' || action === 'basket' ? 'set' : 'add';
          pix.product[action].data[method](data);
        });
      }
      /**
       * @param {object} data
       */

    }, {
      key: "order",
      value: function order() {
        var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : emptyObject;
        this.call(function (pix) {
          pix.order.data.add(data);
        });
      }
      /**
       * @param {string} extension
       * @param {string} action
       * @param {object} config
       */

    }, {
      key: "extension",
      value: function extension() {
        var _extension = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

        var action = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'activate';
        var config = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : emptyObject;

        if (!_extension) {
          return;
        }

        this.call(function (pix) {
          pix.extension[_extension][action](config);
        });
      }
      /**
       * @param {boolean} keepData
       */

    }, {
      key: "track",
      value: function track() {
        var _this = this;

        var keepData = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
        // all the setTimeout hacks have to be done because of this issue: https://github.com/vuejs/vue-router/pull/2292, otherwise linkTracking is triggered after autoTracking
        // Otherwise automatic linkTracking requests come after PI
        setTimeout(function () {
          _this.call(function (pix) {
            pix.track(keepData);
          });
        }, 0);
      }
      /**
       * @param {boolean} keepData
       */

    }, {
      key: "trackPage",
      value: function trackPage() {
        var _this2 = this;

        var keepData = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
        setTimeout(function () {
          _this2.call(function (pix) {
            pix.trackPage(keepData);
          });
        }, 0);
      }
      /**
       * @param {boolean} keepData
       */

    }, {
      key: "trackAction",
      value: function trackAction() {
        var _this3 = this;

        var keepData = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
        setTimeout(function () {
          _this3.call(function (pix) {
            pix.trackAction(keepData);
          });
        }, 0);
      }
      /**
       *
       */

    }, {
      key: "clear",
      value: function clear() {
        this.call(function (pix) {
          pix.page.data.remove();
          pix.product.view.data.remove();
          pix.product.list.data.remove();
          pix.product.confirmation.data.remove();
          pix.product.basket.data.remove();
          pix.order.data.remove();
        });
      }
    }]);

    return WebtrekkSmartPixelVue;
  }();

  var SmartPixelVue = new WebtrekkSmartPixelVue();

  /**
   * @param {Object} data
   */

  var actionHandler = function actionHandler(data) {
    if (typeof data.action === 'string') {
      SmartPixelVue.action({
        name: data.action
      });
    } else {
      SmartPixelVue.action(data.action);
    }
  };
  /**
   * @param {Object} data
   */


  var customerHandler = function customerHandler(data) {
    if (typeof data.customer === 'string') {
      SmartPixelVue.customer(data.customer);
    } else {
      SmartPixelVue.customer(data.customer.id, data.customer, data.customer.validation);
    }
  };
  /**
   * @param {Object} data
   */


  var productHandler = function productHandler(data) {
    var productStatusFilter = /^(?:view|basket|list|confirmation)$/;
    var productStatusList = Object.keys(data).filter(function (key) {
      return productStatusFilter.test(key);
    });

    if (productStatusList.length === 0) {
      var status = data.product.status || 'view';
      SmartPixelVue.product(status, data.product);
    } else {
      productStatusList.forEach(function (status) {
        SmartPixelVue.product(status, data.product);
      });
    }
  };
  /**
   * @param {Object} data
   */


  var productsHandler = function productsHandler(data) {
    var productStatusFilter = /^(?:view|basket|list|confirmation)$/;
    var productStatusList = Object.keys(data).filter(function (key) {
      return productStatusFilter.test(key);
    });

    if (productStatusList.length === 0) {
      var addProducts = function addProducts(productArray) {
        productArray.forEach(function (product) {
          var status = product.status || 'view';
          SmartPixelVue.product(status, product);
        });
      };

      addProducts(data.products);
    } else {
      productStatusList.forEach(function (status) {
        SmartPixelVue.products(status, data.products);
      });
    }
  };

  var extensionHelper = function extensionHelper(extension, data, selector) {
    SmartPixelVue.call(function (wtSmart) {
      wtSmart.extension[extension].add(_objectSpread2(_objectSpread2({}, data[extension]), {}, {
        selector: selector
      }));
    });
  };

  var callWhenAvailable = function callWhenAvailable(selector, extension, data) {
    if (document.querySelector(selector)) {
      extensionHelper('teaser_tracking', data, selector);
    } else {
      setTimeout(function () {
        callWhenAvailable(selector, extension, data);
      }, 1000);
    }
  };
  /**
   * @param {Object} data
   * @param {HTMLElement} element
   */


  var teaserTrackingHandler = function teaserTrackingHandler(data, element) {
    if (data.teaser_tracking.selector) {
      callWhenAvailable(data.teaser_tracking.selector, 'teaser_tracking', data);
    } else {
      extensionHelper('teaser_tracking', data, element);
    }
  };
  /**
   * @param {Object} data
   * @param {HTMLElement} element
   */


  var productListTrackingHandler = function productListTrackingHandler(data, element) {
    var selector = data.product_list_tracking.selector ? data.product_list_tracking.selector : element;
    SmartPixelVue.call(function (wtSmart) {
      wtSmart.extension.product_list_tracking.add(_objectSpread2(_objectSpread2({}, data.product_list_tracking), {}, {
        selector: selector
      }));
    });
  };
  /**
   * @param {Object} data
   * @param {HTMLElement} element
   */


  var contentEngagementHandler = function contentEngagementHandler(data, element) {
    var selector = data.content_engagement.selector ? data.content_engagement.selector : element;
    SmartPixelVue.call(function (wtSmart) {
      wtSmart.extension.content_engagement.add(_objectSpread2(_objectSpread2({}, data.content_engagement), {}, {
        selector: selector
      }));
    });
  };
  /**
   * @param {Object} data
   * @param {Array} keys
   * @param {HTMLElement|null} [element]
   */


  var generalHandler = function generalHandler(data, keys) {
    var element = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
    // setTimeout(() => {
    var productStatusFilter = /^(?:view|basket|list|confirmation)$/;
    var trackFilter = /^(?:track|trackAction|trackPage)$/;
    keys // make sure track is used last by filtering it out here
    .filter(function (key) {
      return !productStatusFilter.test(key);
    }).filter(function (key) {
      return !trackFilter.test(key);
    }).forEach(function (key) {
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
          SmartPixelVue.deactivateAutoTracking = data;
          break;

        default:
          if (SmartPixelVue[key]) {
            SmartPixelVue[key](data[key]);
          }

          break;
      }
    }); // make sure track is used last

    var shallDataBeKept = function shallDataBeKept(key) {
      return data[key] === true || data[key][key] === true;
    };

    keys.filter(function (key) {
      return trackFilter.test(key);
    }).forEach(function (key) {
      switch (key) {
        case 'track':
          SmartPixelVue.track(shallDataBeKept(key));
          break;

        case 'trackAction':
          SmartPixelVue.trackAction(shallDataBeKept(key));
          break;

        case 'trackPage':
          SmartPixelVue.trackPage(shallDataBeKept(key));
          break;
      }
    }); // }, 0);
  };

  var webtrekkDirective = {
    name: 'webtrekk',
    mounted: function mounted(element, binding) {
      var dataValue = binding.value;
      var mode = binding.modifiers;
      var keyValues = _typeof(dataValue) === 'object' ? Object.keys(dataValue) : [];
      /**
       * @param {Object} data
       * @param {Object} modeObj
       */

      var modHandler = function modHandler(data, modeObj) {
        // generates a keylist and data object for general handler to use
        // based on active mods and the data given
        var modes = Object.keys(modeObj);
        var generalData = {};
        modes.forEach(function (m) {
          generalData[m] = data;
        });
        generalHandler(generalData, modes, element);
      };

      if (Object.entries(mode).length === 0) {
        generalHandler(dataValue, keyValues, element);
      } else {
        modHandler(dataValue, mode);
      }
    }
  };
  webtrekkDirective.inserted = webtrekkDirective.mounted;

  /**
   * @param {Array} root
   * @returns {Array} Child component instances with webtrekk property
   */
  var childObductor = function childObductor(root) {
    var flatten = function flatten(arr) {
      return arr.reduce(function (flat, next) {
        return flat.concat(Array.isArray(next) ? flatten(next) : next);
      }, []);
    };

    var allChildren = [];

    var getChild = function getChild(el) {
      if (el.$children.length > 0) {
        allChildren.push(_toConsumableArray(el.$children));
        el.$children.forEach(function (newEl) {
          getChild(newEl);
        });
      }
    };

    getChild(root);
    return flatten(allChildren).filter(function (child) {
      return child.webtrekk;
    });
  };

  var wtBeforeRouteEnter = function wtBeforeRouteEnter(webtrekkConfig, next) {
    next(function (vm) {
      if (vm.webtrekk) {
        generalHandler(vm.webtrekk, Object.keys(vm.webtrekk), vm.$el);
      } // delegate tracking data of component property 'webtrekk' to pixel, incl. all children


      childObductor(vm).forEach(function (child) {
        generalHandler(child.webtrekk, Object.keys(child.webtrekk), child.$el);
      });
      vm.$nextTick(function () {
        if (webtrekkConfig.activateLinkTracking) {
          // reload links for auto linktracking
          SmartPixelVue.extension('action', 'reload');
        }

        if (SmartPixelVue.deactivateAutoTracking) {
          SmartPixelVue.deactivateAutoTracking = false;
        } else {
          // Send pagerequest
          SmartPixelVue.track();
        }
      });
    });
  };
  var wtBeforeRouteLeave = function wtBeforeRouteLeave(next) {
    // cleanup if autotrack was deactivated but no track happened before the route changes
    if (SmartPixelVue.deactivateAutoTracking) {
      SmartPixelVue.deactivateAutoTracking = false;
      SmartPixelVue.clear();
    }

    next();
  };

  var autoTrack = function autoTrack(config) {
    vue.nextTick(function () {
      if (config.activateLinkTracking) {
        SmartPixelVue.extension('action', 'reload');
      }

      if (SmartPixelVue.deactivateAutoTracking) {
        SmartPixelVue.deactivateAutoTracking = false;
      } else {
        SmartPixelVue.track();
      }
    });
  };
  var mappBeforeResolve = function mappBeforeResolve(to) {
    SmartPixelVue.clear();
    var routerComponent = to.matched[0].components["default"];
    var componentMappData = [];
    console.log(123, to);

    var getComponentMappDataRecursively = function getComponentMappDataRecursively(component) {
      if (component.data && component.data().webtrekk) {
        componentMappData.push(component.data().webtrekk);
      }

      if (component.hasOwnProperty('components')) {
        Object.keys(component.components).forEach(function (componentName) {
          getComponentMappDataRecursively(component.components[componentName]);
        });
      }
    };

    getComponentMappDataRecursively(routerComponent);
    componentMappData.forEach(function (data) {
      generalHandler(data, Object.keys(data));
    });
  };

  var webtrekk = {
    install: function install(Vue, webtrekkConfig) {
      var _Vue$config;

      var isVue3 = (Vue === null || Vue === void 0 ? void 0 : Vue.hasOwnProperty('config')) && ((_Vue$config = Vue.config) === null || _Vue$config === void 0 ? void 0 : _Vue$config.hasOwnProperty('globalProperties'));

      if (isVue3) {
        Vue.config.globalProperties.$webtrekk = SmartPixelVue;

        if (webtrekkConfig.activateAutoTracking && webtrekkConfig.activateAutoTracking.beforeResolve) {
          webtrekkConfig.activateAutoTracking.beforeResolve(function (to) {
            mappBeforeResolve(to);
          });
          webtrekkConfig.activateAutoTracking.afterEach( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
            return regeneratorRuntime.wrap(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    autoTrack(webtrekkConfig);

                  case 1:
                  case "end":
                    return _context.stop();
                }
              }
            }, _callee);
          })));
        }
      } else {
        Vue.prototype.$webtrekk = SmartPixelVue;

        if (webtrekkConfig.activateAutoTracking) {
          Vue.mixin({
            beforeRouteEnter: function beforeRouteEnter(to, from, next) {
              wtBeforeRouteEnter(webtrekkConfig, next);
            },

            /* istanbul ignore next */
            beforeRouteLeave: function beforeRouteLeave(to, from, next) {
              wtBeforeRouteLeave(next);
            }
          });
        }
      } // initialization of global Webtrekk configuration


      SmartPixelVue.init(webtrekkConfig);
      SmartPixelVue.advanced(webtrekkConfig); // optional activation of auto linktracking

      if (webtrekkConfig.activateLinkTracking) {
        SmartPixelVue.extension('action');
      } // optional activation of teaser_tracking


      var teaser = webtrekkConfig.activateTeaserTracking;

      if (teaser) {
        SmartPixelVue.extension('teaser_tracking');
        SmartPixelVue.call(function (wtSmart) {
          wtSmart.extension.teaser_tracking.config(teaser);
        });
      } // optional activation of product_list_tracking


      var product = webtrekkConfig.activateProductListTracking;

      if (product) {
        SmartPixelVue.extension('product_list_tracking');
        SmartPixelVue.call(function (wtSmart) {
          wtSmart.extension.product_list_tracking.config(product);
        });
      } // optional activation of content_engagement


      var contentEngagement = webtrekkConfig.activateContentEngagement;

      if (contentEngagement) {
        SmartPixelVue.extension('content_engagement');
        SmartPixelVue.call(function (wtSmart) {
          wtSmart.extension.content_engagement.config(contentEngagement);
        });
      } // init v-webtrekk directive


      Vue.directive(webtrekkDirective.name, webtrekkDirective);
    }
  };

  exports.default = webtrekk;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
