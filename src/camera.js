import * as THREE from 'three';

function CameraController(w, h) {
  const fov = 60,
        aspect = w / h,
        zNear = 1,
        zFar = 2000;

  var camera = new THREE.PerspectiveCamera(
    fov,
    aspect,
    zNear,
    zFar);

  camera.updateProjectionMatrix();

  this.camera = camera;

  this.basePosition = new THREE.Vector3(
    0,
    -100,
    250
  );

  this.target = new THREE.Vector3(
    0, 0, 0
  );

  camera.position.copy(this.basePosition);

  // camera.lookAt(this.target);
}


export {
  CameraController
}
