import ctrl from './ctrl';
import view from './view';
import Assets from './assets';

function init(element, config = {}) {

  config.width = element.width;
  config.height = element.height;

  new Assets(config, (data) => {
    var controller = new ctrl(element, data);

    view(element, controller.data);

    controller.data.game.run();
  });
}

module.exports = init;
