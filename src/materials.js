import * as THREE from 'three';
import settings from './settings';

module.exports = function Materials(data) {

  this.overlay = createOverlayMaterial();


  this.terrain1 = new THREE.MeshLambertMaterial({
    color: settings.theme.terrainColor1,
    shading: THREE.FlatShading
  });

  this.terrain2 = new THREE.MeshLambertMaterial({
    color: settings.theme.terrainColor2,
    shading: THREE.FlatShading
  });

  this.arenaGrid = createArenaGrid(data);

  this.arenaBoardWrapper = createArenaBoardWrapper(data);
}

function createOverlayMaterial() {
  return new THREE.MeshBasicMaterial({
    color: 0x00ffff
  });
}

function createArenaGrid(data) {
  var gridTexture = data.textures.wood1;
  gridTexture.mapping = THREE.UVMapping;
  gridTexture.minFilter = THREE.LinearMipMapLinearFilter;
  gridTexture.magFilter = THREE.LineraFilter;
  gridTexture.wrapS = gridTexture.wrapT = THREE.RepeatWrapping;

  return new THREE.MeshBasicMaterial({
    map: gridTexture,
    transparent: true,
    depthWrite: true,
    uniforms: {
      tGrid: { type: 't', value: gridTexture }
    }
  });
}

function createArenaBoardWrapper(data) {
  return new THREE.MeshStandardMaterial({
    color: 0xf4a460
  });
}
