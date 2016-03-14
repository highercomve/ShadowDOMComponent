'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var DefaultCallbacks = {
  detachedCallback: function detachedCallback() {
    this.onUnMount();
    console.log('Was detached');
  },
  attributeChangedCallback: function attributeChangedCallback() {
    console.log('Change attibute');
  },
  onMount: function onMount() {},
  onUnMount: function onUnMount() {}
};

function createDefaultCallbacks(callbacks) {
  return Object.assign(DefaultCallbacks, {
    createdCallback: function createdCallback() {
      this.shadow = this.createShadowRoot();
      this.shadow.innerHTML = this.template;
    }
  }, callbacks);
}

function SetListeners() {
  var events = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];

  return {
    attachedCallback: function attachedCallback() {
      console.log('Element attach', this);
      this.onMount();
      events.forEach(function (event) {
        this.addEventListener(event.type, function (e) {
          if (e.target && e.target.matches(event.selector)) {
            event.callback.bind(this)(e);
          }
        }.bind(this));
      }.bind(this));
    }
  };
}

function Builder(tagName, options) {
  var TagPrototype = Object.create(HTMLElement.prototype);
  Object.assign(TagPrototype, createDefaultCallbacks(options), SetListeners(options.events));
  try {
    var tagNameElement = document.registerElement(tagName, {
      prototype: TagPrototype
    });
    return new tagNameElement();
  } catch (e) {
    return document.createElement(TagName);
  }
}

exports.default = Builder;
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
      view.bind(this)();
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
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var ComponentExceptions = {
  WITHOUT_TEMPLATE: {
    message: 'The new component need a Template',
    name: 'ComponentWithOutTemplate'
  },
  WITHOUT_VIEW: {
    message: 'The new component must have a view rendering',
    name: 'ComponentWithOutView'
  },
  WITHOUT_TAGNAME: {
    message: "You can't create a component without the tagName, you must pass that to ComponentFactory",
    name: 'ComponentWithPutTagName'
  },
  VIEW_MUST_BE_STRING_OR_FUNTION: {
    message: "The attribute view must be a string or a funtion.",
    name: "ComponentViewMustBeAStringOrFunction"
  }
};

exports.default = ComponentExceptions;
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _incrementalDom = require('incremental-dom');

var _create = require('./create');

var _create2 = _interopRequireDefault(_create);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

require('webcomponents-lite');


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
