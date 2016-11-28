function Themes() {

  this.white = 0xedecd6;

  this.yellow = 0xcdcd00;

  this.currentThemeIndex = 0;
  this.list = [
    new Theme({}),
    new Theme({name: 'default'}),
  ];

  this.current = this.list[this.currentThemeIndex];
}

function Theme(mixin) {
  this.name = "";
  this.terrainColor1 = 0x146ccf;
  this.terrainColor2 = 0x0a71b9;
  this.terrainColor3 = 0x196189;
}

module.exports = new Themes();
