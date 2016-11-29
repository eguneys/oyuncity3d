import settings from './settings';

module.exports = function World() {
  this.totalTiles = settings.data.totalTiles;

  this.players = [];
};
