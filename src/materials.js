import * as THREE from 'three';
import createTextGeometry from 'three-bmfont-text';
import settings from './settings';
import Themes from './themes';

module.exports = function Materials(data) {

  this.overlay = createOverlayMaterial();


  this.terrain1 = new THREE.MeshLambertMaterial({
    color: settings.theme.terrainColor1,
    shading: THREE.FlatShading
  });

  this.terrain2 = new THREE.MeshLambertMaterial({
    color: settings.theme.terrainColor2,
    shading: THREE.FlatShading
  });

  this.arenaGrid = createArenaGrid(data);

  this.arenaBoardWrapper = createArenaBoardWrapper(data);

  this.boardTile = createBoardTile(data);
  this.boardTile2 = createBoardTile2(data);
  this.boardTile3 = createBoardTile3(data);

  this.player = new THREE.MeshLambertMaterial({ color: Themes.yellow });

  this.avatar1 = createAvatarMaterial(data);
  this.avatar2 = createAvatarMaterial2(data);

  this.roll1 = createButtonSprite(data);

  this.playerHud1 = createButtonSprite(data);

  this.createSpriteMaterialFromTexture = (texture, transparent = false) => {
    return new THREE.SpriteMaterial({
      map: texture,
      transparent: transparent
    });
  };

  this.createFontMesh = (text) => {
    var geometry = createTextGeometry({
      width: 100,
      font: data.fonts.rubik,
      text: text
    });

    var material = new THREE.MeshBasicMaterial({
      map: data.textures.rubik,
      transparent: true,
      color: 'rgb(230, 230, 230)'
    });

    return new THREE.Mesh(geometry, material);
  };
};

function createOverlayMaterial() {
  return new THREE.MeshBasicMaterial({
    color: 0x00ffff
  });
}

function createAvatarShaderMaterial(data) {
  var uniforms = {
    texture2: { type: 't',
                value: data.textures.avatar1
              },
    texture3: { type: 't',
                value: data.textures.bubble
              }
  };
  var vertexShader = data.shaders.vertex1;
  var fragmentShader = data.shaders.fragment1;

  var material = new THREE.ShaderMaterial({
    uniforms,
    vertexShader,
    fragmentShader,
    transparent: true
  });
  return material;
};

function createAvatarMaterial2(data) {
  var avatarTexture = data.textures.avatar1;
  return createTextureMaterial(data, avatarTexture);
}

function createAvatarMaterial(data) {
  var avatarTexture = data.textures.bubble;
  return createTextureMaterial(data, avatarTexture);
}


function createTextureMaterial(data, texture) {

  var material = new THREE.MeshBasicMaterial({
    map: texture,
    color: 0xffffff,
    fog: true,
    transparent: true
  });

  return material;
};

function createArenaGrid(data) {
  var gridTexture = data.textures.wood1;
  gridTexture.mapping = THREE.UVMapping;
  gridTexture.minFilter = THREE.LinearMipMapLinearFilter;
  gridTexture.magFilter = THREE.LineraFilter;
  gridTexture.wrapS = gridTexture.wrapT = THREE.RepeatWrapping;

  return new THREE.MeshLambertMaterial({
    map: gridTexture
  });
}

function createArenaBoardWrapper(data) {
  return new THREE.MeshStandardMaterial({
    color: 0xf4a460
  });
}

function createBoardTile(data) {
  return new THREE.MeshLambertMaterial({
    color: 0xff0000
  });
}

function createBoardTile2(data) {
  return new THREE.MeshLambertMaterial({
    color: 0xffffff
  });
}
function createBoardTile3(data) {
  return new THREE.MeshLambertMaterial({
    color: 0x00ff00
  });
}


function createButtonSprite(data) {
  return new THREE.SpriteMaterial({ color: 0xffffff });
};
