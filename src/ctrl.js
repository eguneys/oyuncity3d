import * as THREE from 'three';
import Game from './game';
import settings from './settings';

module.exports = function(canvas, config) {
  this.data = config;

  this.data.game = new Game(this);

  this.initGame = () => {
    this.data.env.addPlayer(10);
    this.data.env.addPlayer(11);
    this.data.env.addPlayer(12);
    this.data.env.addPlayer(13);
  };
};
