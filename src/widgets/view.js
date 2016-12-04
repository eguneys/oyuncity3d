import * as THREE from 'three';


module.exports = function View(material, width, height) {
  this.sprite = new THREE.Sprite(material);
  
  this.width = width;
  this.height = height;

  this.sprite.scale.set(width, height, 1);
};
