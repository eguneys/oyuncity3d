import * as THREE from 'three';
import { degToRad } from './util';

// http://materialuicolors.co/
const blockMatYellow500 = 0xFFEB3B;
const blockMatGrey500 = 0x9E9E9E;
const blockMatLime500 = 0xCDDC39;
const blockMatGreen500 = 0x8BC34A;
const blockMatCyan500 = 0x00BCD4;
const blockMatOrange500 = 0xFF9800;
const blockMatPurple500 = 0x9C27B0;
const blockMatBlue500 = 0x2196F3;
const blockMatRed500 = 0xF44336;

const blockColorMap = {
  white: 0xffffff,
  yellow: blockMatYellow500,
  gray: blockMatGrey500,
  lime: blockMatLime500,
  green: blockMatGreen500,
  cyan: blockMatCyan500,
  orange: blockMatOrange500,
  purple: blockMatPurple500,
  blue: blockMatBlue500,
  red: blockMatRed500
};

const boardWidth = 200;
const stepDepth = 5;

const nbSteps = 11;
const nbInSteps = nbSteps - 4;
const blockPadding = 1;
const boardPadding = 1;
const halfStepWidth = (boardWidth
                       - boardPadding * 2
                       - blockPadding * (nbSteps - 3)
                      ) / nbSteps;
const stepWidth = halfStepWidth * 2;
const halfBoardWidth = boardWidth / 2;
const stepIncrementWidth = halfStepWidth * 1.5;

const blockExtrudeEdgeTopLeft =
  +boardWidth/2
  - halfStepWidth
  - boardPadding;

const blockExtrudeEdgeBottomRight =
  -boardWidth / 2
  + halfStepWidth
  + boardPadding;

const blockExtrudeWidth1 =
  stepWidth
  + blockPadding;

const blockExtrudeWidth2 =
  halfStepWidth * 2
  + blockPadding * 2
  + blockPadding;

const blockExtrudeWidth3 =
  halfStepWidth * 3
  + blockPadding * 3
  + blockPadding;

const blockExtrudeMeasures = {
  yellow: {
    x: blockExtrudeEdgeBottomRight,
    y: - boardWidth/2
      + halfStepWidth * 3
      + blockPadding * 1
      + boardPadding,
    w: blockExtrudeWidth1,
    h: halfStepWidth * 2
      + blockPadding * 2
      + blockPadding
  },
  lime: {
    x: blockExtrudeEdgeBottomRight,
    y: -boardWidth / 2
      + halfStepWidth * 7.5
      + blockPadding * 6
      + boardPadding,
    w: blockExtrudeWidth1,
    h: blockExtrudeWidth3
  },
  cyan: {
    x: -boardWidth / 2
      + halfStepWidth * 3
      + blockPadding * 2
      + boardPadding,
    y: blockExtrudeEdgeTopLeft,
    w: blockExtrudeWidth2,
    h: blockExtrudeWidth1
  },
  green: {
    x: -boardWidth / 2
      + halfStepWidth * 7.5
      + blockPadding * 6
      + boardPadding,
    y: blockExtrudeEdgeTopLeft,
    w: blockExtrudeWidth3,
    h: blockExtrudeWidth1
  },
  orange: {
    x: blockExtrudeEdgeTopLeft,
    y: -boardWidth/2
      + halfStepWidth * 7.5
      + blockPadding * 6
      + boardPadding,
    w: blockExtrudeWidth1,
    h: blockExtrudeWidth3
  },
  purple: {
    x: blockExtrudeEdgeTopLeft,
    y: -boardWidth/2
      + halfStepWidth * 3
      + blockPadding * 2
      + boardPadding,
    w: blockExtrudeWidth1,
    h: blockExtrudeWidth2
  },
  blue: {
    x: boardWidth/2
      - halfStepWidth * 3
      - blockPadding * 2
      - boardPadding,
    y: blockExtrudeEdgeBottomRight,
    w: blockExtrudeWidth2,
    h: blockExtrudeWidth1
  },
  red: {
    x: boardWidth / 2
      - halfStepWidth * 7.5
      - blockPadding * 6
      - boardPadding,
    y: blockExtrudeEdgeBottomRight,
    w: blockExtrudeWidth3,
    h: blockExtrudeWidth1      
  }
};



function Environment(data) {
  this.arena = initArena(data);

  addGridHelper(this.arena);
  addBunchOfBoxes(data, this.arena);

  addLight(this.arena);

  addSkyBox(this.arena);

  const board = addBoard(data, this.arena);

  // const measures = blockExtrudeMeasures['red'];
  // addBlockExtrude(data,
  //                 board,
  //                 measures.x,
  //                 measures.y,
  //                 measures.w,
  //                 measures.h);

  // const blockExtrude = addBlockExtrude(data, board,
  //                                      -boardWidth/2
  //                                      + halfStepWidth
  //                                      + boardPadding,
  //                                      - boardWidth/2
  //                                      + halfStepWidth * 7.5
  //                                      + blockPadding * 6
  //                                      + boardPadding,
  //                                      // + halfStepWidth * 7.5
  //                                      // + blockPadding * 5,
  //                                      stepWidth
  //                                      + blockPadding,
  //                                      halfStepWidth * 3
  //                                      + blockPadding * 3
  //                                      + blockPadding);

  // const blockExtrude = addBlockExtrude(data, board,
  //                                      -boardWidth/2
  //                                      + halfStepWidth
  //                                      + boardPadding,
  //                                      - boardWidth/2
  //                                      + halfStepWidth * 3
  //                                      + blockPadding * 1
  //                                      + boardPadding,
  //                                      // + halfStepWidth * 7.5
  //                                      // + blockPadding * 5,
  //                                      stepWidth
  //                                      + blockPadding,
  //                                      halfStepWidth * 2
  //                                      + blockPadding * 2
  //                                      + blockPadding);



  // const blockExtrude = addBlockExtrude(data, board,
  //                                      boardWidth/2
  //                                      - halfStepWidth
  //                                      - boardPadding,
  //                                      - boardWidth/2
  //                                      + halfStepWidth * 3
  //                                      + blockPadding * 2
  //                                      + boardPadding,
  //                                      stepWidth
  //                                      + blockPadding,
  //                                      halfStepWidth * 2
  //                                      + blockPadding * 2
  //                                      + blockPadding);
  
  // const blockExtrude = addBlockExtrude(data, board,
  //                                      boardWidth/2
  //                                      - halfStepWidth
  //                                      - boardPadding,
  //                                      - boardWidth/2
  //                                      + halfStepWidth * 7.5
  //                                      + blockPadding * 6
  //                                      + boardPadding,
  //                                      stepWidth
  //                                      + blockPadding,
  //                                      halfStepWidth * 3
  //                                      + blockPadding * 3
  //                                      + blockPadding);
  

  // const blockExtrude = addBlockExtrude(data, board,
  //                                      -boardWidth/2
  //                                      + halfStepWidth * 3.5
  //                                      + blockPadding * 2
  //                                      + boardPadding,
  //                                      - boardWidth/2
  //                                      + halfStepWidth
  //                                      + boardPadding,
  //                                      halfStepWidth * 3
  //                                      + blockPadding * 3
  //                                      + blockPadding,
  //                                      stepWidth
  //                                      + blockPadding);

  // const blockExtrude = addBlockExtrude(data, board,
  //                                      -boardWidth/2
  //                                      + halfStepWidth * 8
  //                                      + blockPadding * 7
  //                                      + boardPadding,
  //                                      - boardWidth/2
  //                                      + halfStepWidth
  //                                      + boardPadding,
  //                                      halfStepWidth * 2
  //                                      + blockPadding * 2
  //                                      + blockPadding,
  //                                      stepWidth
  //                                      + blockPadding);

  // const blockExtrude = addBlockExtrude(data, board,
  //                                      -boardWidth/2
  //                                      + halfStepWidth * 7.5
  //                                      + blockPadding * 6
  //                                      + boardPadding,
  //                                      + boardWidth/2
  //                                      - halfStepWidth
  //                                      - boardPadding,
  //                                      halfStepWidth * 3
  //                                      + blockPadding * 3
  //                                      + blockPadding,
  //                                      stepWidth
  //                                      + blockPadding);

  // const blockExtrude = addBlockExtrude(data, board,
  //                                      -boardWidth/2
  //                                      + halfStepWidth * 3
  //                                      + blockPadding * 2
  //                                      + boardPadding,
  //                                      + boardWidth/2
  //                                      - halfStepWidth
  //                                      - boardPadding,
  //                                      halfStepWidth * 2
  //                                      + blockPadding * 2
  //                                      + blockPadding,
  //                                      stepWidth
  //                                      + blockPadding);


  const blockExtrude = addBlockExtrudeColor(data, board, 'yellow');

  requestAnimationFrame(function loo(t) {
    // board.rotation.z+= 1 / 60 / 10;
    blockExtrude.position.z = stepDepth * 2 + 10 * Math.sin(-t/60 / 10);
    requestAnimationFrame(loo);
  });
}

function addBlockExtrudeColor(data, board, color) {
  const { x, y, w, h } = blockExtrudeMeasures[color];

  return addBlockExtrude(data, board, x, y, w, h);
}

function addBlockExtrude(data, board, x, y, width, height) {
  const extrudeSettings = {
    bevelEnabled: true,
    bevelSize: 0.2,
    bevelThickness: stepDepth / 2,
    steps: 2,
    bevelSegments: 2,
    amount: 1
  };

  const radius = 2;
  const offset = 1;

  const shape = data.geometries.makeRoundShapeOnly(width,
                                                   height, radius);

  const holeShape = data.geometries.makeRoundShapeOnly(width - offset,
                                                       height - offset, radius);

  shape.holes.push(holeShape);

  const material = new THREE.MeshPhongMaterial({
    color: 0xcccccc
  });
  
  const geometry = new THREE.ExtrudeGeometry(shape,
                                                  extrudeSettings);

  const mesh = new THREE.Mesh(geometry, material);

  mesh.position.set(x,
                    y,
                    stepDepth* 1.2);
  
  board.add(mesh);

  return mesh;
  
}

function addBoard(data, arena) {

  const boardMaterial = new THREE.MeshBasicMaterial({
    color: 0xcccccc
  });
  
  const boardGeometry = new THREE.PlaneGeometry(boardWidth,
                                                boardWidth);
  const boardMesh = new THREE.Mesh(boardGeometry, boardMaterial);

  boardMesh.rotation.z = degToRad(45);
  boardMesh.rotation.x = degToRad(-60);
  // boardMesh.position.y = 10;
  // debug
  // boardMesh.rotation.z = degToRad(90);
  // boardMesh.rotation.x = degToRad(-80);
  // boardMesh.position.x = 100;
  // boardMesh.position.z = 200;
  arena.add(boardMesh);

  addPlayer(boardMesh);

  addSteps(data, boardMesh);

  return boardMesh;
}

function addSteps(data, board) {
  const blocks = data.blocks;

  function getBlockColorOrDefault(blockIndex) {
    const defaultColor = 0x111111;

    return (blocks[blockIndex] ? blockColorMap[blocks[blockIndex].color]
            || defaultColor :
            defaultColor);
  }

  function makeStepMesh(width, height, color = 0xffffff) {
    const mesh = new THREE.Mesh(
      new THREE.BoxGeometry(width, height, stepDepth),
      new THREE.MeshPhongMaterial({
        color: color
      }));

    return mesh;
  }

  var blockIndex = 0;
  var blockColor;

  var step0 = makeStepMesh(stepWidth, stepWidth);

  step0.position.set(-halfBoardWidth + halfStepWidth + boardPadding,
                    -halfBoardWidth + halfStepWidth + boardPadding,
                    stepDepth);
  board.add(step0);

  var step1,
      yIncrement = stepIncrementWidth,
      xIncrement = stepIncrementWidth;
  for (var i = 0; i < nbInSteps; i++) {
    blockIndex++;
    blockColor = getBlockColorOrDefault(blockIndex);
    step1 = makeStepMesh(stepWidth, halfStepWidth, blockColor);
    step1.position.set(-halfBoardWidth + halfStepWidth + boardPadding,
                       -halfBoardWidth + halfStepWidth + boardPadding
                       + yIncrement
                       + blockPadding * (i + 1),
                       stepDepth);
    board.add(step1);

    yIncrement += halfStepWidth;
  }

  blockIndex = 8;
  var step2 = makeStepMesh(stepWidth, stepWidth);

  step2.position.set(-halfBoardWidth + halfStepWidth + boardPadding,
                     halfBoardWidth - halfStepWidth - boardPadding,
                    stepDepth);
  board.add(step2);
  for (i = 0; i < nbInSteps; i++) {
    blockIndex++;
    blockColor = getBlockColorOrDefault(blockIndex);
    step1 = makeStepMesh(halfStepWidth, stepWidth, blockColor);
    step1.position.set(-halfBoardWidth + halfStepWidth + boardPadding
                       + xIncrement
                       + blockPadding * (i + 1),
                       halfBoardWidth - halfStepWidth - boardPadding,
                       stepDepth);
    board.add(step1);

    xIncrement += halfStepWidth;
  }

  blockIndex = 16;
  var step4 = makeStepMesh(stepWidth, stepWidth);

  step4.position.set(halfBoardWidth - halfStepWidth - boardPadding,
                     halfBoardWidth - halfStepWidth - boardPadding,
                    stepDepth);
  board.add(step4);

  yIncrement = - halfStepWidth * 1.5;
  for (i = 0; i < nbInSteps; i++) {
    blockIndex++;
    blockColor = getBlockColorOrDefault(blockIndex);
    step1 = makeStepMesh(halfStepWidth, stepWidth, blockColor);
    step1 = makeStepMesh(stepWidth, halfStepWidth, blockColor);
    step1.position.set(halfBoardWidth - halfStepWidth - boardPadding,
                       halfBoardWidth - halfStepWidth - boardPadding
                       + yIncrement
                       - blockPadding * (i + 1),
                       stepDepth);
    board.add(step1);

    yIncrement -= halfStepWidth;
  }

  blockIndex = 24;
  var step6 = makeStepMesh(stepWidth, stepWidth);

  step6.position.set(halfBoardWidth - halfStepWidth - boardPadding,
                     -halfBoardWidth + halfStepWidth + boardPadding,
                     stepDepth);
  board.add(step6);

  xIncrement = - halfStepWidth * 1.5;
  for (i = 0; i < nbInSteps; i++) {
    blockIndex++;
    blockColor = getBlockColorOrDefault(blockIndex);
    step1 = makeStepMesh(halfStepWidth, stepWidth, blockColor);
    step1.position.set(halfBoardWidth - halfStepWidth - boardPadding
                       + xIncrement
                       - blockPadding * (i + 1),
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
  const light = new THREE.DirectionalLight(0xffffff, 1.8);
  light.position.set(0, 0, 160);
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
