import util from './util';
import settings from './settings';
import World from './world';

const { requestAnimationFrame,
        now } = util;

module.exports = function(ctrl) {
  var data = ctrl.data;

  this.running = false;
  this.paused = false;

  data.world = new World();

  this.run = () => {

    var currentTime = now(),
        accumulator = 0.0,
        game = this;

    function loop() {
      if (game.isRunning) {
        requestAnimationFrame(loop);
      }
      var timestep = settings.data.timestep;
      var frameStart = now();

      if (!game.paused) {
        var newTime = now(),
            deltaTime = newTime - currentTime,
            maxDeltaTime = timestep * settings.data.maxUpdatesPerFrame;
        currentTime = newTime;

        // note: max frame time to avoid sod
        if (deltaTime > maxDeltaTime){
          deltaTime = maxDeltaTime;
        }

        // update
        accumulator += deltaTime;
        while (accumulator >= timestep) {
          // update game
          game.update(timestep);
          accumulator -= timestep;
          if (!game.running) {
            break;
          }
        }

        // render
        game.render(accumulator / timestep);
      }
    }
    this.isRunning = true;
    loop();
  };

  this.update = () => {
    var ts = settings.data.timestep;
    // update world
    data.simulation.update(data.world, ts);
    data.cameraController.update(data.world, ts);
    data.env.update(data.world, ts);
  };

  this.render = () => {
    data.render();
  };
};
