import * as THREE from 'three';

module.exports = function Textures() {
  this.textureLoader = new THREE.TextureLoader();

  this.textureData = [
    { id: 'wood1', path: '/assets/wood1.jpg' }
  ];

  this.totalFiles = this.textureData.length;
  this.filesProgress = 0;
  this.asyncComplete = () => {
    this.filesProgress++;
    if (this.filesProgress === this.totalFiles) {
      if (!!this.onComplete) {
        this.onComplete(this);
      }
    }
  };

  this.load = (onComplete) => {
    this.onComplete = onComplete;
    for (var key in this.textureData) {
      var obj = this.textureData[key];
      this.textureLoader
        .load(obj.path, (texture) => {
          this[obj.id] = texture;
          this.asyncComplete();
        });
    }
  };
}
