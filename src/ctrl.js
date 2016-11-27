import * as THREE from 'three';
import Geometry from './geometry';
import Environment from './environment';
import CameraController from './camera';
import settings from './settings';

module.exports = function(canvas, config) {
  this.data = config;

  var width = canvas.width;
  var height = canvas.height;

  this.data.scene = createScene();
  this.data.container = createContainer(this.data.scene);
  this.data.cameraController = new CameraController(width, height);
  this.data.renderer = createRenderer(canvas);

  this.data.env = new Environment(this.data);
}

function createContainer(scene) {
  var gameContainer = new THREE.Object3D();
  scene.add(gameContainer);
  return gameContainer;
}

function createScene() {
  var scene = new THREE.Scene();
  return scene;
}

function createRenderer(canvas) {
  var w = canvas.width,
      h = canvas.height;

  var precision = 'highp';
  var renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: settings.data.antialias,
    precision: precision,
    alpha: false
  });
  renderer.sortObjects = false;
  renderer.autoClear = false;
  renderer.setSize(w, h);

  return renderer;
}
