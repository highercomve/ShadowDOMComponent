var ComponentExceptions = {
  WITHOUT_TEMPLATE()  {
    return new Error('ComponentWithOutTemplate, The new component need a Template')
  },
  WITHOUT_VIEW() {
    return new Error('ComponentWithOutView, The new component must have a view rendering')
  },
  WITHOUT_TAGNAME() {
    new Error('ComponentWithPutTagName, You can\'t create a component without the tagName, you must pass that to ComponentFactory')
  },
  VIEW_MUST_BE_STRING_OR_FUNTION() {
    new Error("ComponentViewMustBeAStringOrFunction The attribute view must be a string or a funtion.")
  }
};


export default ComponentExceptions
