import * as THREE from 'three';
import Game from './game';
import settings from './settings';

module.exports = function(canvas, config) {
  this.data = config;

  this.data.game = new Game(this);
};
