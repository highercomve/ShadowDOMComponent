var DefaultCallbacks = {
  detachedCallback: function detachedCallback() {
    console.log(this)
    this.onUnMount()
    console.log('Was detached')
  },
  attributeChangedCallback: function attributeChangedCallback() {
    console.log(this)
    console.log('Change attibute')
  },
  onMount () {},
  onUnMount () {}
}

function createDefaultCallbacks (callbacks) {
  return Object.assign({}, DefaultCallbacks, {
    createdCallback: function createdCallback() {
      this.shadow = this.createShadowRoot()
      this.shadow.innerHTML = this.template
    }
  }, callbacks)
}

function SetListeners(events = []) {
  return {
    attachedCallback () {
      var tag = this
      this.onMount()
      events.forEach(function(event) {
        tag.addEventListener(event.type, function(e) {
          if (e.target && e.target.matches(event.selector)) {
            event.callback.bind(tag)(e)
          }
        })
      })
    }
  }
}

function Builder (tagName, options) {
  let TagPrototype = Object.create(HTMLElement.prototype)
  Object.assign(TagPrototype, createDefaultCallbacks(options), SetListeners(options.events))
  try {
    let tagNameElement = document.registerElement(tagName, {
      prototype: TagPrototype
    })
    return new tagNameElement()
  }
  catch(e) {
    return document.createElement(TagName)
  }
}

export default Builder
