import * as THREE from 'three';

function Materials(data) {
  
  this.arenaGrid = createArenaGrid(data);

  this.glass = createGlass(data);
}

function createGlass(data) {
  return new THREE.MeshBasicMaterial({
    color: 0xff0000
  });  
}

function createArenaGrid(data) {
  return new THREE.MeshBasicMaterial({
    color: 0x00ff00
  });
}


export { Materials };
