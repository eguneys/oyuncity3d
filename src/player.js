import * as THREE from 'three';
import settings from './settings';

var geom = new THREE.CubeGeometry(
  settings.data.unitSize,
  settings.data.unitSize,
  settings.data.unitSize);

module.exports = function Player(data) {
  this.mesh = new THREE.Mesh(geom,
                             data.materials.player);

  this.position = {};

  this.getHeight = () => {
    return this.mesh.geometry.parameters.height;
  };

  this.getWidth = () => {
    return this.mesh.geometry.parameters.width;
  };

  this.updatePosition = () => {
    var x = this.position.x;
    var z = this.position.z;

    this.mesh.position
      .set(x - this.getHeight() / 2,
           settings.data.arenaElevation +
           settings.data.arenaDepth * 2,
           z - this.getWidth() / 2);
  };

  this.reset = (body) => {
    this.setPosition(body.position);
  };

  this.setPosition = (pos) => {
    if (pos.x !== this.position.x ||
        pos.z !== this.position.z) {
      this.position.x = pos.x;
      this.position.z = pos.z;
      this.updatePosition();
    }

  };

  this.update = (body) => {
    this.setPosition(body.position);
  };
};
