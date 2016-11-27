import * as THREE from 'three';
import Geometry from './geometry';
import settings from './settings';
import { createBoard } from './board';

// x y z
var tileMatrix = [ -1, -1,
                   +1, -1,
                   -1, +1,
                   +1, +1];

var cornerMatrix = [ 1.75, 1.75,
                     1.75, 1.75,
                     1.75, 1.75,
                     1.75, 1.75];

var cornerMatrix2 = [ 1.25, 1.25,
                      1.5, 2.5,
                      1.5, 1.5,
                      1.25, 1.25];

var tile2Matrix = [ 0.25, -0.5,
                   -0.5, 0.25,
                   +1, -0.25,
                   -0.25, 0.5];

module.exports = function Environment(data) {

  this.terrain = createTerrain(data);

  this.lights = createLights(this.terrain);

  createArena(data);

  createBoard(data);
};

function createArena(data) {
  var w = settings.data.arenaWidth,
      h = w/16*9,
      d = settings.data.arenaHeight,
      e = settings.data.arenaElevation;

  var boardWidth = settings.data.boardWidth;
  var boardHeight = boardWidth;
  var boardDepth = boardWidth;

  var arena = new THREE.Object3D();
  data.container.add(arena);

  // table
  var table = new THREE.Mesh(
    new THREE.PlaneGeometry(w, d),
    data.materials.arenaGrid);
  table.rotation.x = - 90 / 180 * Math.PI;
  // table.position.y = - e;
  // table.position.z = w * 0.2;
  // table.position.x = - w * 0.2;
  arena.add(table);

  var boardWrapper = new THREE.Mesh(
    new THREE.BoxGeometry(boardWidth,
                          10, boardDepth),
    data.materials.arenaBoardWrapper);
  boardWrapper.rotation.x = 90 / 180 * Math.PI;
  boardWrapper.position.y = w * 0.02;
  boardWrapper.position.x = - w * 0.02;
  // boardWrapper.position.x = -w * 0.05;
  // boardWrapper.position.z = w * 0.05;
  table.add(boardWrapper);

  for (var i = 0; i < 4; i++) {
    createTile(data, boardWrapper, i);
    createTile2(data, boardWrapper, i, 1);
    createTile2(data, boardWrapper, i, 2);
    createTile2(data, boardWrapper, i, 3);
    createTile2(data, boardWrapper, i, 4);
    createTile2(data, boardWrapper, i, 5);
  }
}

function createTile(data, arena, idx) {
  var tileWidth = settings.data.tileWidth,
      tileDepth = tileWidth;
  var tile = new THREE.Mesh(
    new THREE.BoxGeometry(tileWidth,
                          5,
                          tileDepth),
    data.materials.boardTile);
  tile.position.y = 10;

  tile.position.x = tileWidth
    * cornerMatrix[idx * 2 + 0]
    * tileMatrix[idx * 2 + 0];
  tile.position.z = tileWidth
    * cornerMatrix[idx * 2 + 1]
    * tileMatrix[idx * 2 + 1];

  
  arena.add(tile);
}

function createTile2(data, arena, idx, factor) {
  var material;
  var tileWidth = settings.data.tileWidth,
      tileDepth = tileWidth;

  var offsetX = tileWidth
      * tile2Matrix[idx * 2 + 1];
  var offsetZ = tileWidth
      * tile2Matrix[idx * 2 + 0];

  if (idx === 0 || idx === 3) {
    tileDepth *= 0.5;
    offsetZ += offsetZ * (factor - 1) * 2;
  } else {
    tileWidth *= 0.5;
    offsetX -= offsetX * (factor - 1) * 2;
  }

  if (factor % 2 === 0) {
    material = data.materials.boardTile3;
  } else {
    material = data.materials.boardTile2;
  }


  var tile = new THREE.Mesh(
    new THREE.BoxGeometry(tileWidth,
                          5,
                          tileDepth),
    material);

  tile.position.y = 10;

  tile.position.x = tileWidth
    * cornerMatrix2[idx * 2 + 0]
    * tileMatrix[idx * 2 + 0]
    + offsetX;
  tile.position.z = tileWidth
    * cornerMatrix2[idx * 2 + 1]
    * tileMatrix[idx * 2 + 1] + offsetZ;
  
  arena.add(tile); 
}

function createTerrain(data) {
  var terrain = new THREE.Object3D();
  data.container.add(terrain);

  var terrainMesh = new THREE.Mesh(Geometry.terrain, data.materials.terrain1);
  terrainMesh.position.z = 0;
  terrainMesh.position.y = -6;
  terrain.terrainShortcut = terrainMesh;

  terrain.add(terrainMesh);

  var segments = new THREE.Vector2(20, 3);

  terrainMesh = createTerrainMesh(8000,
                                  2000,
                                  3505,
                                  segments.x,
                                  segments.y,
                                  new THREE.Color(0x1f84d5),
                                  4,
                                  false,
                                  data.materials.terrain2);
  terrainMesh.position.z = -7500;
  terrainMesh.position.x = Math.random() * 5000 - 2500;
  terrainMesh.position.y = settings.data.arenaSurfaceY-200;
  terrainMesh.scale.x = 4;
  terrainMesh.scale.y = 3;
  terrain.add(terrainMesh);

  segments = new THREE.Vector2(40, 20);

  terrainMesh = createTerrainMesh(4000,
                                  5000,
                                  8505,
                                  segments.x,
                                  segments.y,
                                  new THREE.Color(0x195475),
                                  4,
                                  false,
                                  data.materials.terrain3);
  terrainMesh.position.z = -6000;
  terrainMesh.position.x = Math.random() * 5000 - 2500;
  terrainMesh.position.y = settings.data.arenaSurfaceY-200;
  terrainMesh.scale.x = 4;
  terrainMesh.scale.y = 1;
  terrain.add(terrainMesh);
  
  return terrain;
}

function createOverlay(data) {
  var camera = data.camera;

  var planeGeo = new THREE.PlaneGeometry(100, 100, 3, 3);

  var plane = new THREE.Mesh(planeGeo, data.materials.overlay);
  camera.add(plane);

  return plane;
}

function createLights(terrain) {
  var lights = [];

  var hemLight = new THREE.HemisphereLight(
    settings.data.hemisphereLightSkyColor,
    settings.data.hemisphereLightGroundColor,
    settings.data.hemisphereLightIntesity);
  terrain.add(hemLight);
  lights.push(hemLight);

  var dirLight = new THREE.DirectionalLight(
    settings.data.dirLightColor,
    settings.data.dirLightIntensity);
  // dirLight.color.setHSV(0.1, 0.1, 1);
  dirLight.position.set(-1, 1, 1);
  dirLight.position.multiplyScalar(500);
  terrain.add(dirLight);
  lights.push(dirLight);

  return lights;
}

function createTerrainMesh(w,
                           h,
                           extrude,
                           segW,
                           segH,
                           baseColor,
                           noiseFactor,
                           bValley,
                           material) {
  var n = 0
  , geometry = new THREE.PlaneGeometry(w,h,segW,segH)
  , len = geometry.vertices.length;

  // THREE.GeometryUtils.triangulateQuads(geometry);

  for (var i = 0; i < len; i++) {
    var point = geometry.vertices[i];
    point.x += Math.random() * 60;
    point.y += Math.random() * 150 - 70;
    point.z += Math.random() * 220;
  }

  geometry.mergeVertices();
  geometry.computeFaceNormals();

  var mountainMesh = new THREE.Mesh(geometry, material);
  mountainMesh.rotation.x = Math.PI*-0.5;

  return mountainMesh;
}
