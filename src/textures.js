import * as THREE from 'three';

module.exports = function Textures() {
  this.textureLoader = new THREE.TextureLoader();

  this.textureData = [
    { id: 'wood1', path: '/assets/wood1.jpg' },
    { id: 'kitten1', path: '/assets/kitten.jpg' },
    { id: 'avatar1', path: '/assets/avatar1.png' },
    { id: 'bubble', path: '/assets/speech-bubble.png' },
    { id: 'bgbutton', path: '/assets/buttons/button.png' },
    { id: 'shine', path: '/assets/buttons/shine_03.png' },
    { id: 'rubik', path: '/assets/rubik.png' }
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
        .load(obj.path, completeTexture(this, obj.id));
    }
  };
}

function completeTexture(self, id) {
  return (texture) => {
    self[id] = texture;
    self.asyncComplete();
  };
}
