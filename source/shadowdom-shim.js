'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

function extractStyle(template, tagName) {
  tagName = tagName.toLowerCase();
  var newTemplate = template.replace(/\:\:content/mg, tagName).replace(/\:host\((.*)\)/mg, tagName + '.$1').replace(/\:host/mg, tagName);

  return extractTagContent(newTemplate, 'style');
}

function extractTagContent(template, tag) {
  var dummy = document.createElement('div');
  dummy.innerHTML = template;
  return dummy.querySelector(tag);
}

function removeStyle(template) {
  return template.replace(styleRegex, '');
}

function extractContent(template) {
  return extractTagContent(template, 'content');
}

function writeStyle() {
  var template = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var tagName = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

  var styleElement = extractStyle(template, tagName);
  if (styleElement) {
    document.head.appendChild(styleElement);
  }
  return styleElement;
}

exports.default = {
  writeStyle: writeStyle
};