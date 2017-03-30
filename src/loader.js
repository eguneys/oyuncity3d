import * as THREE from 'three';
import bmfontLoader from 'load-bmfont';

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
      case 'font': {
        loadFont(url, fComplete);
      } break;
      case 'file': {
        loadFile(url, fComplete);
      } break;
      case 'image': {
        loadImage(url, fComplete);
      } break;
      case 'texture': {
        loadTexture(url, fComplete);
      } break;
      case 'atlas': {
        loadAtlas(url, fComplete);
      } break;
      case 'material': {
        loadFile(url, fComplete);
      } break;
      }
    }
  };

  const setCacheEntryWithType = (type) => {
    return (key, url) => {
      this.setCacheEntry(key, url, type);
    };
  };

  this.file = setCacheEntryWithType('file');
  this.font = setCacheEntryWithType('font');
  this.image = setCacheEntryWithType('image');
  this.texture = setCacheEntryWithType('texture');
  this.atlas = setCacheEntryWithType('atlas');
    

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

function loadFont(url, onLoad) {
  bmfontLoader(url, function(err, font) {
    onLoad(font);
  });
}

function loadMaterial(url, onLoad) {
  loadFile(url, onLoad);
}

function loadTexture(url, onLoad, onError) {
  textureLoader.load(url, function(texture) {
    onLoad(texture);
  },
                     function() {},
                     function(xhr) {
                       throw xhr;
                     });
}

function loadAtlas(url, onLoad) {
  const atlasUrl = url + '.json';
  const pngUrl = url + '.png';

  // https://gist.github.com/momo-the-monster/9471364
  loadFile(atlasUrl, function(json) {
    json = JSON.parse(json);
    textureLoader.load(pngUrl, function(texture) {
      const texs = [];

      for (var key in json.frames) {
        var tex = texture.clone();
        var frame = json.frames[key];
        
        // tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
        tex.repeat.x = (frame.w / texture.image.width);
        tex.repeat.y = (frame.h / texture.image.height);
        tex.offset.x = (Math.abs(frame.x) / texture.image.width);
        tex.offset.y = (Math.abs(frame.y) / texture.image.height);

        tex.needsUpdate = true;

        // tex.repeat.x = 0.5;
        texs.push(tex);
      }
      onLoad(texs);
    });
  });
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

const textureLoader = new THREE.TextureLoader();
const loader = new LoadManager();

export {
  LoadManager,
  loader
};
