import * as THREE from 'three';

import { loader } from './loader';
import { Materials } from './materials';


function Assets(data, onLoad) {

  data.materials = new Materials(data);

  loader.image('ftexture', 'http://placehold.it/200x200');

  loader.start(() => {
    onLoad();
  });
}

export { Assets }
