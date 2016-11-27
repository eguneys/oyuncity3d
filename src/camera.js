import * as THREE from 'three';
import settings from './settings';


module.exports = CameraController;

function CameraController(w, h) {
  var camera = new THREE.PerspectiveCamera(
    settings.data.cameraFov,
    1,
    0.1,
    14000);

  this.camera = camera;

  camera.aspect = w / h;
  camera.updateProjectionMatrix();

  camera.position.set(120, 120, -120);
  this.target = new THREE.Vector3(0, 0, 0);
  camera.lookAt(this.target);
}
