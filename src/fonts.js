import * as THREE from 'three';
import { loader } from './loader';

global.THREE = require('three');
const createGeometry = require('three-bmfont-text');
const MSDFShader = require('three-bmfont-text/shaders/basic');

function Fonts(data) {

  const font = loader.get('montserrat');
  const glyphs = loader.get('montserrat.glyph');

  const baloo = loader.get('baloo');
  const balooGlyp = loader.get('baloo.glyph');


  this.makeFontMesh2 = (text) => {

    const geometry = createGeometry({
      font: baloo,
      flipY: glyphs.flipY
    });

    geometry.update(text);

    const material = new THREE.MeshBasicMaterial({
      map: balooGlyp,
      transparent: true,
      // color: 0xaaffff
      // side: THREE.DoubleSide
    });

    // const material = new THREE.RawShaderMaterial(MSDFShader({
    //   map: glyphs,
    //   // transparent: true,
    //   color: 0x000000,
    //   alphaTest: 0.4
    // }));

    const mesh = new THREE.Mesh(geometry, material);

    const layout = geometry.layout;
    // mesh.position.set(0, -layout.descender + layout.height, 0);

    return mesh;
  };

  this.makeFontMesh = (text) => {

    const geometry = createGeometry({
      font: font,
      flipY: glyphs.flipY
    });

    geometry.update(text);

    const material = new THREE.MeshBasicMaterial({
      map: glyphs,
      transparent: true,
      // color: 0xaaffff
      // side: THREE.DoubleSide
    });

    // const material = new THREE.RawShaderMaterial(MSDFShader({
    //   map: glyphs,
    //   // transparent: true,
    //   color: 0x000000,
    //   alphaTest: 0.4
    // }));

    const mesh = new THREE.Mesh(geometry, material);

    const layout = geometry.layout;
    // mesh.position.set(0, -layout.descender + layout.height, 0);

    return mesh;
  };

  this.montserrat = this.makeFontMesh('lorem ipsum dolor');
}

export { Fonts }
