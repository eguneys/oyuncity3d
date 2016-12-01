import * as THREE from 'three';
import Geometry from './geometry';
import settings from './settings';
import tiles from './tiles';
import { createBoard } from './board';
import Player from './player';

module.exports = function Environment(data) {

  this.arena = createArena(data);
  this.lights = createLights(this.arena);

  this.players = [];

  createBoard(data);

  this.addPlayer = (idx, body) => {
    var player = new Player(data);


    player.reset(body);
    this.players.push(player);
    this.arena.add(player.mesh);
    this.arena.add(player.avatar);

    return player;
  };

  this.update = (world) => {
    for (var i = 0; i< this.players.length; i++) {
      var pBody = world.players[i];
      var player = this.players[i];
      player.update(pBody);
    }
  };
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
  arena.add(table);

  var boardWrapper = new THREE.Mesh(
    new THREE.BoxGeometry(boardWidth,
                          settings.data.arenaDepth,
                          boardDepth),
    data.materials.arenaBoardWrapper);
  boardWrapper.rotation.x = 90 / 180 * Math.PI;
  boardWrapper.position.y = w * 0.02;
  boardWrapper.position.x = - w * 0.02;
  table.add(boardWrapper);

  for (var i = 0; i < 4; i++) {
    createTile(data, boardWrapper, i);
    createTile2(data, boardWrapper, i, 1);
    createTile2(data, boardWrapper, i, 2);
    createTile2(data, boardWrapper, i, 3);
    createTile2(data, boardWrapper, i, 4);
    createTile2(data, boardWrapper, i, 5);
  }
  return arena;
}

function createTile(data, arena, idx) {
  var tileWidth = settings.data.tileWidth,
      tileDepth = tileWidth;
  var tile = new THREE.Mesh(
    new THREE.BoxGeometry(tileWidth,
                          5,
                          tileDepth),
    data.materials.boardTile);

  tile.position.y = settings.data.tileDepth;

  var tilePos = tiles.getTilePos(idx, 0);

  tile.position.x = tilePos.x;
  tile.position.z = tilePos.z;
  
  arena.add(tile);

  return tile;
}

function createTile2(data, arena, cornerIdx, offsetIdx) {
  var material;
  var tileWidth = settings.data.tileWidth,
      tileHeight = tileWidth;

  if (cornerIdx %2 === 0) {
    tileWidth *= 0.5;
  } else {
    tileHeight *= 0.5;
  }

  if (offsetIdx % 2 === 0) {
    material = data.materials.boardTile3;
  } else {
    material = data.materials.boardTile2;
  }


  var tile = new THREE.Mesh(
    new THREE.BoxGeometry(tileWidth,
                          5,
                          tileHeight),
    material);

  tile.position.y = settings.data.tileDepth;

  var tilePos = tiles.getTilePos(cornerIdx, offsetIdx);

  tile.position.x = tilePos.x;
  tile.position.z = tilePos.z;
  
  arena.add(tile); 
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
