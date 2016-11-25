import * as THREE from 'three';

module.exports = function(ctrl) {
  var scene = ctrl.data.scene;
  var camera = ctrl.data.camera;
  var renderer = ctrl.data.renderer;
  
  return {
    scene,
    camera,
    renderer
  };
};
