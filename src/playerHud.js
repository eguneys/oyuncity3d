import TweenMax from 'gsap';
import * as THREE from 'three';
import settings from './settings';
import TextView from './widgets/font';
import View from './widgets/view';
import ViewGroup from './widgets/viewgroup';

export function PlayerHud(data, align) {
  var playerHudWidth = settings.data.playerHudWidth;
  var playerHudHeight = settings.data.playerHudHeight;

  var meshGroup = new ViewGroup(playerHudWidth,
                            playerHudHeight,
                            1);

  this.mesh = meshGroup.sprite;

  var hudBg = new View(data.materials
                       .createSpriteMaterialFromTexture(
                         data.textures.bgbutton),
                       1.24 ,1.24);
  this.hudShine = new View(data.materials
                        .createSpriteMaterialFromTexture(
                          data.textures.shine),
                       1.24 ,1.24);
  this.mesh.add(hudBg.sprite);
  this.mesh.add(this.hudShine.sprite);

  
  var hudImage = new View(
    data.materials
      .createSpriteMaterialFromTexture(
        data.textures.avatar1),
    0.7 * playerHudHeight / playerHudWidth,
    0.7 * playerHudWidth / playerHudWidth);

  var alignPos;
  var paddingBottom = 0.1 * playerHudHeight / playerHudWidth;
  var paddingHorizontal = 0;

  if (align === Align.RIGHT) {
    alignPos = 0.5 - hudImage.width / 2 - paddingHorizontal;
  } else {
    alignPos = -0.5 + hudImage.width / 2 + paddingHorizontal;
  }


  hudImage.sprite.position
    .set(alignPos,
         - 0.5 + hudImage.height / 2 + paddingBottom,
         1);
  this.mesh.add(hudImage.sprite);

  var material = this.hudShine.sprite.material;
  this.shineTween = TweenMax.to(material, 0.8, {
    opacity: 0.6,
    repeat: -1,
    yoyo: true
  });

  this.setShine = function(shine) {
    if (shine) {
      this.shineTween.play();
    } else {
      this.shineTween.pause();
      this.hudShine.sprite.material.opacity = 0;
    }
  };

  this.setShine(false);
};

export const Align = {
  LEFT: 1,
  RIGHT: 2
};
