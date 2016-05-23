import view from './view';

function render(element, obj) {
  var tag = obj.tag;
  var body = obj.children;
  element.innerHTML = `<${tag}>${body}</${tag}>`;
}

function init(element, config = {}) {
  var data = config.vm || "[gulpp]";
  render(element, view(data));
}

module.exports = init;
