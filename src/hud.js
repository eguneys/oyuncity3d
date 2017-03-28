import * as THREE from 'three';

import { textureTransparentGradient } from './util';

function Hud(data) {
  this.container = initContainer(data);

  addBunchOfText(data, this.container);

  addPlayerText(data, this.container);
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

function addPlayerText(data, container) {
  const width = 720 * 0.70,
        height = 900 * 0.15;


  const plane = new THREE.Object3D();
  plane.position.set(- data.width + width / 2 + 10,
                     data.height - height / 2 - 10,
                     0);
  container.add(plane);

  const bgTexture = new THREE.Texture(
    textureTransparentGradient('#000000'));
  bgTexture.needsUpdate = true;

  const material = new THREE.MeshBasicMaterial({
    map: bgTexture,
    transparent: true
  });
  const geometry = new THREE.PlaneGeometry(width, height);
  const background = new THREE.Mesh(geometry, material);
  plane.add(background);

  const avatarWidth = width / 4;
  const avatarMaterial = new THREE.MeshBasicMaterial({
    map: data.textures.avatarTexture
  });
  const avatarGeometry = new THREE.PlaneGeometry(avatarWidth, height);
  const avatarMesh = new THREE.Mesh(avatarGeometry, avatarMaterial);
  avatarMesh.position.set(-width / 2 + avatarWidth / 2, 0, 1);
  plane.add(avatarMesh);


  const rankAnchor = new THREE.Object3D();
  rankAnchor.position.set(-width / 2,
                          -height / 2
                          -20, 0);
  plane.add(rankAnchor);

  const balooMesh = data.fonts.makeFontMesh('4');
  const balooGMesh = data.fonts.makeFontMesh2('TH');

  const rank = positionTextMesh(balooMesh, 2, 0, 0);
  rankAnchor.add(rank);

  const textTh = positionTextMesh(balooGMesh, 1,
                                  rank.geometry.layout.width * 2,
                                  -rank.geometry.layout.height/2);
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
  

  const text = data.fonts.montserrat;
  text.position.set(-text.geometry.layout.width / 2,
                          800 / 2 -
                          text.geometry.layout.height,
                          0);
  text.scale.set(2, -2, 1);
  plane.add(text);

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
