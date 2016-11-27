import * as THREE from 'three';

import t3 from './terrain3';

var raf = window.requestAnimationFrame || window.setTimeout;

var loader = new THREE.JSONLoader();
var cache = {};
var geometry = {};

function Geometry() {
  createModelStep(this);
}

function createModel(data, instance) {
  var obj = loader.parse(data.json);
  exports[data.id] = obj.geometry;
}

var parseData = [
  { id: 'terrain', path: './terrain3' }
];

var step = -1;
var totalModels = parseData.length;

function parseStep() {
  if (step < totalModels - 1) {
    step++;
    var data = parseData[step];
    data.json = JSON.parse(require(data.path));
    parseStep();
  } else {
    step = -1;
    createModelStep();
  }
}

function createModelStep(instance) {
  if (step < totalModels - 1) {
    step++;
    var data = parseData[step];
    createModel(data, instance);
    createModelStep();
  } else {
    
  }
}

parseStep();
