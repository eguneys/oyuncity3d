import * as THREE from 'three';
import { CameraController } from './camera';
import { Environment } from './environment';
import { Hud } from './hud';
import { World } from './world';
import { Assets } from './assets';
import GameLoop from 'gameloop';

function init(element, config = {}) {
  const data = {};

  data.width = element.clientWidth;
  data.height = element.clientHeight;

  data.canvas = element;

  initThree(data);
}

function initThree(data) {

  data.renderer = initRenderer(data.canvas);

  const onRender = () => {
    data.renderer.render(data.scene,
                         data.cameraController.camera);

    data.renderer.render(data.hudScene,
                         data.cameraController.orthoCamera);

    data.cameraController.update();
  };

  const onUpdate = (interval, time) => {
    data.environment.update(interval, time);
  };

  data.loop = GameLoop();

  data.loop.on('update', onUpdate);
  data.loop.on('draw', onRender);
  
  const onLoad = () => {
    data.scene = initScene();
    data.hudScene = initScene();
    data.container = initContainer(data.scene);
    data.cameraController = new CameraController(data.width, data.height);

    data.world = new World(data);

    data.environment = new Environment(data);
    data.hud = new Hud(data);

    data.loop.start();
  };

  data.assets = new Assets(data, onLoad);
}

function initScene() {
  const scene = new THREE.Scene();
  return scene;
}

function initContainer(scene) {
  var container = new THREE.Object3D();
  scene.add(container);
  return container;
}

function initRenderer(canvas) {
  const w = canvas.clientWidth,
        h = canvas.clientHeight;

  const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true,
    precision: 'highp',
    alpha: false
  });

  renderer.sortObjects = false;
  renderer.autoClear = false;
  renderer.setSize(w, h);

  return renderer;  
}

export default init;
