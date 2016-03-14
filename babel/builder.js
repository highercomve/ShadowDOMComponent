var DefaultCallbacks = {
  detachedCallback: function detachedCallback() {
    this.onUnMount()
    console.log('Was detached')
  },
  attributeChangedCallback: function attributeChangedCallback() {
    console.log('Change attibute')
  },
  onMount () {},
  onUnMount () {}
}

function createDefaultCallbacks (callbacks) {
  return Object.assign(DefaultCallbacks, {
    createdCallback: function createdCallback() {
      this.shadow = this.createShadowRoot()
      this.shadow.innerHTML = this.template
    }
  }, callbacks)
}

function SetListeners(events = []) {
  return {
    attachedCallback () {
      console.log('Element attach', this)
      this.onMount()
      events.forEach(function(event) {
        this.addEventListener(event.type, function(e) {
          if (e.target && e.target.matches(event.selector)) {
            event.callback.bind(this)(e)
          }
        }.bind(this))
      }.bind(this))
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
    console.log(e)
    return document.createElement(tagName)
  }
}

export default Builder
