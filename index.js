'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');

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

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest();
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArrayLimit(arr, i) {
  if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) {
    return;
  }

  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance");
}

var usePersistState = function usePersistState(initalState, config) {
  var configObject = React.useRef({
    storage: "sessionStorage",
    persistOnUnmount: false
  });

  var _React$useState = React.useState(function () {
    if (config !== null && _typeof(config) === "object") {
      if (!config.key) {
        throw new Error("usePersistState hook require a key in config object.");
      }

      configObject.current.uniqueKey = config.key;
      configObject.current.storage = config.persistAcrosSession ? "localStorage" : "sessionStorage";
      configObject.current.persistOnUnmount = config.persistOnUnmount || false;
    } else if (typeof config === 'string') {
      configObject.current.uniqueKey = config;
    } else {
      throw new Error("usePersistState hook require a config which should be Object or String");
    }

    var localInfo = window[configObject.current.storage].getItem(configObject.current.uniqueKey);
    if (localInfo) return JSON.parse(localInfo);

    if (initalState && initalState.constructor === Function) {
      var data = initalState();
      return data;
    }

    return initalState;
  }),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      state = _React$useState2[0],
      setState = _React$useState2[1];

  React.useEffect(function () {
    window[configObject.current.storage].setItem(configObject.current.uniqueKey, JSON.stringify(state));
    return function () {
      if (!configObject.current.persistOnUnmount) window[configObject.current.storage].removeItem(configObject.current.uniqueKey);
    };
  }, [state]);
  return [state, setState];
};

exports.usePersistState = usePersistState;
//# sourceMappingURL=index.js.map
