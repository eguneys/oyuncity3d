import * as THREE from 'three';
import settings from './settings';

var geom = new THREE.CubeGeometry(
  settings.data.unitSize,
  settings.data.unitSize,
  settings.data.unitSize);

var avatarGeom = new THREE.PlaneGeometry(
  settings.data.avatarSize,
  settings.data.avatarSize);
var avatarGeom2 = new THREE.PlaneGeometry(
  settings.data.avatarSize - 2,
  settings.data.avatarSize - 5.5);

module.exports = function Player(data) {
  var avatar2 = new THREE.Mesh(avatarGeom2,
                               data.materials.avatar2);

  avatar2.position.setY(1.8);
  avatar2.position.setZ(-1);

  var avatarGroup = new THREE.Group();
  avatarGroup.add(avatar2);
  avatarGroup.add(new THREE.Mesh(avatarGeom,
                                 data.materials.avatar1));
  this.avatar = avatarGroup;
  this.mesh = new THREE.Mesh(geom,
                             data.materials.player);

  this.avatar.setRotationFromQuaternion(data.cameraController.camera.quaternion);
  // this.avatar.matrixAutoUpdate = false;

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

    this.avatar.position
      .set(thisX,
           thisY + settings.data.avatarSize * 2,
           thisZ);
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
