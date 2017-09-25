'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

require('document-register-element');

var _incrementalDom = require('incremental-dom');

var _create = require('./create');

var _create2 = _interopRequireDefault(_create);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DefaultComponentObject = {
  state: {},
  template: '<content></content>'
};

function createElement(tagName) {
  var key = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  var state = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
  var child = arguments[4];

  (0, _incrementalDom.elementOpenStart)(tagName, key);
  Object.keys(options).forEach(function (option) {
    (0, _incrementalDom.attr)(option, options[option]);
  });
  var element = (0, _incrementalDom.elementOpenEnd)(tagName);

  if (typeof element.setState !== 'undefined') {
    element.setState(Object.assign({}, state, { child: child }));
  } else {
    renderChild(child);
  }
  (0, _incrementalDom.elementClose)(tagName);
  return element;
}

function renderChild(child) {
  if (typeof child === 'undefined') {
    return;
  }
  if (typeof child === 'string') {
    return (0, _incrementalDom.text)(child.trim());
  } else if (typeof child === 'function') {
    return child();
  } else if (Array.isArray(child)) {
    child.forEach(renderChild);
  } else {
    return child;
  }
}

function ComponentFactory() {
  var object = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  object = Object.assign({}, DefaultComponentObject, object);
  var tag = (0, _create2.default)(object);
  return tag;
}

function isNotChrome() {
  return navigator.userAgent.toLowerCase().indexOf('chrome') === -1;
}

function renderDOM(component, tag) {
  var state = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  var tries = 1;
  var interval = void 0;
  if (!isNotChrome()) {
    renderComponent(component, tag, state);
  } else {
    interval = setInterval(function () {
      renderComponent(component, tag, state);
      tries += 1;
      if (tries > 5) {
        clearInterval(interval);
      }
    }, 10);
  }
}

function renderComponent(component, tag, state) {
  return (0, _incrementalDom.patch)(tag, function (data) {
    return Shaco.createElement(component, null, data);
  }, state);
}

var Shaco = {
  ComponentFactory: ComponentFactory,
  createElement: createElement,
  renderDOM: renderDOM,
  patch: _incrementalDom.patch
};

exports.default = Shaco;