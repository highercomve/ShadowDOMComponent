import Builder from './builder'
import ComponentExceptions from './exceptions'
import { patch, text } from 'incremental-dom'

if (!Array.isArray) {
  Array.isArray = function(arg) {
    return Object.prototype.toString.call(arg) === '[object Array]';
  };
}

function validateRequiredFields (options) {
  if (!options.hasOwnProperty('template')) {
    throw ComponentExceptions.WITHOUT_TEMPLATE()
  }
  if (!options.hasOwnProperty('view')) {
    throw ComponentExceptions.WITHOUT_VIEW()
  }
  if (!options.hasOwnProperty('elementName')) {
    throw ComponentExceptions.WITHOUT_TAGNAME()
  }
  if (typeof options.view != "string" && typeof options.view != "function") {
    throw ComponentExceptions.VIEW_MUST_BE_STRING_OR_FUNTION()
  }
}

function renderFactory(view) {
  return {
    render: function render(reRender) {
      if (!reRender) {
        renderElement(view, this)
      } else {
        patch(this, function(scope) {
          renderElement(view, scope)
        }, this)
      }
    }
  };
}

function renderElement (view, scope) {
  var result = view.bind(scope)();
  if (typeof result === 'function') {
    result.bind(scope)();
  }
}

function setStateFactory() {
  return {
    setState: function setState(newState, force = false) {
      this.state = Object.assign({}, this.state, newState);
      this.render(force);
      return this.state;
    }
  };
}

function renderChildFactory () {
  return {
    renderChildren (child = this.state.child) {
      if (typeof child  === 'string') {
        text(child)
      } else if (typeof child === 'function') {
        child()
      } else if (Array.isArray(child)) {
        child.forEach(this.renderChildren)
      }
    }
  }
}

function TagFactory (options = {}) {
  // validate Presence of necesary API elements
  validateRequiredFields(options)
  var CloneOptions = Object.assign({}, {name : options.elementName})
  delete Object.elementName
  Object.assign(options, renderFactory(options.view), setStateFactory(), renderChildFactory())
  return Builder(CloneOptions.name, options)
}

export default TagFactory
