import 'document-register-element'
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
    element.setState(Object.assign({}, state, { child: child }))
  } else {
    renderChild(child)
  }
  elementClose(tagName)
  return element
}

function renderChild (child) {
  if (typeof child === 'undefined') { return }
  if (typeof child === 'string') {
    return text(child.trim())
  } else if (typeof child === 'function') {
    return child()
  } else if (Array.isArray(child)) {
    child.forEach(renderChild)
  } else {
    return child
  }
}

function ComponentFactory (object = {}) {
  object = Object.assign({}, DefaultComponentObject, object)
  var tag = TagFactory(object)
  return tag
}

function renderDOM (component, tag, state = {}) {
  return patch(tag, function(data) {
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
