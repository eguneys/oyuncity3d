module.exports = function Loader(loader, loadData, onLoad, target) {
  this.target = target;
  this.loadData = loadData;
  this.onLoad = onLoad;

  this.totalFiles = this.loadData.length;
  this.filesProgress = 0;
  this.asyncComplete = () => {
    this.filesProgress++;
    if (this.filesProgress === this.totalFiles) {
      if (!!this.onComplete) {
        this.onComplete(this.target);
      }
    }
  };

  this.load = (onComplete) => {
    this.onComplete = onComplete;
    for (var key in this.loadData) {
      var obj = this.loadData[key];
      loader
        .load(obj.path, completeTexture(this, obj.id));
    }
  };
}

function completeTexture(self, id) {
  return (geometry, materials) => {
    self.onLoad(id, geometry, materials);
    self.asyncComplete();
  };
}
