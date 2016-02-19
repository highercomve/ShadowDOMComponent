require('webcomponents-lite')
import TagFactory from './create'

const DefaultComponentObject = {
  getInitialState () {
    return {}
  }
}

function viewCompile (view) {
  return new Function("return `"+view+"`")
}

function renderFactory(tag, view) {
  var viewCompiler = viewCompile(view).bind(tag)
  return function render () {
    tag.innerHTML =  viewCompiler(tag)
  }
}

function setStateFactory (tag, render) {
  return function setState (newState) {
    tag.state = Object.assign({}, tag.state, newState)
    render()
    return tag.state
  }
}

function ComponentFactory (object = DefaultComponentObject) {
  var tag = TagFactory(object)
  tag.state = Object.assign({}, tag.getInitialState())
  tag.render = renderFactory(tag, tag.view)
  tag.setState = setStateFactory(tag, tag.render)

  tag.setState(tag.state)
  return tag
}

window.ComponentFactory = ComponentFactory

module.exports = ComponentFactory
