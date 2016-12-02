import * as THREE from 'three';
import Game from './game';
import Simulation from './simulation';
import settings from './settings';

module.exports = function(canvas, config) {
  this.data = config;

  this.data.game = new Game(this);

  this.data.simulation = new Simulation(this);

  this.initGame = () => {
    addHome(this.data, 10);
    addPlayer(this.data, 0);
    addPlayer(this.data, 1);
  };

  this.movePlayer = (player, tileForward) => {
    var data = this.data;

    player = data.world.players[player];
    player.tileForward = tileForward;
  };
};

function addPlayer(data, idx) {
  var body = data.simulation.createPBody();

  data.world.players[idx] = body;
  data.env.addPlayer(idx, body);
}

function addHome(data) {
  var body = data.simulation.createHBody(5);

  data.env.addHome(0, body);
}
