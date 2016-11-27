import * as THREE from 'three';
import Textures from './textures';
import Materials from './materials';

module.exports = function Assets(data, onLoad) {

  new Textures().load(function(textures) {
    data.textures = textures;

    var materials = new Materials(data);

    data.materials = materials;
    onLoad(data);
  });
};
