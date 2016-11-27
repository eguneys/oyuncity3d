import Themes from './themes';

var TILE_WIDTH = 20;
var TILE_HEIGHT = 10;

var settings = {};

settings.theme = Themes.current;

settings.data = {
  antialias: false,
  cameraFov: 40,

  arenaWidth: TILE_WIDTH * 6,
  arenaHeight: TILE_WIDTH * 6,
  arenaElevation: TILE_HEIGHT,

  boardWidth: TILE_WIDTH * 4.5 + TILE_WIDTH * 0.25,

  tileWidth: TILE_WIDTH,

  dirLightColor: 0xffffff,
  dirLightIntensity: 0.7,
  hemisphereLightSkyColor: 0xffffff,
  hemisphereLightGroundColor: 0xb1b1b1,
  hemisphereLightIntensity: 0.74,
  arenaSurfaceY: -200
};

module.exports = settings;
