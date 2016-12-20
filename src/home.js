import * as THREE from 'three';
import settings from './settings';

var geom = new THREE.CubeGeometry(
  settings.data.unitSize,
  settings.data.unitSize,
  settings.data.unitSize);

module.exports = function Home(data) {

  this.height = 10;
  this.width = 10;
  var geom = data.geometries.home1.geometry;
  var material = new THREE.MeshLambertMaterial({
  });

  this.mesh = new THREE
    .Mesh(geom, material);

  this.position = {};

  this.targetScale = 4;

  this.updatePosition = () => {
    var x = this.position.x;
    var z = this.position.z;

    var thisY = settings.data.arenaElevation
        + settings.data.arenaDepth * 2;

    var thisX = x - this.height / 2;
    var thisZ = z - this.width / 2;

    this.mesh.position
        .set(0,
             0,
             0);

    this.mesh.scale.set(this.height,
                        this.width,
                        this.width);
  };

  this.setPosition = (pos) => {
    if (pos.x !== this.position.x ||
        pos.z !== this.position.z) {
      this.position.x = pos.x;
      this.position.z = pos.z;
      this.updatePosition();
    }
  };

  this.reset = (body) => {
    this.setPosition(body.position);
  };

  this.update = (body) => {
  };
};
