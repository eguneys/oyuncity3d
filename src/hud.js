import * as THREE from 'three';
import { PlayerHud, Align } from './playerHud';
import settings from './settings';

export function Hud(data) {

  var playerHudWidth = settings.data.playerHudWidth;
  var playerHudHeight = settings.data.playerHudHeight;

  this.hud = createHud(data);

  this.roll = createRoll(data, this.hud);

  this.players = [];

  this.addPlayer = (player, align) => {
    var p, x, y;

    p = createPlayerHud(data, this.hud, align);

    switch (align) {
    case Align.LEFT:
      x = -320 + playerHudWidth / 2;
      y = 320 - playerHudHeight / 2;
      break;
    case Align.RIGHT:
      x = 320 - playerHudWidth / 2;
      y = - 320 + playerHudHeight / 2;
      break;
    }

    p.mesh.position.set(x, y, 0);

    this.players[player] = p;
  };

  this.currentTurn = 0;

  this.setPlayerTurn = (turn) => {
    if (turn != this.currentTurn) {
      this.players[this.currentTurn].setShine(false);

      this.currentTurn = turn;
      this.players[this.currentTurn].setShine(true);
    }
  };

  this.addPlayer(0, Align.LEFT);
  this.addPlayer(1, Align.RIGHT);

  this.players[this.currentTurn].setShine(true);

  var hudText = data.materials
    .createFontMesh("this bimtap text\n is rendered \n newline");
  var textLayout = hudText.geometry.layout;
  hudText.position.set(0, 0, 0);
  data.hudContainer.add(hudText);
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
