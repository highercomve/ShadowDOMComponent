import Builder from './builder'
import ComponentExceptions from './exceptions'
import { patch } from 'incremental-dom'

if (!Array.isArray) {
  Array.isArray = function(arg) {
    return Object.prototype.toString.call(arg) === '[object Array]';
  };
}

function validateRequiredFields (options) {
  if (!options.hasOwnProperty('template')) {
    throw ComponentExceptions.WITHOUT_TEMPLATE
  }
  if (!options.hasOwnProperty('view')) {
    throw ComponentExceptions.WITHOUT_VIEW
  }
  if (!options.hasOwnProperty('elementName')) {
    throw ComponentExceptions.WITHOUT_TAGNAME
  }
  if (typeof options.view != "string" && typeof options.view != "function") {
    throw ComponentExceptions.VIEW_MUST_BE_STRING_OR_FUNTION
  }
}

function renderFactory(view) {
  return {
    render () {
      let result = view.bind(this)()
      if (typeof result === 'function') {
        result.bind(this)()
      }
    }
  }
}

function setStateFactory () {
  return {
    setState (newState) {
      this.state = Object.assign({}, this.state, newState)
      this.render()
      return this.state
    }
  }
}

function TagFactory (options = {}) {
  // validate Presence of necesary API elements
  validateRequiredFields(options)
  var CloneOptions = Object.assign({}, {name : options.elementName})
  delete Object.elementName
  Object.assign(options, renderFactory(options.view), setStateFactory())
  return Builder(CloneOptions.name, options)
}

export default TagFactory
