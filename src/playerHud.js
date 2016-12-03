import * as THREE from 'three';
import settings from './settings';

module.exports = function PlayerHud(data) {
  var playerHudWidth = settings.data.playerHudWidth;
  var playerHudHeight = settings.data.playerHudHeight;

  this.mesh = new THREE.Object3D();

  var hudBg = new THREE.Sprite(data.materials.playerHud1);
  this.mesh.add(hudBg);  

  var hudImage = new THREE.Sprite(data.materials.createSpriteMaterialFromTexture(data.textures.avatar1));
  hudImage.position.set(0, 0, 1);
  this.mesh.add(hudImage);

  this.mesh.scale.set(playerHudWidth, playerHudHeight, 1);
};
