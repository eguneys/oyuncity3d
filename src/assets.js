import * as THREE from 'three';
import Textures from './textures';
import Shaders from './shaders';
import Materials from './materials';

module.exports = function Assets(data, onLoad) {

  new Textures().load(function(textures) {
    data.textures = textures;

    new Shaders().load(function(shaders) {
      data.shaders = shaders;
      var materials = new Materials(data);

      data.materials = materials;
      onLoad(data);
    });
  });
};
