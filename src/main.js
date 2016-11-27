import ctrl from './ctrl';
import view from './view';
import Assets from './assets';

function render(data) {
  data.renderer.render(data.scene,
                       data.cameraController.camera);
}

function init(element, config = {}) {

  config.width = 640;
  config.height = 480;

  new Assets(config, (data) => {
    var controller = new ctrl(element, data);

    controller.data.render = () => {
      render(view(controller));
    };
    controller.data.renderRAF = function() {
      window.requestAnimationFrame(ctrl.data.render);
    };

    controller.data.render();
  });
}




module.exports = init;
