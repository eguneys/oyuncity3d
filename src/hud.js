import * as THREE from 'three';

function Hud(data) {
  this.vm = {
    nodePlayers: {}
  };

  this.container = initContainer(data);

  // addBunchOfText(data, this.container);

  this.vm.nodePlayers['topleft'] =
    addPlayerText(data, this.container, 'topleft', '1');
  this.vm.nodePlayers['topright'] =
    addPlayerText(data, this.container, 'topright', '3');
  this.vm.nodePlayers['bottomright'] =
    addPlayerText(data, this.container, 'bottomright', '2');
  this.vm.nodePlayers['bottomleft'] =
    addPlayerText(data, this.container, 'bottomleft', '4');

  this.vm.nodeTurnText = addTurnText(data, this.container, '18');

  this.updateTurn = (nbTurn) => {
    updateTextMeshText(this.vm.nodeTurnText.turnTextMesh,
                       nbTurn);
  };

  this.updateCash = (side, nbCash) => {
    updateTextMeshText(this.vm.nodePlayers[side].cashTextMesh,
                       nbCash);
  };
  this.updateAsset = (side, nbCash) => {
    updateTextMeshText(this.vm.nodePlayers[side].assetTextMesh,
                       nbCash);
  };


  this.updateRanks = (side1, side2) => {
    const obj1 = this.vm.nodePlayers[side1].rankAnchor;
    const obj2 = this.vm.nodePlayers[side2].rankAnchor;

    const tmpPos = obj1.position.clone();
    obj1.position.copy(obj2.position);
    obj2.position.copy(tmpPos);

    const tmpParent = obj1.parent;
    obj1.parent = obj2.parent;
    obj2.parent = tmpParent;
  };


  var turn = 0;
  setInterval(() => {
    this.updateCash('topleft', turn++);
    this.updateAsset('topleft', turn);

    // this.updateRanks('topleft', 'topright');
    // this.updateRanks('bottomleft', 'bottomright');

    // this.updateRanks('topleft', 'bottomright');
    // this.updateRanks('bottomleft', 'topright');

    this.updateRanks('topleft', 'bottomleft');
    this.updateRanks('topright', 'bottomright');
  }, 1000);
}

function updateTextMeshText(mesh, text) {
  mesh.geometry.update(text + "");
}

function getTextMeshWidth(mesh) {
  return mesh.geometry.layout.width * mesh.scale.x;
}
function getTextMeshHeight(mesh) {
  return mesh.geometry.layout.height * mesh.scale.y;
}


function positionTextMesh(mesh, scale, x, y, centerX) {
  mesh.scale.set(scale, -scale, 1);
  mesh.position.set(x +
                    (centerX ? -getTextMeshWidth(mesh) / 2:
                     0),
                    y -
                    -getTextMeshHeight(mesh) / 2,
                    0);

  return mesh;
}

function addTurnText(data, container, nbTurn) {
  const width = data.width,
        height = data.height;

  const nbTurnAnchor = new THREE.Group();
  nbTurnAnchor.position.set(-width + 10,
                            height / 8,
                            0);
  nbTurnAnchor.scale.set(1.5,1.5,1);
  container.add(nbTurnAnchor);

  const labelTurnText = 'TURN';
  const labelTurnMesh = data.fonts.makeWhiteFont(labelTurnText);
  nbTurnAnchor.add(positionTextMesh(labelTurnMesh, 0.5, 0, 0));

  const nbTurnText = nbTurn;
  const turnTextMesh = data.fonts.makeColorFont('yellow')(nbTurnText);
  nbTurnAnchor.add(positionTextMesh(turnTextMesh, 0.6, 
                                       getTextMeshWidth(labelTurnMesh),
                                       0));
  turnTextMesh.position.x+=10;
  turnTextMesh.position.y+=5;

  return {
    turnTextMesh
  };
}

function addPlayerText(data, container, orientation, rankText) {
  const width = data.width * 0.75,
        // height = data.height * 0.3;
        height = width * 0.3;

  const offset = 0;

  const titleHeight = height * 0.3;
  const contentHeight = height - titleHeight;

  const avatarWidth = width / 4;
  const avatarHeight = contentHeight;

  const rankHeight = height * 0.4;
  const rankWidth = width * 0.3;

  const rankSuffixMap = {
    1: 'ST',
    2: 'ND',
    3: 'RD',
    4: 'TH'
  };

  const rankColorMap = {
    1: 'red',
    2: 'yellow',
    3: 'green',
    4: 'blue'
  };

  const rankSuffix = rankSuffixMap[rankText];

  const rankColor = rankColorMap[rankText];

  const matBlue700 = 0x1976D2;
  const matLightBlue400 = 0x29B6F6;
  const matGreen700 = 0x388E3C;
  const matLightGreen400 = 0x9CCC65;
  const matLightGreen700 = 0x689F38;

  const matYellow400 = 0xFFEE58;
  const matAmber700 = 0xFFA000;

  const matDeep400 = 0xFF7043;
  const matRed700 = 0xd32f2f;

  const optionsMap = {
    'topleft': {
      x: - data.width + width / 2 + offset,
      y: data.height - height / 2 - offset,
      avatarX: -width / 2 + avatarWidth / 2,
      avatarY: -height/ 2 + avatarHeight / 2,
      rankX: -width / 2 + 10,
      rankY: -height / 2 - rankHeight / 2,
      titleX: 0,
      titleY: height/2-titleHeight / 2,
      labelCashY: - contentHeight / 2.5,
      bgCorners: {
        rightBottom: true,
        rightTop: true
      },
      titleCorners: {
        rightTop: true
      },
      titleColor1: matLightBlue400,
      titleColor2: matBlue700,
      bgAlpha1: 1,
      bgAlpha2: 0.6
    },
    'topright': {
      x: data.width - width / 2 - offset,
      y: data.height - height / 2 - offset,
      avatarX: width / 2 - avatarWidth / 2,
      avatarY: -height/ 2 + avatarHeight / 2,
      rankX: width / 2 - rankWidth - 10,
      rankY: -height / 2 - rankHeight / 2,
      titleX: 0,
      titleY: height/2-titleHeight / 2,
      labelCashY: - contentHeight / 2.5,
      bgCorners: {
        leftBottom: true,
        leftTop: true
      },
      titleCorners: {
        leftTop: true
      },
      titleColor1: matLightGreen400,
      titleColor2: matGreen700,
      bgAlpha1: 1,
      bgAlpha2: 0.6
    },
    'bottomright': {
      x: data.width - width / 2 - offset,
      y: -data.height + height / 2 + offset,
      avatarX: width / 2 - avatarWidth / 2,
      avatarY: height/ 2 - avatarHeight / 2,
      rankX: width / 2 - rankWidth - 10,
      rankY: height / 2 + rankHeight + 10,
      titleX: 0,
      titleY: - height/2 + titleHeight / 2,
      labelCashY: contentHeight / 2.5,
      bgCorners: {
        leftBottom: true,
        leftTop: true
      },
      titleCorners: {
        leftBottom: true
      },
      titleColor1: matAmber700,
      titleColor2: matYellow400,
      bgAlpha1: 0.6,
      bgAlpha2: 1
    },
    'bottomleft': {
      x: - data.width + width / 2 - offset,
      y: -data.height + height / 2 + offset,
      avatarX: - width / 2 + avatarWidth / 2,
      avatarY: height/ 2 - avatarHeight / 2,
      rankX: -width / 2 + 10,
      rankY: height / 2 + rankHeight + 10,
      titleX: 0,
      titleY: - height/2 + titleHeight / 2,
      labelCashY: contentHeight / 2.5,
      bgCorners: {
        rightBottom: true,
        rightTop: true
      },
      titleCorners: {
        rightBottom: true
      },
      titleColor1: matRed700,
      titleColor2: matDeep400,
      bgAlpha1: 0.6,
      bgAlpha2: 1
    }
  };

  const options = optionsMap[orientation];

  const plane = new THREE.Object3D();
  plane.position.set(options.x,
                     options.y,
                     0);
  container.add(plane);

  const bgTitleTexture = data.textures.makeTextureGradient(
    new THREE.Color(options.titleColor1),
    new THREE.Color(options.titleColor2));

  const bgTexture = data.textures.makeTextureGradient(
      new THREE.Color(0x000000),
      new THREE.Color(0x000000),
    options.bgAlpha1,
    options.bgAlpha2
  );

  const material = new THREE.MeshBasicMaterial({
    map: bgTexture,
    transparent: true,
    opacity: 0.8
  });
  // const geometry = new THREE.PlaneGeometry(width, height);
  const geometry = data.geometries.makeRoundShape(width, height,
                                                  80,
                                                  options.bgCorners);
  const background = new THREE.Mesh(geometry, material);
  plane.add(background);


  const titleMat = new THREE.MeshBasicMaterial({
    map: bgTitleTexture,
    transparent: true
  });
  const titleGeom = data.geometries.makeRoundShape(width,
                                                   titleHeight,
                                                   80 * 0.5,
                                                  options.titleCorners);
  const titleBg = new THREE.Mesh(titleGeom, titleMat);
  titleBg.position.set(options.titleX, options.titleY, 0);
  background.add(titleBg);


  const avatarMaterial = new THREE.MeshBasicMaterial({
    map: data.textures.avatarTexture
  });
  const avatarGeometry = new THREE.PlaneGeometry(avatarWidth, avatarHeight);
  const avatarMesh = new THREE.Mesh(avatarGeometry, avatarMaterial);
  avatarMesh.position.set(options.avatarX,
                          options.avatarY,
                          1);
  plane.add(avatarMesh);



  const assetTextAnchor = new THREE.Group();
  assetTextAnchor.position.set(- width / 4 + 20,
                               0,
                               0);
  plane.add(assetTextAnchor);


  const labelCashAnchor = new THREE.Group();
  labelCashAnchor.position.set(0,
                               options.labelCashY,
                               0);
  assetTextAnchor.add(labelCashAnchor);

  const labelAssetAnchor = new THREE.Group();
  labelAssetAnchor.position.set(0,
                                0,
                                0);
  assetTextAnchor.add(labelAssetAnchor);
  

  const labelCashText = 'CASH';
  const labelCashMesh = data.fonts.makeWhiteFont(labelCashText);
  labelCashAnchor.add(positionTextMesh(labelCashMesh, 0.5, 0, 0));

  const nbCashText = '142,958';
  const cashTextMesh = data.fonts.makeColorFont('green')(nbCashText);
  labelCashAnchor.add(positionTextMesh(cashTextMesh, 0.6, 
                                       getTextMeshWidth(labelCashMesh),
                                       0));
  cashTextMesh.position.x+=10;
  cashTextMesh.position.y+=2;

  const labelAssetText = 'ASSET';
  const labelAssetMesh = data.fonts.makeWhiteFont(labelAssetText);
  labelAssetAnchor.add(positionTextMesh(labelAssetMesh, 0.4, 0, 0));

  const nbAssetText = '100,008';
  const assetTextMesh = data.fonts.makeColorFont('yellow')(nbAssetText);
  labelAssetAnchor.add(positionTextMesh(assetTextMesh, 0.5, 
                                       getTextMeshWidth(labelAssetMesh),
                                       0));
  assetTextMesh.position.x+=10;
  assetTextMesh.position.y+=2;


  const rankAnchor = new THREE.Object3D();
  rankAnchor.position.set(options.rankX,
                          options.rankY,
                          0);
  plane.add(rankAnchor);

  const colorFontMesh = data.fonts.makeColorFont(rankColor)(rankText);
  const whiteFontMesh = data.fonts.makeWhiteFont(rankSuffix);

  const rankTextMesh = positionTextMesh(colorFontMesh, 2, 0, 0);
  rankAnchor.add(rankTextMesh);
  // some tweak
  rankTextMesh.position.y -= 10;

  const rankTextThMesh = positionTextMesh(whiteFontMesh, 1.2,
                                  getTextMeshWidth(rankTextMesh),
                                  getTextMeshHeight(rankTextMesh)/4);
  rankTextThMesh.position.x += 5;
  rankTextThMesh.position.y -= 5;
  rankAnchor.add(rankTextThMesh);

  return {
    cashTextMesh,
    assetTextMesh,
    rankAnchor
  };
}

function addBunchOfText(data, container) {

  const material = new THREE.MeshBasicMaterial({
    color: 0xffff00
  });
  const geometry = new THREE.PlaneGeometry(800, 800);
  const plane = new THREE.Mesh(geometry, material);
  plane.position.set(0, 0, 0);
  container.add(plane);
  

  // const text = data.fonts.montserrat;
  // text.position.set(-text.geometry.layout.width / 2,
  //                         800 / 2 -
  //                         text.geometry.layout.height,
  //                         0);
  // text.scale.set(2, -2, 1);
  // plane.add(text);

  var glass = new THREE.Mesh(
    new THREE.PlaneGeometry(10, 10),
    new THREE.MeshBasicMaterial({
      color: 0xaa00cc
    }));
  glass.position.set(0, 0, 0);
  plane.add(glass);
}

function initContainer(data) {
  const container = new THREE.Object3D();
  data.hudScene.add(container);
  return container;
}

export { Hud }
