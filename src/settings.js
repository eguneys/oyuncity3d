import Themes from './themes';

var TILE_WIDTH = 30;
var TILE_HEIGHT = 10;

var settings = {};

settings.theme = Themes.current;

settings.data = {

  defaultFramerate: 60,
  defaultTimestep: 1000/60,
  maxUpdatesPerFrame: 15,

  antialias: false,
  cameraFov: 30,
  cameraX: TILE_HEIGHT * 15,
  cameraDepth: TILE_HEIGHT * 16,

  arenaWidth: TILE_WIDTH * 12,
  arenaHeight: TILE_WIDTH * 12,
  arenaElevation: TILE_HEIGHT * 0.5,

  boardWidth: TILE_WIDTH * 4.5 + TILE_WIDTH * 0.25,

  tileWidth: TILE_WIDTH,

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
