import * as THREE from 'three';
import { degToRad } from './util';

import * as colors from './colors';

const blockColorMap = {
  white: 0xffffff,
  yellow: colors.matYellow500,
  gray: colors.matGrey500,
  lime: colors.matLime500,
  green: colors.matGreen500,
  cyan: colors.matCyan500,
  orange: colors.matOrange500,
  purple: colors.matPurple500,
  blue: colors.matBlue500,
  red: colors.matRed500,
  amber: colors.matAmber700
};

const playerStepWidth = 200 / (10 * 20);

const boardWidth = 200;
const stepDepth = 5;

const nbSteps = 9;
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

const boardBox = new THREE.Box3().setFromCenterAndSize(new THREE.Vector3(), new THREE.Vector3(boardWidth, boardWidth, 1));
const stepBox = boardBox.expandByScalar(-1 * (halfStepWidth + boardPadding));

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

  const blockExtrude = addBlockExtrudeColor(data, board, 'yellow', colors.matAmber700);
  addBlockExtrudeColor(data, board, 'blue', colors.matRed700);
  addBlockExtrudeColor(data, board, 'orange', colors.matGreen700);
  // addBlockExtrudeColor(data, board, 'red', colors.matBlue700);

  const player = addPlayer(data, board);
  this.player = player;

  const pBox = new THREE.Box3().setFromObject(player).size();
  let pDirection = 'up';

  const directions = {
    up: new THREE.Vector3(0, 1, 0),
    down: new THREE.Vector3(0, -1, 0),
    left: new THREE.Vector3(-1, 0, 0),
    right: new THREE.Vector3(1, 0, 0)
  };

  const updatePDirection = () => {
    const pp = this.player.position;

    // if (pp.y + (pBox.y / 2) <= boardEdgeBottomLeft.y) {
    //   pDirection = 'right';
    // }

    if (pp.y + (pBox.y / 2) > stepBox.max.y) {
      pp.y = Math.floor(stepBox.max.y - pBox.y / 2);
      pDirection = 'right';
    }
    else if (pp.x + (pBox.x / 2) > stepBox.max.x) {
      pp.x = Math.floor(stepBox.max.x - (pBox.x / 2));
      pDirection = 'down';
    }
    else if (pp.y + (pBox.y / 2) < stepBox.min.y) {
      pp.y = Math.ceil(stepBox.min.y - pBox.y / 2);
      pDirection = 'left';
    }
    else if (pp.x + (pBox.x / 2) < stepBox.min.x) {
      pp.x = Math.ceil(stepBox.min.x - pBox.x / 2);
      pDirection = 'up';
    }
  };
  
  this.update = (step, total) => {
    const tilePS = 1.5;
    const tileWidth = stepWidth;

    updatePDirection();
    
    const vector = directions[pDirection];
    this.player.position.addScaledVector(vector, step * tilePS * tileWidth);

    
    // board.rotation.z+= 1 / 60 / 10;
    // blockExtrude.position.z = stepDepth * 2 + 10 * Math.sin(-t/60 / 10);

    // const rps = 920;
    // player.rotation.z += degToRad(step * rps);
    // player.position.x += 10 / 60;    
  };
  
  requestAnimationFrame(function loo(t) {

    requestAnimationFrame(loo);
  });
}

function addBlockExtrudeColor(data, board, color, blockColor) {
  const { x, y, w, h } = blockExtrudeMeasures[color];

  return addBlockExtrude(data, board, x, y, w, h, blockColor);
}

function addBlockExtrude(data, board, x, y, width, height, color = 0xcccccc) {
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
    color: color
  });
  
  const geometry = new THREE.ExtrudeGeometry(shape,
                                                  extrudeSettings);

  const mesh = new THREE.Mesh(geometry, material);

  mesh.position.set(x,
                    y,
                    stepDepth* 1.1);
  
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

  addSteps2(data, boardMesh);

  return boardMesh;
}

function addSteps2(data, board) {
  const blocks = data.blocks;

  function getBlockColorOrDefault(blockIndex) {
    const defaultColor = 0x111111;

    return (blocks[blockIndex] ? blockColorMap[blocks[blockIndex].color]
            || defaultColor :
            defaultColor);
  }

  function getBlockTexture(blockIndex) {
    const blockTexture = blocks[blockIndex].texture;
    return data.textures.cityTextures[blockTexture];
  }

  function makeStepMesh(width, height, color = 0xffffff) {
    const mesh = new THREE.Mesh(
      new THREE.BoxGeometry(width, height, stepDepth),
      new THREE.MeshPhongMaterial({
        color: color
      }));

    return mesh;
  }

  function makeStepMesh2(width, height, color, texture) {
    const materials = [
      new THREE.MeshLambertMaterial({
        color: color
      }),      new THREE.MeshLambertMaterial({
        color: color
      }),      new THREE.MeshLambertMaterial({
        color: color
      }),      new THREE.MeshLambertMaterial({
        color: color
      }),
      new THREE.MeshLambertMaterial({
        map: texture
      }),
      new THREE.MeshLambertMaterial({
        color: color
      })];
    const mesh = new THREE.Mesh(
      new THREE.BoxGeometry(width, height, stepDepth),
      new THREE.MultiMaterial(materials));

    return mesh;
  }

  function makeStepBlockY(blockIndex) {
    const block = new THREE.Group();

    var blockColor,
        blockTexture;

    var step1;
    for (var i = 0; i < nbInSteps; i++) {
      blockColor = getBlockColorOrDefault(blockIndex + i);
      blockTexture = getBlockTexture(blockIndex + i);
      step1 = makeStepMesh2(stepWidth, halfStepWidth, blockColor, blockTexture);

      var reverse = blockIndex > 7;
      var inc = reverse ? (nbInSteps - i - 1) : i;

      step1.position.set(0,
                         0
                         + stepIncrementWidth +
                         halfStepWidth * inc +
                         blockPadding * (inc + 1), 0);
      block.add(step1);
    }
    return block;
  }

  const blockEast = makeStepBlockY(1);
  blockEast.position.set(stepBox.min.x,
                         stepBox.min.y,
                         stepDepth);
  board.add(blockEast);
  const blockWest = makeStepBlockY(13);
  blockWest.position.set(stepBox.max.x,
                         stepBox.min.y,
                         stepDepth);
  board.add(blockWest);

  const blockNorth = makeStepBlockY(19);
  blockNorth.position.set(stepBox.min.x,
                          stepBox.min.y,
                         stepDepth);
  blockNorth.rotation.z = degToRad(-90);
  board.add(blockNorth);

  const blockSouth = makeStepBlockY(7);
  blockSouth.position.set(stepBox.min.x,
                          stepBox.max.y,
                         stepDepth);
  blockSouth.rotation.z = degToRad(-90);
  board.add(blockSouth);

  const blockGo = makeStepMesh(stepWidth,
                               stepWidth,
                               0xffffff);
  blockGo.position.set(stepBox.min.x,
                       stepBox.min.y,
                       stepDepth);
  board.add(blockGo);
}

// function addSteps(data, board) {
//   const blocks = data.blocks;

//   function getBlockColorOrDefault(blockIndex) {
//     const defaultColor = 0x111111;

//     return (blocks[blockIndex] ? blockColorMap[blocks[blockIndex].color]
//             || defaultColor :
//             defaultColor);
//   }

//   function makeStepMesh(width, height, color = 0xffffff) {
//     const mesh = new THREE.Mesh(
//       new THREE.BoxGeometry(width, height, stepDepth),
//       new THREE.MeshPhongMaterial({
//         color: color
//       }));

//     return mesh;
//   }

//   var blockIndex = 0;
//   var blockColor;

//   var step0 = makeStepMesh(stepWidth, stepWidth);

//   step0.position.set(-halfBoardWidth + halfStepWidth + boardPadding,
//                     -halfBoardWidth + halfStepWidth + boardPadding,
//                     stepDepth);
//   board.add(step0);

//   var step1,
//       yIncrement = stepIncrementWidth,
//       xIncrement = stepIncrementWidth;
//   for (var i = 0; i < nbInSteps; i++) {
//     blockIndex++;
//     blockColor = getBlockColorOrDefault(blockIndex);
//     step1 = makeStepMesh(stepWidth, halfStepWidth, blockColor);
//     step1.position.set(-halfBoardWidth + halfStepWidth + boardPadding,
//                        -halfBoardWidth + halfStepWidth + boardPadding
//                        + yIncrement
//                        + blockPadding * (i + 1),
//                        stepDepth);
//     board.add(step1);

//     yIncrement += halfStepWidth;
//   }

//   blockIndex = 8;
//   var step2 = makeStepMesh(stepWidth, stepWidth);

//   step2.position.set(-halfBoardWidth + halfStepWidth + boardPadding,
//                      halfBoardWidth - halfStepWidth - boardPadding,
//                     stepDepth);
//   board.add(step2);
//   for (i = 0; i < nbInSteps; i++) {
//     blockIndex++;
//     blockColor = getBlockColorOrDefault(blockIndex);
//     step1 = makeStepMesh(halfStepWidth, stepWidth, blockColor);
//     step1.position.set(-halfBoardWidth + halfStepWidth + boardPadding
//                        + xIncrement
//                        + blockPadding * (i + 1),
//                        halfBoardWidth - halfStepWidth - boardPadding,
//                        stepDepth);
//     board.add(step1);

//     xIncrement += halfStepWidth;
//   }

//   blockIndex = 16;
//   var step4 = makeStepMesh(stepWidth, stepWidth);

//   step4.position.set(halfBoardWidth - halfStepWidth - boardPadding,
//                      halfBoardWidth - halfStepWidth - boardPadding,
//                     stepDepth);
//   board.add(step4);

//   yIncrement = - halfStepWidth * 1.5;
//   for (i = 0; i < nbInSteps; i++) {
//     blockIndex++;
//     blockColor = getBlockColorOrDefault(blockIndex);
//     step1 = makeStepMesh(halfStepWidth, stepWidth, blockColor);
//     step1 = makeStepMesh(stepWidth, halfStepWidth, blockColor);
//     step1.position.set(halfBoardWidth - halfStepWidth - boardPadding,
//                        halfBoardWidth - halfStepWidth - boardPadding
//                        + yIncrement
//                        - blockPadding * (i + 1),
//                        stepDepth);
//     board.add(step1);

//     yIncrement -= halfStepWidth;
//   }

//   blockIndex = 24;
//   var step6 = makeStepMesh(stepWidth, stepWidth);

//   step6.position.set(halfBoardWidth - halfStepWidth - boardPadding,
//                      -halfBoardWidth + halfStepWidth + boardPadding,
//                      stepDepth);
//   board.add(step6);

//   xIncrement = - halfStepWidth * 1.5;
//   for (i = 0; i < nbInSteps; i++) {
//     blockIndex++;
//     blockColor = getBlockColorOrDefault(blockIndex);
//     step1 = makeStepMesh(halfStepWidth, stepWidth, blockColor);
//     step1.position.set(halfBoardWidth - halfStepWidth - boardPadding
//                        + xIncrement
//                        - blockPadding * (i + 1),
//                        - halfBoardWidth + halfStepWidth + boardPadding,
//                        stepDepth);
//     board.add(step1);

//     xIncrement -= halfStepWidth;
//   }
// }

function addPlayer(data, board) {
  // var player = new THREE.Mesh(
  //   new THREE.BoxGeometry(10, 10, 10),
  //   new THREE.MeshBasicMaterial({
  //     color: 0xaabbcc
  //   }));

  const player = data.models.miku;

  player.position.set(stepBox.min.x,
                      0, stepDepth * 4);

  player.scale.set(2, 2, 2);
  player.rotation.x = degToRad(90);
  player.rotation.y = degToRad(90);

  board.add(player);

  return player;
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
  const ambient = new THREE.AmbientLight(0xc0c0c0);
  arena.add(ambient);

  const light = new THREE.DirectionalLight(0x808080, 0.8);
  light.position.set(0, 100, 100);
  arena.add(light);

  const lightHelper = new THREE.DirectionalLightHelper(light);
  arena.add(lightHelper);
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
