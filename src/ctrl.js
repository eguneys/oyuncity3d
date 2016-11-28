import * as THREE from 'three';
import Game from './game';
import settings from './settings';

module.exports = function(canvas, config) {
  this.data = config;

  this.data.game = new Game(this);

  this.initGame = () => {
    for (var i = 0; i < 6; i++) {
      this.data.env.addPlayer(i);
      this.data.env.addPlayer(i + 6);
      this.data.env.addPlayer(i + 12);
      this.data.env.addPlayer(i + 18);
    }
  };
};
