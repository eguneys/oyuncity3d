import TweenMax from 'gsap';
import * as THREE from 'three';
import settings from './settings';


module.exports = CameraController;

function CameraController(w, h) {

  this.basePosition = new THREE.Vector3(
    settings.data.cameraX,
    settings.data.cameraDepth,
    settings.data.cameraX    
  );

  this.toPosition = new THREE.Vector3(0,
                                      settings.data.cameraDepth,
                                      0);

  this.toTarget = new THREE.Vector3(0,0,0);

  var camera = new THREE.PerspectiveCamera(
    settings.data.cameraFov,
    1,
    0.1,
    14000);

  this.camera = camera;

  camera.aspect = w / h;
  camera.updateProjectionMatrix();

  camera.position.copy(this.basePosition);
  this.target = new THREE.Vector3(
    -10, 
    0,
    -10);

  camera.lookAt(this.target);

  this.moveCamera = (pointData) => {

    this.toPosition.set(
      pointData.x,
      pointData.y,
      pointData.z);    


    this.camera.position.copy(this.toPosition);
  };

  this.tweenCamera = (pointData, onComplete) => {
    TweenMax.to(this.camera.position, 0.3, {
      x: pointData.x,
      y: pointData.y,
      z: pointData.z,
      onComplete: onComplete
    });
  };

  this.update = (world, alpha) => {
    if (this.cameraUpdateFunc) {
      this.cameraUpdateFunc(world);
    }
  };

  this.followBody = (body) => {
    var offsetX = 160;
    var offsetZ = 160;
    this.toPosition.set(body.position.x + offsetX,
                        settings.data.cameraDepth * 0.6,
                        body.position.z + offsetZ);
    this.tweenCamera(this.toPosition, () => {
      this.cameraUpdateFunc = (world) => {
        this.toPosition.setX(body.position.x + offsetX);
        this.toPosition.setZ(body.position.z + offsetZ);
        this.moveCamera(this.toPosition);
      };
    });
  };

  this.unfollow = () => {

    this.tweenCamera(this.basePosition);
    // this.camera.lookAt(this.target);
    this.cameraUpdateFunc = () => {};
  };
}
