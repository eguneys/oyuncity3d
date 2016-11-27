import * as THREE from 'three';

module.exports = function(ctrl) {
  var scene = ctrl.data.scene;
  var cameraController = ctrl.data.cameraController;
  var renderer = ctrl.data.renderer;
  
  return {
    scene,
    cameraController,
    renderer
  };
};
