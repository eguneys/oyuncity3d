import util from './util';

const { requestAnimationFrame,
        now } = util;

function Loop(data) {
  this.running = false;
  this.paused = false;


  const loopTimestep = 60,
  maxUpdatesPerFrame = 16;

  this.run = () => {

    var currentTime = now(),
        accumulator = 0.0,
        loop = this;

    function go() {
      if (loop.isRunning) {
        requestAnimationFrame(go);
      }

      const timestep = loopTimestep;
      const frameStart = now();

      if (!loop.isPaused) {
        var newTime = now(),
            deltaTime = newTime - currentTime,
            maxDeltaTime = timestep * maxUpdatesPerFrame;

        currentTime = newTime;

        if (deltaTime > maxDeltaTime) {
          deltaTime = maxDeltaTime;
        }


        // update
        accumulator += deltaTime;
        while (accumulator >= timestep) {
          loop.update(timestep);
          accumulator -= timestep;
          if (!loop.running) {
            break;
          }          
        }
      }

      // render
      loop.render(accumulator / timestep);
    }

    this.isRunning = true;
    go();
  };

  this.update = () => {
    var ts = loopTimestep;
    // update world
    data.update(ts);
  };

  this.render = () => {
    data.render();
  };

};


export { Loop };
