import ShadowDOMShim from './shadowdom-shim'

const DefaultCallbacks = {
  detachedCallback() {
    this.onUnMount()
    console.log('Was detached')
  },
  attributeChangedCallback() {
    console.log('Change attibute')
  },
  onMount() {} ,
  onUnMount() {},
  createdCallback() {
    if (typeof this.createShadowRoot === 'function') {
      this.shadow = this.createShadowRoot()
      this.shadow.innerHTML = this.template
    } else {
      ShadowDOMShim.writeStyle(this.template, this.nodeName)
    }
  }
}

function createDefaultCallbacks (callbacks) {
  return Object.assign({}, createObjDescriptor(DefaultCallbacks), createObjDescriptor(callbacks))
}

function createObjDescriptor (obj) {
  let objDescriptor = {}
  Object.keys(obj).forEach((prop) => {
    objDescriptor[prop] = {value: obj[prop]}
  })
  return objDescriptor
}

function SetListeners(events = []) {
  return {
    attachedCallback () {
      try {
        console.log('Element attach', this)
        this.onMount()
        events.forEach(function(event) {
          this.addEventListener(event.type, function(e) {
            if (e.target && e.target.matches(event.selector)) {
              event.callback.bind(this)(e)
            }
          }.bind(this))
        }.bind(this))
      } catch(e) {
        console.log(e)
      }
    }
  }
}

function Builder (tagName, options) {
  let optionsDescriptor = Object.assign({} ,
    createDefaultCallbacks(options),
    createObjDescriptor(SetListeners(options.events))
  )
  optionsDescriptor.state = Object.assign({}, optionsDescriptor.state, {
    enumerable: true,
    writable: true
  })
  let TagPrototype = Object.create(HTMLElement.prototype, optionsDescriptor)
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
