function LoadManager() {

  this.cache = {};

  this.start = (onLoadComplete) => {
    var nbComplete = 0;

    const onFileComplete = (key, response) => {
      this.setCacheValue(key, response);

      nbComplete++;
      if (nbComplete === Object.keys(this.cache).length) {
        onLoadComplete();
      }
    };

    for (var key in this.cache) {
      var { key, url, type }  = this.cache[key];

      const fComplete = onFileComplete.bind(null, key);

      switch (type) {
      case 'file': {
        loadFile(url, fComplete);
      } break;
      case 'image': {
        loadImage(url, fComplete);
      } break;
      case 'material': {
        loadFile(url, fComplete);
      } break;
      }
    }
  };

  this.file = (key, url) => {
    this.setCacheEntry(key, url, 'file');
  };

  this.image = (key, url) => {
    this.setCacheEntry(key, url, 'image');
  };
    

  this.get = (key) => {
    return this.cache[key].value;
  };

  this.setCacheEntry = (key, url, type) => {
    this.cache[key] = this.cacheEntry(key, url, type);
  };

  this.setCacheValue = (key, value) => {
    this.cache[key].value = value;
  };

  this.cacheEntry = (key, url, type) => {
    return {
      key,
      url,
      type
    };
  };
}

function loadMaterial(url, onLoad) {
  loadFile(url, onLoad);
}

function loadFile(url, onLoad) {
  var request = new XMLHttpRequest();
  request.open('GET', url, true);

  request.addEventListener('load', function(event) {
    var response = event.target.response;

    if (this.status === 200) {
      if (onLoad) onLoad(response);
    }
  });

  request.send(null);
}

function loadImage(url, onLoad) {
  var image = new Image();
  image.src = url;

  image.addEventListener('load', function() {
    onLoad(image);
  });
}

const loader = new LoadManager();

export {
  LoadManager,
  loader
};
