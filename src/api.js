module.exports = function api() {
  this.init = (ctrl) => {
    this.ctrl = ctrl;
  };

  this.movePlayer = (player, tile) => {
    this.ctrl.movePlayer(player, tile);
  };
  
};
