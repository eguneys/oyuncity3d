import view from './view';
import cats from 'cat-ascii-faces';

const ctrl = {
  data: {
    face: cats(),
  }
};

function render(element, obj) {
  var tag = obj.tag;
  var body = obj.children;
  element.innerHTML = `<${tag}>${body}</${tag}>`;
}

function init(element, config = {}) {
  var msg = config.msg || "[gulpp]";

  ctrl.data.msg = msg;

  ctrl.data.render = () => {
    render(element, view(ctrl));
  };
  ctrl.data.renderRAF = function() {
    window.requestAnimationFrame(ctrl.data.render);
  };
  ctrl.data.render();
}

setInterval(() => {
  ctrl.data.face = cats();
  ctrl.data.renderRAF();
}, 1000 + (Math.random() * 4000));

module.exports = init;
