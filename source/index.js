require('webcomponents-lite')
import {
  elementOpenStart,
  elementOpenEnd,
  elementClose,
  attr,
  text,
  patch
} from 'incremental-dom'
import TagFactory from './create'

const DefaultComponentObject = {
  state: {}
}

function createElement(tagName, key = null, state = {}, options = {}, child) {
  elementOpenStart(tagName, key)
  Object.keys(options).forEach((option) => {
    attr(option, options[option])
  })
  elementOpenEnd(tagName)
  if (typeof child === 'string') {
    text(child)
  }
  if (typeof child !== 'undefined') {
    if (Array.isArray(child)) {
      child.forEach(function(appendableView) {
        appendableView
      })
    } else {
      child
    }
  }
  let element = elementClose(tagName)
  if (typeof element.setState !== 'undefined') {
    element.setState(state)
  }
  return element
}

function ComponentFactory (object = {}) {
  object = Object.assign({}, DefaultComponentObject, object)
  var tag = TagFactory(object)
  return tag
}

function renderDOM (component, tag, state = {}) {
  patch(tag, function() {
    Shaco.createElement(component, null, state)
  })
}

var Shaco = {
  ComponentFactory,
  createElement,
  renderDOM,
  patch
}


export default Shaco
