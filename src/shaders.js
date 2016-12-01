import * as THREE from 'three';

module.exports = function Shaders() {
  this.xhrLoader = new THREE.XHRLoader();

  this.shaderData = [
    { id: 'fragment1', path: '/assets/fragment1.glsl' },
    { id: 'vertex1', path: '/assets/vertex1.glsl' },
  ];

  this.totalFiles = this.shaderData.length;
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
    this.xhrLoader.responseType = 'text';
    for (var key in this.shaderData) {
      var obj = this.shaderData[key];
      this.xhrLoader
        .load(obj.path, completeTexture(this, obj.id));
    }
  };
}

function completeTexture(self, id) {
  return (texture) => {
    var x = arguments;
    self[id] = texture;
    self.asyncComplete();
  };
}
