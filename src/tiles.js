import settings from './settings';

// x y z
var tileMatrix = [ +1, +1,
                   -1, +1,
                   -1, -1,
                   +1, -1];

var offsetMatrix = [-1, 0,
                    0, -1,
                    1, 0,
                    0, 1];

function getNextCorner(tile) {
  return (Math.floor(tile / settings.data.rowTiles) + 1)
    % 4;
}


function getTilePosI(idx) {
  var cornerIdx = Math.floor(idx / 6);
  var offsetIdx = idx % 6;
  var pos = getTilePos(cornerIdx, offsetIdx);
  return pos;
}

function getTilePos(cornerIdx, offsetIdx) {
  var tileWidth = settings.data.tileWidth;

  var x = tileWidth * 1.75
      * tileMatrix[cornerIdx * 2 + 0];

  var z = tileWidth * 1.75
      * tileMatrix[cornerIdx * 2 + 1];

  var y = settings.data.arenaElevation;

  var tileOffset = offsetIdx * tileWidth * 0.5;

  if (tileOffset > 0) {
    tileOffset += tileWidth * 0.25;
  }

  var offsetX = tileOffset
      * offsetMatrix[cornerIdx * 2 + 0];
  var offsetZ = tileOffset
      * offsetMatrix[cornerIdx * 2 + 1];

  x += offsetX;
  z += offsetZ;

  return { x, y, z };
}

module.exports = {
  getNextCorner,
  getTilePos,
  getTilePosI
};
