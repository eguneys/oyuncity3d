import * as THREE from 'three';


module.exports = function ViewGroup(width, height) {
  this.sprite = new THREE.Group();
  
  this.width = width;
  this.height = height;

  this.sprite.scale.set(width, height, 1);

  this.add = (child) => {
    this.sprite.add(child);
  };
};
