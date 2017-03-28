import * as THREE from 'three';

function Hud(data) {
  this.container = initContainer(data);

  addBunchOfText(data, this.container);
}

function addBunchOfText(data, container) {

  const material = new THREE.MeshBasicMaterial({
    color: 0xffff00
  });

  const geometry = new THREE.PlaneGeometry(190, 100);

  const plane = new THREE.Mesh(geometry, material);

  container.add(plane);
  
}

function initContainer(data) {
  const container = new THREE.Object3D();
  data.hudScene.add(container);
  return container;
}

export { Hud }
