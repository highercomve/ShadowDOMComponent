This is Shaco
==============

Shaco is a simple experiment with Shadow DOM and "component", Shaco permit you create Components that use Shado DOM templates.

This will create a new custom HTML element and inside will put you Shadow DOW template. Shaco use Incremental DOM from Google in order to render components

A Shaco Component is created in this way:

```js
Shaco.ComponentFactory({
	elementName: string // The name of the new custom html tag
	state(), // default state
	onMount(), // This is a callback attached to the native callback 'attachedCallback' for the custom element
	onUnMount(), // This is a callback attachedt to the native calbback 'detachedCallback' for the custom element
	template: string, // Define the Shadow DOM template
	view: string | function, // This define how you custom element will render when state chage. The function must use Shaco.createElement sintax
	// Events will be decrated
	events: Array // This is an array on Event (A Object that need Shaco to delagate listeners), the espeficication is below
})
```

The other 2 important concepts are:

- The Shaco.createElement
- Event Object

### The Shaco.createElement

This is a function that create a new HTML element, this element could be assigned to your custom element innerHTML

```js
Shaco.createElement(TagName, key, state, DOMElementAttributesObj, Child)
```

- TagName: This is the name of the element to create, could be a estandar HTML tag or a custom Tag (like one component created with shaco)
- key: in order to indentify array of elements, use it when you map over and array of objects
- state: If the tag is a Shaco Component, this will be the initial state of the component
- DOMElementAttributesObj: Whatever DOM element attibute that is right now supported, like style or class, etc.
- Child: Another Shaco.createElement or a string that will be inside the element created

### Event Object

IMPORTANT: This is no longer required. Now you use normal events on Shaco.createElement

The event object will be used to delegate listeners on the Component. This is the structure of the Event Objet:

```js
{
	selector: string, // this is the Child selector for the delagation
	type:  string, // the normal set of events for the function addEventListeners
	calback: function // the function that will be excuted when the event is fire
}
```

### Example

This is an example of how to use Shaco, see the example folder or the TODO example in this (Repository)[https://github.com/highercomve/shaco-todo]
