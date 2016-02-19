import Builder from './builder'
import ComponentExceptions from './exceptions'

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
}

function TagFactory (options = {}) {
  // validate Presence of necesary API elements
  validateRequiredFields(options)
  var CloneOptions = Object.assign({}, {name : options.elementName})
  delete Object.elementName
  return Builder(CloneOptions.name, options)
}

export default TagFactory
