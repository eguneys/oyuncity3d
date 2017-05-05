import * as THREE from 'three';

import { loader } from './loader';
import { Textures } from './textures';
import { Materials } from './materials';
import { Geometries } from './geometries';
import { Models } from './models';
import { Fonts } from './fonts';


function Assets(data, onLoad) {

  loader.texture('rbox', '/assets/images/rbox_03.png');
  loader.texture('shanghai', '/assets/images/shangai_03.png');

  loader.texture('ftexture', '/assets/images/pravatar.png');
  // https://www.fontsquirrel.com/fonts/baloo

  // loader.texture('montserrat.glyph', '/assets/fonts/baloog.png');
  // loader.font('montserrat', '/assets/fonts/baloog.fnt');

  loader.texture('montserrat.glyph', '/assets/fonts/robotoblue.png');
  loader.font('montserrat', '/assets/fonts/robotoblue.fnt');

  loader.texture('robotogreen.glyph', '/assets/fonts/robotogreen.png');
  // loader.font('robotogreen', '/assets/fonts/robotogreen.fnt');

  loader.texture('robotoblue.glyph', '/assets/fonts/robotoblue.png');
  // loader.font('robotoblue', '/assets/fonts/robotoblue.fnt');

  loader.texture('robotored.glyph', '/assets/fonts/robotored.png');
  // loader.font('robotored', '/assets/fonts/robotored.fnt');

  loader.texture('robotoyellow.glyph', '/assets/fonts/robotoyellow.png');
  // loader.font('robotoyellow', '/assets/fonts/robotoyellow.fnt');

  loader.texture('baloo.glyph', '/assets/fonts/baloowhite.png');
  // loader.font('baloo', '/assets/fonts/baloowhite.fnt');

  loader.font('robotocolor', '/assets/fonts/robotoblue.fnt');

  loader.atlas('boxpack', '/assets/images/boxpack');
  
  loader.texture('boxpackt', '/assets/images/boxpack.png');

  loader.texture('pmt', '/assets/images/pm.png');
  loader.texture('uvgrid', '/assets/images/uvgrid.jpg');

  loader.atlas('uvgridatlas', '/assets/images/uvimages.pack');

  loader.jsonModel('miku', '/assets/models/miku.json');

  loader.start(() => {

    data.geometries = new Geometries(data);
    data.textures = new Textures(data);
    data.materials = new Materials(data);
    data.fonts = new Fonts(data);
    data.models = new Models(data);

    onLoad();
  });
}

export { Assets }
