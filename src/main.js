import * as THREE from 'three';
import { CameraController } from './camera';
import { Environment } from './environment';
import { Assets } from './assets';
import { Loop } from './loop';


function init(element, config = {}) {
  const data = {};

  data.width = element.clientWidth;
  data.height = element.clientHeight;

  data.canvas = element;

  initThree(data);
}

function initThree(data) {

  const { width, height } = data;

  data.render = () => {
    data.renderer.render(data.scene,
                         data.cameraController.camera);
  };

  data.update = () => {
  };

  const loop = new Loop(data);

  const onLoad = () => {
    data.scene = initScene();
    data.container = initContainer(data.scene);
    data.cameraController = new CameraController(width, height);
    data.renderer = initRenderer(data.canvas);

    data.environment = new Environment(data);
    loop.run();
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
