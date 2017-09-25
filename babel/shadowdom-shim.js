
function extractStyle (template, tagName) {
  tagName = tagName.toLowerCase()
  let newTemplate = template
  .replace(/\:\:content/mg, tagName)
  .replace(/\:host\((.*)\)/mg, `${tagName}.$1`)
  .replace(/\:host/mg, tagName)

  return extractTagContent(newTemplate, 'style')
}

function extractTagContent (template, tag) {
  let dummy = document.createElement('div')
  dummy.innerHTML = template
  return dummy.querySelector(tag)
}

function removeStyle (template) {
  return template.replace(styleRegex, '')
}

function extractContent (template) {
  return extractTagContent(template, 'content')
}

function writeStyle (template = '', tagName = '') {
  var styleElement = extractStyle(template, tagName)
  if (styleElement) {
    document.head.appendChild(styleElement)
  }
  return styleElement
}

export default {
  writeStyle
}
