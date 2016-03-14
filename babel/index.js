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
  let element = elementOpenEnd(tagName)
  if (typeof element.setState !== 'undefined') {
    element.setState(state)
  }
  if (typeof child !== 'undefined') {
    if (Array.isArray(child)) {
      child.forEach(function(appendableView) {
        appendableView()
      })
    } else if (typeof child === 'string') {
      text(child)
    } else {
      child()
    }
  }
  elementClose(tagName)
  return element
}

function ComponentFactory (object = {}) {
  object = Object.assign({}, DefaultComponentObject, object)
  var tag = TagFactory(object)
  return tag
}

function renderDOM (component, tag, state = {}) {
  patch(tag, function(data) {
    Shaco.createElement(component, null, data)
  }, state)
}

var Shaco = {
  ComponentFactory,
  createElement,
  renderDOM,
  patch
}


export default Shaco
