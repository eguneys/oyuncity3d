import * as THREE from 'three';

function CameraController(w, h) {
  const fov = 60,
        aspect = w / h,
        zNear = 1,
        zFar = 2000;

  const camera = new THREE.PerspectiveCamera(
    fov,
    aspect,
    zNear,
    zFar);

  camera.updateProjectionMatrix();

  this.camera = camera;

  this.basePosition = new THREE.Vector3(
    0,
    0,
    160
  );

  this.target = new THREE.Vector3(
    0, 0, 0
  );

  camera.position.copy(this.basePosition);

  camera.lookAt(this.target);


  // orthographic camera for hud 
  // https://www.evermade.fi/en/pure-three-js-hud/
  const width = w;
  const height = width / aspect;

  const orthoLeft = -width,
        orthoRight = width,
        orthoTop = height,
        orthoBottom = -height;

  const orthoCamera = new THREE.OrthographicCamera(
    orthoLeft,
    orthoRight,
    orthoTop,
    orthoBottom,
    -30,
    30
  );
  this.orthoCamera = orthoCamera;
  
}


export {
  CameraController
}
