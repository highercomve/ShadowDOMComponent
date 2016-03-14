'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _incrementalDom = require('incremental-dom');

var _create = require('./create');

var _create2 = _interopRequireDefault(_create);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DefaultComponentObject = {
  state: {}
};

function createElement(tagName) {
  var key = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];
  var state = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];
  var options = arguments.length <= 3 || arguments[3] === undefined ? {} : arguments[3];
  var child = arguments[4];

  (0, _incrementalDom.elementOpenStart)(tagName, key);
  Object.keys(options).forEach(function (option) {
    (0, _incrementalDom.attr)(option, options[option]);
  });
  var element = (0, _incrementalDom.elementOpenEnd)(tagName);
  if (typeof element.setState !== 'undefined') {
    element.setState(state);
  }
  if (typeof child !== 'undefined') {
    if (Array.isArray(child)) {
      child.forEach(function (appendableView) {
        appendableView();
      });
    } else if (typeof child === 'string') {
      (0, _incrementalDom.text)(child);
    } else {
      child();
    }
  }
  (0, _incrementalDom.elementClose)(tagName);
  return element;
}

function ComponentFactory() {
  var object = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

  object = Object.assign({}, DefaultComponentObject, object);
  var tag = (0, _create2.default)(object);
  return tag;
}

function renderDOM(component, tag) {
  var state = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

  (0, _incrementalDom.patch)(tag, function (data) {
    Shaco.createElement(component, null, data);
  }, state);
}

var Shaco = {
  ComponentFactory: ComponentFactory,
  createElement: createElement,
  renderDOM: renderDOM,
  patch: _incrementalDom.patch
};

exports.default = Shaco;