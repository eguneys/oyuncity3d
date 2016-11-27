import Themes from './themes';

var settings = {};

settings.theme = Themes.current;

settings.data = {
  antialias: false,
  cameraFov: 40,

  arenaWidth: 600,
  arenaHeight: 600,
  arenaElevation: 10,

  dirLightColor: 0xffffff,
  dirLightIntensity: 0.88,
  hemisphereLightSkyColor: 0xffffff,
  hemisphereLightGroundColor: 0xb1b1b1,
  hemisphereLightIntensity: 0.74,
  arenaSurfaceY: -200
};

module.exports = settings;
