import * as THREE from 'three';
import settings from './settings';
import View from './widgets/view';
import ViewGroup from './widgets/viewgroup';

export function PlayerHud(data, align) {
  var playerHudWidth = settings.data.playerHudWidth;
  var playerHudHeight = settings.data.playerHudHeight;

  var meshGroup = new ViewGroup(playerHudWidth,
                            playerHudHeight,
                            1);

  this.mesh = meshGroup.sprite;

  var hudBg = new View(data.materials.playerHud1, 1 ,1);
  this.mesh.add(hudBg.sprite);

  var hudImage = new View(
    data.materials
      .createSpriteMaterialFromTexture(
        data.textures.avatar1),
    0.7 * playerHudHeight / playerHudWidth,
    0.7 * playerHudWidth / playerHudWidth);

  var alignPos;
  if (align === Align.RIGHT) {
    alignPos = 0.5 - hudImage.width / 2;
  } else {
    alignPos = -0.5 + hudImage.width / 2;
  }

  hudImage.sprite.position.set(alignPos,
                               - 0.5 + hudImage.height / 2,
                               1);
  this.mesh.add(hudImage.sprite);
};

export const Align = {
  LEFT: 1,
  RIGHT: 2
};
