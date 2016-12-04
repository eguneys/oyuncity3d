import * as THREE from 'three';
import { PlayerHud, Align } from './playerHud';
import settings from './settings';

module.exports = function Hud(data) {

  var playerHudWidth = settings.data.playerHudWidth;
  var playerHudHeight = settings.data.playerHudHeight;

  this.hud = createHud(data);

  this.roll = createRoll(data, this.hud);

  this.p1 = createPlayerHud(data, this.hud, Align.LEFT);

  this.p1.mesh.position.set(-320 + playerHudWidth / 2,
                            320 - playerHudHeight / 2,
                            0);

  this.p2 = createPlayerHud(data, this.hud, Align.RIGHT);

  this.p2.mesh.position.set(320 - playerHudWidth / 2,
                            -320 + playerHudHeight / 2,
                            0);
};

function createHud(data) {
  var hud = new THREE.Object3D();
  data.hudContainer.add(hud);

  return hud;
};

function createRoll(data, hud) {
  var button = new THREE.Sprite(data.materials.createSpriteMaterialFromTexture(data.textures.avatar1));
  hud.add(button);
};

function createPlayerHud(data, hud, align) {
  var playerHud = new PlayerHud(data, align);

  data.hudContainer.add(playerHud.mesh);
  return playerHud;
};
