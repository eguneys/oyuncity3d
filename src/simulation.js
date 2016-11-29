import tiles from './tiles';

function Simulation(ctrl) {

  this.createPBody = () => {
    var body = {
      currentTile: 0,
      moveTiles: [],
      position: tiles.getTilePosI(0)
    };
    return body;
  };

  this.update = (world, ts) => {
    for (var i = 0; i< world.players.length; i++) {
      var pBody = world.players[i];
      updatePlayerPosition(pBody);
    }
  };
}

function updatePlayerPosition(body) {
  if (body.tileForward !== null) {
    var tileForward = body.tileForward;
    body.tileForward = null;
    var currentTile = body.currentTile;
    for (var i = 0; i < tileForward; i++) {
      var nextPos = tiles.getTilePosI(i);
      body.moveTiles.push(nextPos);
    }
  }
}


module.exports = Simulation;
