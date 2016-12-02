import * as THREE from 'three';
import settings from './settings';

var geom = new THREE.CubeGeometry(
  settings.data.unitSize,
  settings.data.unitSize,
  settings.data.unitSize);

module.exports = function Home(data) {

  this.mesh = new THREE.Mesh(data.geometries.home1.geometry,

                             new THREE.MeshFaceMaterial(data.geometries.home1.materials));

  this.position = {};

  this.targetScale = 4;

  this.boundingBox = new THREE.Box3().setFromObject(this.mesh);

  this.getHeight = () => {
    return this.boundingBox.getSize().y;
  };

  this.getWidth = () => {
    return this.boundingBox.getSize().x;
  };

  this.updatePosition = () => {
    var x = this.position.x;
    var z = this.position.z;

    var thisY = settings.data.arenaElevation
        + settings.data.arenaDepth * 2;

    var thisX = x - this.getHeight() / 2;
    var thisZ = z - this.getWidth() / 2;

    this.mesh.position
        .set(thisX,
             thisY,
             thisZ);

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
