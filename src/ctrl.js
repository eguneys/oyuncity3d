import * as THREE from 'three';
import Game from './game';
import settings from './settings';

module.exports = function(canvas, config) {
  this.data = config;

  this.data.game = new Game(this);

  this.initGame = () => {
    addPlayer(this.data, 0);
  };

  this.movePlayer = (player, tile) => {
    var data = this.data;

    player = data.world.players[player];
    player.nextTile = tile;
  };
};

function addPlayer(data, idx) {
  var player = {
    nextTile: 0
  };
  data.world.players[idx] = player;
  data.env.addPlayer(idx);
}
