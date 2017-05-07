import * as THREE from 'three';
import { getAsset, cities } from './assets';
import { hexToDec } from './util';


function Textures(data) {
  const maxAnisotropy = data.renderer.getMaxAnisotropy();

  this.cityTextures = [];

  cities.forEach((city) => {
    const texture = getAsset(city);
    texture.anisotropy = maxAnisotropy;
    this.cityTextures[city] = texture;
  });

  this.shanghaiTexture = getAsset('shanghai');
  this.shanghaiTexture.anisotropy = maxAnisotropy;
  // this.shanghaiTexture.magFilter = THREE.NearestFilter;
  // this.shanghaiTexture.minFilter = THREE.NearestLinearFilter;

  this.rboxTexture = getAsset('rbox');

  this.boxpackTexture = getAsset('boxpack');
  this.boxpackTexture2 = getAsset('boxpackt');

  this.pmTexture = getAsset('pmt');

  this.uvgridTexture = getAsset('uvgrid');
  this.uvgridAtlas = getAsset('uvgridatlas');

  this.avatarTexture = getAsset('ftexture');

  this.makeTextureGradient = (color1, color2, alpha1 = 1, alpha2 = 1) => {
    const texture = new THREE.Texture(
    data.textures.textureTransparentGradient(
      color1, color2, alpha1, alpha2
    ));
    texture.needsUpdate = true;
    return texture;
  };

  function makeRgba(color, a) {
    color = color.getStyle().replace(/rgb/, "rgba");
    color = color.replace(/\)$/, `, ${a})`);
    return color;
  }

  // http://jsfiddle.net/FtML5/3/
  this.textureTransparentGradient = (color1, color2, alpha1, alpha2) => {
    var size = 16;
    // create canvas
    const canvas = document.createElement( 'canvas' );
    canvas.width = size;
    canvas.height = size;

    // get context
    var context = canvas.getContext( '2d' );

    // draw gradient
    context.rect( 0, 0, size, size );
    var gradient = context.createLinearGradient( 0, 0, 0, size );
    gradient.addColorStop(0, makeRgba(color1, alpha1));
    gradient.addColorStop(1, makeRgba(color2, alpha2));
    context.fillStyle = gradient;
    context.fill();

    return canvas;
  };

}

export { Textures }
