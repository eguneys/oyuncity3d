import * as THREE from 'three';
import { loader } from './loader';

global.THREE = require('three');
const createGeometry = require('three-bmfont-text');
const MSDFShader = require('three-bmfont-text/shaders/basic');

function Fonts(data) {

  const greenFont = loader.get('robotocolor');
  const greenGlyph = loader.get('robotogreen.glyph');

  const blueFont = loader.get('robotocolor');
  const blueGlyph = loader.get('robotoblue.glyph');

  const redFont = loader.get('robotocolor');
  const redGlyph = loader.get('robotored.glyph');

  const yellowFont = loader.get('robotocolor');
  const yellowGlyph = loader.get('robotoyellow.glyph');

  const whiteFont = loader.get('robotocolor');
  const whiteGlyph = loader.get('baloo.glyph');

  this.makeColorFont = (color) => {
    switch (color) {
    case 'green': return this.makeGreenFont;
    case 'blue': return this.makeBlueFont;
    case 'red': return this.makeRedFont;
    case 'yellow': return this.makeYellowFont;
    };
    return this.makeGreenFont;
  };

  this.makeGreenFont = withFontMesh(greenFont, greenGlyph);
  this.makeBlueFont = withFontMesh(blueFont, blueGlyph);
  this.makeRedFont = withFontMesh(redFont, redGlyph);
  this.makeYellowFont = withFontMesh(yellowFont, yellowGlyph);


  this.makeWhiteFont = withFontMesh(whiteFont, whiteGlyph);
}

function withFontMesh(font, glyphs) {
  return (text) => {
    const geometry = createGeometry({
      font: font,
      flipY: glyphs.flipY
    });

    geometry.update(text);

    const material = new THREE.MeshBasicMaterial({
      map: glyphs,
      transparent: true
    });

    // const material = new THREE.RawShaderMaterial(MSDFShader({
    //   map: glyphs,
    //   // transparent: true,
    //   color: 0x000000,
    //   alphaTest: 0.4
    // }));

    const mesh = new THREE.Mesh(geometry, material);

    const layout = geometry.layout;
    return mesh;
  };
};



export { Fonts }
