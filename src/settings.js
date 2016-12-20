import Themes from './themes';

var TILE_WIDTH = 42;
var TILE_HEIGHT = 10;

var settings = {};

settings.theme = Themes.current;

settings.data = {

  defaultFramerate: 60,
  defaultTimestep: 1000/60,
  maxUpdatesPerFrame: 15,

  antialias: true,
  cameraFov: 20,
  cameraX: TILE_HEIGHT * 32,
  cameraDepth: TILE_HEIGHT * 40,

  arenaWidth: TILE_WIDTH * 12,
  arenaHeight: TILE_WIDTH * 12,
  arenaElevation: TILE_HEIGHT * 0.5,
  arenaDepth: TILE_WIDTH / 6,
  unitSize: TILE_WIDTH / 4,

  avatarSize: TILE_WIDTH * 0.4,

  boardWidth: TILE_WIDTH * 4.5 + TILE_WIDTH * 0.25,

  tileWidth: TILE_WIDTH,
  tileDepth: TILE_WIDTH / 6,

  playerHudWidth: 200,
  playerHudHeight: 100,

  rowTiles: 6,
  totalTiles: 6 * 4,

  dirLightColor: 0xffffff,
  dirLightIntensity: 0.9,
  hemisphereLightSkyColor: 0xaaaaaa,
  hemisphereLightGroundColor: 0x000000,
  hemisphereLightIntensity: 0.9,
  arenaSurfaceY: -200
};

settings.data.framerate = settings.data.defaultFramerate;
settings.data.timestep = settings.data.defaultTimestep;

module.exports = settings;
