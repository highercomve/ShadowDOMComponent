var Shaco = Shaco.default
var state = {
  items: [
    { text: "Primera tarea", ready: false },
    { text: "Segunda tarea", ready: false },
    { text: "Tercera tarea", ready: false }
  ]
}

var defaultItem = {
  text: '',
  ready: false,
  index: 0,
}

var TodoItem = Shaco.ComponentFactory({
  elementName: "todo-item",
  state: defaultItem, // default state must be defined
  template: "<content></content>",
  view: function () {
    var checked = this.state.ready ? { checked: true } : { }
    Shaco.createElement('input', null, {}, {
        type: 'text',
        class: 'text',
        value: `${this.state.text}`,
        onkeyup: () => {
          console.log(this.state)
        }
    })
    Shaco.createElement('input', null, {}, Object.assign({
      type: 'checkbox',
      class: 'checkbox',
      onclick: () => {
        this.setState({ready: !this.state.ready})
        console.log(this.state)
      }
    }, checked))
  }
})

var TodoList = Shaco.ComponentFactory({
  elementName: "todo-list",
  state: { items: [] }, // default state must be defined
  template: "<content></content>",
  view: function () {
    console.log(this.state.items)
    this.state.items.map((item, index) => {
      item.index = index
      Shaco.createElement('todo-item', index, item)
    })
  }
})

var TodoApp = Shaco.ComponentFactory({
  elementName: "todo-app",
  state: { items: []}, // default state definition
  template: `
  <header>
  <h1>This is a Todo list with Shaco</h1>
  </header>
  <div class="content">
  <content></content>
  </div>
  `,
  view: function () {
    Shaco.createElement('todo-list', null, state)
  }
})

Shaco.renderDOM('todo-app', document.getElementById('TodoApp'), state)
