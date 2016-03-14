'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _builder = require('./builder');

var _builder2 = _interopRequireDefault(_builder);

var _exceptions = require('./exceptions');

var _exceptions2 = _interopRequireDefault(_exceptions);

var _incrementalDom = require('incremental-dom');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

if (!Array.isArray) {
  Array.isArray = function (arg) {
    return Object.prototype.toString.call(arg) === '[object Array]';
  };
}

function validateRequiredFields(options) {
  if (!options.hasOwnProperty('template')) {
    throw _exceptions2.default.WITHOUT_TEMPLATE;
  }
  if (!options.hasOwnProperty('view')) {
    throw _exceptions2.default.WITHOUT_VIEW;
  }
  if (!options.hasOwnProperty('elementName')) {
    throw _exceptions2.default.WITHOUT_TAGNAME;
  }
  if (typeof options.view != "string" && typeof options.view != "function") {
    throw _exceptions2.default.VIEW_MUST_BE_STRING_OR_FUNTION;
  }
}

function renderFactory(view) {
  return {
    render: function render() {
      var result = view.bind(this)();
      if (typeof result === 'function') {
        result.bind(this)();
      }
    }
  };
}

function setStateFactory() {
  return {
    setState: function setState(newState) {
      this.state = Object.assign({}, this.state, newState);
      this.render();
      return this.state;
    }
  };
}

function TagFactory() {
  var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

  // validate Presence of necesary API elements
  validateRequiredFields(options);
  var CloneOptions = Object.assign({}, { name: options.elementName });
  delete Object.elementName;
  Object.assign(options, renderFactory(options.view), setStateFactory());
  return (0, _builder2.default)(CloneOptions.name, options);
}

exports.default = TagFactory;