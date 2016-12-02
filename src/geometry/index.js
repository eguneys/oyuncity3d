import * as THREE from 'three';
import Loader from '../loader';

module.exports = function Geometry() {
  var jsonLoader = new THREE.JSONLoader();
  var loadData = [
    { id: 'home1', path: '/assets/3d/home2.json' }
  ];

  const onLoad = (id, geometry, materials) => {
    this[id] = {
      geometry,
      materials
    };
  };

  this.loader = new Loader(jsonLoader, loadData, onLoad, this);

  this.load = this.loader.load;
};
