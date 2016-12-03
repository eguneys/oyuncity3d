import * as THREE from 'three';
import settings from './settings';

var geom = new THREE.CubeGeometry(
  settings.data.unitSize,
  settings.data.unitSize,
  settings.data.unitSize);

module.exports = function Player(data) {

  this.avatar = new THREE.Group();

  var avatarImage = new THREE.Sprite(
    data.materials
      .createSpriteMaterialFromTexture(
        data.textures.avatar1));
  this.avatar.add(avatarImage);
  var bubble = new THREE.Sprite(
    data.materials
      .createSpriteMaterialFromTexture(
        data.textures.bubble));
  this.avatar.add(bubble);

  this.mesh = new THREE.Mesh(geom,
                             data.materials.player);
  
  this.mesh.add(this.avatar);

  // this.avatar.setRotationFromQuaternion(data.cameraController.camera.quaternion);
  // this.avatar.matrixAutoUpdate = false;

  var scaleVector = new THREE.Vector3();
  var scaleFactor = 24;

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

    var thisY = settings.data.arenaElevation
        + settings.data.arenaDepth * 2;

    var thisX = x - this.getHeight() / 2;
    var thisZ = z - this.getWidth() / 2;

    this.mesh.position
      .set(thisX,
           thisY,
           thisZ);

    var scale = scaleVector.subVectors(
      this.mesh.position,
      data.cameraController.camera.position).length() /
        scaleFactor;

    this.avatar.scale.set(scale, scale, 1);
    this.avatar.position
      .set(0,
           thisY + settings.data.avatarSize,
           0);
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
