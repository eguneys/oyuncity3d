import * as THREE from 'three';
import { loader } from './loader';


function Textures(data) {
  this.avatarTexture = loader.get('ftexture');
}

export { Textures }
