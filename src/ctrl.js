import * as THREE from 'three';
import Game from './game';
import settings from './settings';

module.exports = function(canvas, config) {
  this.data = config;

  this.data.game = new Game(this);

  this.initGame = () => {
    addPlayer(this.data, 0);
  };
};

function addPlayer(data, idx) {
  var player = {
    tileIdx: 0
  };
  data.game.world.players[idx] = player;
  data.env.addPlayer(idx);
}
