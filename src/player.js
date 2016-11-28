import * as THREE from 'three';
import settings from './settings';

var geom = new THREE.CubeGeometry(
  settings.data.unitSize,
  settings.data.unitSize,
  settings.data.unitSize);

module.exports = function Player(data) {
  this.mesh = new THREE.Mesh(geom,
                             data.materials.player);

  this.getHeight = () => {
    return this.mesh.geometry.parameters.height;
  };

  this.getWidth = () => {
    return this.mesh.geometry.parameters.width;
  };

  this.reset = (x, z) => {
    this.mesh.position
      .set(x - this.getHeight() / 2,
           settings.data.arenaElevation +
           settings.data.arenaDepth * 2,
           z - this.getWidth() / 2);
  };
};
