import ctrl from './ctrl';
import view from './view';

function render(data) {
  data.renderer.render(data.scene, data.camera);
}

function init(element, config = {}) {

  var width = 640;
  var height = 480;

  config.width = width;
  config.height = height;
  
  var controller = new ctrl(config);
  element.appendChild(controller.data.renderer.domElement);

  controller.data.render = () => {
    render(view(controller));
  };
  controller.data.renderRAF = function() {
    window.requestAnimationFrame(ctrl.data.render);
  };
  controller.data.render();
}

module.exports = init;
