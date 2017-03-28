import * as THREE from 'three';
import { degToRad } from './util';

function Environment(data) {
  this.arena = initArena(data);

  addGridHelper(this.arena);
  addBunchOfBoxes(data, this.arena);

  addLight(this.arena);

  addSkyBox(this.arena);

  addBoard(this.arena);
}

function addBoard(arena) {

  const boardMaterial = new THREE.MeshBasicMaterial({
    color: 0xcccccc
  });
  
  const boardGeometry = new THREE.PlaneGeometry(100, 100, 100, 100);
  const boardMesh = new THREE.Mesh(boardGeometry, boardMaterial);

  boardMesh.rotation.z = degToRad(45);
  boardMesh.rotation.x = degToRad(-60);
  //boardMesh.position.y = 10;

  arena.add(boardMesh);

  addPlayer(boardMesh);
}

function addPlayer(board) {
  var player = new THREE.Mesh(
    new THREE.BoxGeometry(10, 10, 10),
    new THREE.MeshBasicMaterial({
      color: 0xaabbcc
    }));

  player.position.set(-40, -40, 10);

  board.add(player);
  
}

function addSkyBox(arena) {

  const skyGeometry = new THREE.CubeGeometry(1000, 1000, 1000);

  const materialArray = [];

  for (var i = 0; i < 6; i++) {
    materialArray.push(new THREE.MeshBasicMaterial({
      color: 0x61A0C3,
      side: THREE.BackSide
    }));
  }

  const skyMaterial = new THREE.MeshFaceMaterial(materialArray);
  const skyBox = new THREE.Mesh(skyGeometry, skyMaterial);
  
  arena.add(skyBox);
}

function addLight(arena) {
  const light = new THREE.PointLight(0xffffff);
  light.position.set(100, 250, 100);
  arena.add(light);
}

function addGridHelper(arena) {
  const gridXZ = new THREE.GridHelper(100, 10,
                                      new THREE.Color(0x006600),
                                      new THREE.Color(0x006600));
  arena.add(gridXZ);

  const gridXY = new THREE.GridHelper(100, 10,
                                      new THREE.Color(0x000066),
                                      new THREE.Color(0x000066));
  gridXY.rotation.x = Math.PI/2;
  arena.add(gridXY);

  const gridYZ = new THREE.GridHelper(100, 10,
                                      new THREE.Color(0x660000),
                                      new THREE.Color(0x660000));
  gridYZ.rotation.z = Math.PI/2;
  arena.add(gridYZ);
}

function addBunchOfBoxes(data, arena) {
  // table
  var table = new THREE.Mesh(
    new THREE.BoxGeometry(10, 10, 10),
    data.materials.arenaGrid);
  table.position.set(50, 10, 0);

  var glass = new THREE.Mesh(
    new THREE.BoxGeometry(10, 10, 10),
    data.materials.glass);
  glass.position.set(-50, 0, 0);
  table.add(glass);

  arena.add(table);
}

function initArena(data) {

  const aspect = 9/16,
        w = 720,
        h = w * aspect,
        d = 100;

  var arena = new THREE.Object3D();
  data.container.add(arena);
  return arena;
}

export { Environment }
