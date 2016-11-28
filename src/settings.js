import Themes from './themes';

var TILE_WIDTH = 40;
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

  boardWidth: TILE_WIDTH * 4.5 + TILE_WIDTH * 0.25,

  tileWidth: TILE_WIDTH,
  tileDepth: TILE_WIDTH / 6,

  dirLightColor: 0xffffff,
  dirLightIntensity: 0.7,
  hemisphereLightSkyColor: 0xffffff,
  hemisphereLightGroundColor: 0xb1b1b1,
  hemisphereLightIntensity: 0.74,
  arenaSurfaceY: -200
};

settings.data.framerate = settings.data.defaultFramerate;
settings.data.timestep = settings.data.defaultTimestep;

module.exports = settings;
