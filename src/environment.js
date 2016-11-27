import * as THREE from 'three';
import Geometry from './geometry';
import settings from './settings';
import { createBoard } from './board';

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

  var boardWidth = w * 0.27;
  var boardHeight = boardWidth;
  var boardDepth = boardWidth;

  var arena = new THREE.Object3D();
  data.container.add(arena);

  // table
  var table = new THREE.Mesh(
    new THREE.PlaneGeometry(w,d,1,1),
    data.materials.arenaGrid);

  table.rotation.x = -Math.PI*0.5;
  // table.rotation.z = 180 / 180 * Math.PI;
  table.position.y = - e;
  table.position.z = w * 0.2;
  table.position.x = - w * 0.2;
  arena.add(table);

  var boardWrapper = new THREE.Mesh(
    new THREE.BoxGeometry(boardWidth,
                          10, boardDepth),
    data.materials.arenaBoardWrapper);
  // boardWrapper.rotation.x = -Math.PI* 0.5;
  boardWrapper.position.y = 0;
  boardWrapper.position.x = -w * 0.05;
  boardWrapper.position.z = w * 0.05;
  arena.add(boardWrapper);
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
  dirLight.position.set(0, 1, 5);
  dirLight.position.multiplyScalar(150);
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
