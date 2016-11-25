import * as THREE from 'three';

module.exports = function(config) {
  this.data = {};

  var width = config.width;
  var height = config.height;

  this.data.scene = new THREE.Scene();
  this.data.camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
  this.data.renderer = new THREE.WebGLRenderer();
  this.data.renderer.setSize(width, height);

  var geometry = new THREE.BoxGeometry(1, 1, 1);
  var material = new THREE.MeshBasicMaterial({ 
    color: 0x00ff00
  });
  var cube = new THREE.Mesh(geometry, material);
  this.data.scene.add(cube);

  this.data.camera.position.z = 5;
  this.data.camera.position.x = 4;
}
