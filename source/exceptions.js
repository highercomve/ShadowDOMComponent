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
}

export default ComponentExceptions
