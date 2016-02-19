import Shaco from 'shadow-component'

var state = {
  items: [
    { text: "Primera tarea", ready: false }
  ]
}

var defaultItem = {
  text: '',
  ready: false,
  index: 0,
}

var TodoItem = Shaco.ComponentFactory({
  elementName: "todo-item",
  state: defaultItem,
  template: "<content></content>",
  view: [
    '<input class="text" type="text" value="${this.state.text}">',
    '<input class="checkbox" type="checkbox" ${(this.state.ready) ? "checked":""}>'
  ].join(''),
  onTextChange(e) {

  },
  events: [
    {
      selector: 'input.checkbox',
      type: 'click',
      callback: function(e) {
        console.log(e)
        console.log(this.state)
        state.items[this.state.index].ready = this.state.ready = (this.state.ready) ? false:true
        this.render()
      }
    },
    {
      selector: 'input.text',
      type: 'change',
      callback: function(e) {
        console.log(e)
        console.log(this.state)
        state.items[this.state.index].text = this.state.text = e.target.value
        this.render()
      }
    }
  ]
})

var TodoList = Shaco.ComponentFactory({
  elementName: "todo-list",
  state: state,
  template: "<content></content>",
  view: function() {
    return this.state.items.map((item, index) => {
      console.log('item inside list',item)
      var itemState = Object.assign(item, {index: index})
      return Shaco.createElement('todo-item', itemState)
    })
  }
})

var TodoApp = Shaco.ComponentFactory({
  elementName: "todo-app",
  state: state ,
  template: `
    <header>
      <h1>This is a Todo list with Shaco</h1>
    </header>
    <div class="content">
      <content></content>
    </div>
  `,
  view: function() {
    return [
      Shaco.createElement('todo-list', { items: this.state.items })
   ]
  }
})

document.getElementById('TodoApp').appendChild(TodoApp)
