import * as THREE from 'three';

import { loader } from './loader';
import { Textures } from './textures';
import { Materials } from './materials';
import { Geometries } from './geometries';
import { Fonts } from './fonts';


function Assets(data, onLoad) {

  loader.texture('ftexture', '/assets/images/pravatar.png');
  // https://www.fontsquirrel.com/fonts/baloo
  loader.texture('montserrat.glyph', '/assets/fonts/baloog.png');
  loader.font('montserrat', '/assets/fonts/baloog.fnt');

  loader.texture('baloo.glyph', '/assets/fonts/baloo.png');
  loader.font('baloo', '/assets/fonts/baloo.fnt');

  loader.start(() => {

    data.geometries = new Geometries(data);
    data.textures = new Textures(data);
    data.materials = new Materials(data);
    data.fonts = new Fonts(data);

    onLoad();
  });
}

export { Assets }
