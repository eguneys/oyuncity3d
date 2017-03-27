import * as THREE from 'three';

function Materials(data) {
  
  this.arenaGrid = createArenaGrid(data);
}

function createArenaGrid(data) {
  return new THREE.MeshBasicMaterial({
    color: 0x00ff00
  });
}


export { Materials };
