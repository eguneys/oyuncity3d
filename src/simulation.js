import TweenMax from 'gsap';
import tiles from './tiles';
import settings from './settings';

function Simulation(ctrl) {

  this.createPBody = () => {
    var body = {
      currentTile: 0,
      tileForward: 0,
      moving: false,
      position: tiles.getTilePosI(0)
    };
    return body;
  };

  this.update = (world, ts) => {
    for (var i = 0; i< world.players.length; i++) {
      var pBody = world.players[i];
      updatePlayerPosition(world, pBody);
    }
  };
}

function updatePlayerPosition(world, body) {
  if (!body.moving && body.tileForward > 0) {
    body.moving = true;
    var tileForward = body.tileForward;

    var nextTile = body.currentTile + body.tileForward;
    var nextCorner = tiles.getNextCorner(body.currentTile);
    var cornerForward = (
      (nextCorner===0?4:nextCorner)
        * settings.data.rowTiles
        - body.currentTile);

    var duration = cornerForward * 0.1;

    if (tileForward > cornerForward) {
      nextTile = nextCorner * settings.data.rowTiles;
      body.tileForward = body.tileForward - cornerForward;
    } else {
      nextTile = nextTile % settings.data.totalTiles;
      body.tileForward = 0;
      duration = tileForward * 0.1;
    }

    var pos = tiles.getTilePosI(nextTile);
    TweenMax.to(body.position,
                duration,
                {
                  ease: 'linear',
                  x: pos.x,
                  z: pos.z,
                  onComplete: () => {
                    body.moving = false;
                    body.currentTile = nextTile;
                  }
                });
  }
}


module.exports = Simulation;
