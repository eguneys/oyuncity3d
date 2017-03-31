import * as THREE from 'three';
import { degToRad } from './util';

// http://materialuicolors.co/
const blockMatYellow500 = 0xFFEB3B;
const blockMatGrey500 = 0x9E9E9E;
const blockMatGreen500 = 0x8BC34A;
const blockMatCyan500 = 0x00BCD4;
const blockMatOrange500 = 0xFF9800;
const blockMatPurple500 = 0x9C27B0;
const blockMatBlue500 = 0x2196F3;
const blockMatRed500 = 0xF44336;

const boardWidth = 200;
const stepDepth = 5;

function Environment(data) {
  this.arena = initArena(data);

  addGridHelper(this.arena);
  addBunchOfBoxes(data, this.arena);

  addLight(this.arena);

  addSkyBox(this.arena);

  const board = addBoard(this.arena);

  requestAnimationFrame(function loo() {
    // board.rotation.z+= 1 / 60 / 10;
    requestAnimationFrame(loo);
  });
}

function addBoard(arena) {

  const boardMaterial = new THREE.MeshBasicMaterial({
    color: 0xcccccc
  });
  
  const boardGeometry = new THREE.PlaneGeometry(boardWidth,
                                                boardWidth);
  const boardMesh = new THREE.Mesh(boardGeometry, boardMaterial);

  boardMesh.rotation.z = degToRad(45);
  boardMesh.rotation.x = degToRad(-60);
  boardMesh.position.y = 10;
  // debug
  // boardMesh.rotation.z = degToRad(90);
  // boardMesh.rotation.x = degToRad(-80);
  // boardMesh.position.x = 100;

  arena.add(boardMesh);

  addPlayer(boardMesh);

  addSteps(boardMesh);

  return boardMesh;
}

function addSteps(board) {

  function makeStepMesh(width, height, color = 0xaa0000) {
    const mesh = new THREE.Mesh(
      new THREE.BoxGeometry(width, height, stepDepth),
      new THREE.MeshPhongMaterial({
        color: color
      }));

    return mesh;
  }

  const nbSteps = 11;
  const nbInSteps = nbSteps - 4;
  const boardPadding = 1;
  const halfStepWidth = (boardWidth - boardPadding * 2) / nbSteps;
  const stepWidth = halfStepWidth * 2;
  const halfBoardWidth = boardWidth / 2;
  const stepIncrementWidth = halfStepWidth * 1.5;

  var step0 = makeStepMesh(stepWidth, stepWidth);

  step0.position.set(-halfBoardWidth + halfStepWidth + boardPadding,
                    -halfBoardWidth + halfStepWidth + boardPadding,
                    stepDepth);
  board.add(step0);

  var step1,
      yIncrement = stepIncrementWidth,
      xIncrement = stepIncrementWidth;
  for (var i = 0; i < nbInSteps; i++) {
    step1 = makeStepMesh(stepWidth, halfStepWidth, 0x00aa00 * i);
    step1.position.set(-halfBoardWidth + halfStepWidth + boardPadding,
                       -halfBoardWidth + halfStepWidth + boardPadding
                       + yIncrement,
                       stepDepth);
    board.add(step1);

    yIncrement += halfStepWidth;
  }

  var step2 = makeStepMesh(stepWidth, stepWidth);

  step2.position.set(-halfBoardWidth + halfStepWidth + boardPadding,
                     halfBoardWidth - halfStepWidth - boardPadding,
                    stepDepth);
  board.add(step2);

  for (i = 0; i < nbInSteps; i++) {
    step1 = makeStepMesh(halfStepWidth, stepWidth, 0xaa0000 * i);
    step1.position.set(-halfBoardWidth + halfStepWidth + boardPadding
                       + xIncrement,
                       halfBoardWidth - halfStepWidth - boardPadding,
                       stepDepth);
    board.add(step1);

    xIncrement += halfStepWidth;
  }

  var step4 = makeStepMesh(stepWidth, stepWidth);

  step4.position.set(halfBoardWidth - halfStepWidth - boardPadding,
                     halfBoardWidth - halfStepWidth - boardPadding,
                    stepDepth);
  board.add(step4);

  yIncrement = - halfStepWidth * 1.5;
  for (i = 0; i < nbInSteps; i++) {
    step1 = makeStepMesh(stepWidth, halfStepWidth, 0x0000aa * i);
    step1.position.set(halfBoardWidth - halfStepWidth - boardPadding,
                       halfBoardWidth - halfStepWidth - boardPadding
                       + yIncrement,
                       stepDepth);
    board.add(step1);

    yIncrement -= halfStepWidth;
  }

  var step6 = makeStepMesh(stepWidth, stepWidth);

  step6.position.set(halfBoardWidth - halfStepWidth - boardPadding,
                     -halfBoardWidth + halfStepWidth + boardPadding,
                     stepDepth);
  board.add(step6);

  xIncrement = - halfStepWidth * 1.5;
  for (i = 0; i < nbInSteps; i++) {
    step1 = makeStepMesh(halfStepWidth, stepWidth, 0xaa00aa * i);
    step1.position.set(halfBoardWidth - halfStepWidth - boardPadding
                       + xIncrement,
                       - halfBoardWidth + halfStepWidth + boardPadding,
                       stepDepth);
    board.add(step1);

    xIncrement -= halfStepWidth;
  }
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

  const skyMaterial = new THREE.MultiMaterial(materialArray);
  const skyBox = new THREE.Mesh(skyGeometry, skyMaterial);
  
  arena.add(skyBox);
}

function addLight(arena) {
  const light = new THREE.PointLight(0xffffff);
  light.position.set(0, 0, 300);
  arena.add(light);
}

function addGridHelper(arena) {
  const gridXZ = new THREE.GridHelper(200, 10,
                                      new THREE.Color(0x006600),
                                      new THREE.Color(0x006600));
  arena.add(gridXZ);

  const gridXY = new THREE.GridHelper(200, 10,
                                      new THREE.Color(0x000066),
                                      new THREE.Color(0x000066));
  gridXY.rotation.x = Math.PI/2;
  arena.add(gridXY);

  const gridYZ = new THREE.GridHelper(200, 10,
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

  // const text = data.fonts.montserrat;
  // text.position.set(0, 0, -10);
  // table.add(text);
}

function initArena(data) {

  const aspect = 9/16,
        w = data.width,
        h = w * aspect;

  var arena = new THREE.Object3D();
  data.container.add(arena);
  return arena;
}

export { Environment }
