import * as THREE from 'three';

function Hud(data) {
  this.container = initContainer(data);

  // addBunchOfText(data, this.container);

  addPlayerText(data, this.container, 'topleft', '1');
  addPlayerText(data, this.container, 'topright', '3');
  addPlayerText(data, this.container, 'bottomright', '2');
  addPlayerText(data, this.container, 'bottomleft', '4');
}

function positionTextMesh(mesh, scale, x, y, centerX) {
  mesh.scale.set(scale, -scale, 1);
  mesh.position.set(x +
                    (centerX ? -mesh.geometry.layout.width / 2 * scale:
                     0),
                    y -
                    mesh.geometry.layout.height / 2 * scale,
                    0);

  return mesh;
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

  const rankSuffix = rankSuffixMap[rankText];

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
      bgAlpha2: 0.6,
      rankColor: 'blue'
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
      bgAlpha2: 0.6,
      rankColor: 'green'
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
      bgAlpha2: 1,
      rankColor: 'yellow'
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
      bgAlpha2: 1,
      rankColor: 'red'
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

  const rankAnchor = new THREE.Object3D();
  rankAnchor.position.set(options.rankX,
                          options.rankY,
                          -20, 0);
  plane.add(rankAnchor);

  const colorFontMesh = data.fonts.makeColorFont(options.rankColor)(rankText);
  const whiteFontMesh = data.fonts.makeWhiteFont(rankSuffix);

  const rank = positionTextMesh(colorFontMesh, 2, 0, 0);
  rankAnchor.add(rank);
  // some tweak
  rank.position.y -= 10;

  const textTh = positionTextMesh(whiteFontMesh, 1.2,
                                  rank.geometry.layout.width * 2,
                                  -rank.geometry.layout.height/2);
  textTh.position.x += 5;
  textTh.position.y -= 5;
  rankAnchor.add(textTh);
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
