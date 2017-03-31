import * as THREE from 'three';
import { loader } from './loader';
import { hexToDec } from './util';


function Textures(data) {
  this.boxpackTexture = loader.get('boxpack');
  this.boxpackTexture2 = loader.get('boxpackt');

  this.pmTexture = loader.get('pmt');

  this.uvgridTexture = loader.get('uvgrid');
  this.uvgridAtlas = loader.get('uvgridatlas');

  this.avatarTexture = loader.get('ftexture');

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
