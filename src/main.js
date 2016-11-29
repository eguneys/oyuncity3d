import api from './api';
import ctrl from './ctrl';
import view from './view';
import Assets from './assets';

function init(element, config = {}) {

  config.width = element.width;
  config.height = element.height;

  var apiValue = new api();

  new Assets(config, (data) => {
    var controller = new ctrl(element, data);

    view(element, controller.data);


    controller.initGame();
    controller.data.game.run();

    apiValue.init(controller);
  });

  return apiValue;
}

module.exports = init;
