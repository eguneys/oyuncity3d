import * as THREE from 'three';

function Environment(data) {
  this.arena = initArena(data);

  addGridHelper(this.arena);

  addLight(this.arena);
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

function initArena(data) {

  const aspect = 9/16,
        w = 720,
        h = w * aspect,
        d = 100;

  var arena = new THREE.Object3D();
  data.container.add(arena);

  // table
  var table = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    data.materials.arenaGrid);

  arena.add(table);

  return arena;
}

export { Environment }
