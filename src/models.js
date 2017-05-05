import * as THREE from 'three';
import { loader } from './loader';

function Models(data) {
  const miku = loader.get('miku');

  this.miku = miku;
}

export { Models };
