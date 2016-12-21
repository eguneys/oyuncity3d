import * as THREE from 'three';
import loadFont from 'load-bmfont';

module.exports = function Font(callback) {
  loadFont('/assets/rubik.fnt', (err, font) => {
    if (err) {
      callback(this);
      return;
    }

    this['rubik'] = font;
    callback(this);
  });
};
