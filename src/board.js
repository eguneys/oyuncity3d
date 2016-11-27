import Materials from './materials';
import * as THREE from 'three';

function createBoard(data) {
  var container = data.container;


  var geometry = new THREE.Geometry();
  geometry.vertices.push(new THREE.Vector3(0, 0, 0));
  geometry.vertices.push(new THREE.Vector3(500, 0, 0));
  geometry.vertices.push(new THREE.Vector3(0, 0, 0));
  geometry.vertices.push(new THREE.Vector3(0, 500, 0));
  geometry.vertices.push(new THREE.Vector3(0, 0, 0));
  geometry.vertices.push(new THREE.Vector3(0, 0, 500));
  geometry.vertices.push(new THREE.Vector3(0, 0, 0));

  var material = new THREE.LineBasicMaterial({ 
    color: 0xcccccc
  });
  var cube = new THREE.Line(geometry, material);

  container.add(cube);
}

module.exports = {
  createBoard
};
