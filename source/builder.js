'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _shadowdomShim = require('./shadowdom-shim');

var _shadowdomShim2 = _interopRequireDefault(_shadowdomShim);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DefaultCallbacks = {
  detachedCallback: function detachedCallback() {
    this.onUnMount();
    console.log('Was detached');
  },
  attributeChangedCallback: function attributeChangedCallback() {
    console.log('Change attibute');
  },
  onMount: function onMount() {},
  onUnMount: function onUnMount() {},
  createdCallback: function createdCallback() {
    if (typeof this.createShadowRoot === 'function') {
      this.shadow = this.createShadowRoot();
      this.shadow.innerHTML = this.template;
    } else {
      _shadowdomShim2.default.writeStyle(this.template, this.nodeName);
    }
  }
};

function createDefaultCallbacks(callbacks) {
  return Object.assign({}, createObjDescriptor(DefaultCallbacks), createObjDescriptor(callbacks));
}

function createObjDescriptor(obj) {
  var objDescriptor = {};
  Object.keys(obj).forEach(function (prop) {
    objDescriptor[prop] = { value: obj[prop] };
  });
  return objDescriptor;
}

function SetListeners() {
  var events = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];

  return {
    attachedCallback: function attachedCallback() {
      try {
        console.log('Element attach', this);
        this.onMount();
        events.forEach(function (event) {
          this.addEventListener(event.type, function (e) {
            if (e.target && e.target.matches(event.selector)) {
              event.callback.bind(this)(e);
            }
          }.bind(this));
        }.bind(this));
      } catch (e) {
        console.log(e);
      }
    }
  };
}

function Builder(tagName, options) {
  var optionsDescriptor = Object.assign({}, createDefaultCallbacks(options), createObjDescriptor(SetListeners(options.events)));
  optionsDescriptor.state = Object.assign({}, optionsDescriptor.state, {
    enumerable: true,
    writable: true
  });
  var TagPrototype = Object.create(HTMLElement.prototype, optionsDescriptor);
  try {
    var tagNameElement = document.registerElement(tagName, {
      prototype: TagPrototype
    });
    return new tagNameElement();
  } catch (e) {
    console.log(e);
    return document.createElement(tagName);
  }
}

exports.default = Builder;