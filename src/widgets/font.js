import * as THREE from 'three';


module.exports = function TextView(data, width, height) {
  var canvas = document.createElement('canvas');

  var ctx = canvas.getContext('2d');

  var message = "something";
  var fontSize = 20;

  ctx.font = 'bold 20px Arial';
  
  var metrics = ctx.measureText(message);
  var textWidth = metrics.width;

  canvas.width = textWidth;
  canvas.height = fontSize;


  ctx.fillStyle = 'white';
  ctx.textAlign = "center";
  ctx.fillText(message,
               canvas.width / 2,
               canvas.height / 2);

  document.body.append(canvas);

  var texture = new THREE.Texture(canvas);
  texture.needsUpdate = true;
  // texture.generateMipmaps = false;
  this.sprite = new THREE.Sprite(
    data.materials.createSpriteMaterialFromTexture(
      texture
    ));
  
  this.width = width;
  this.height = height;

  this.sprite.scale.set(width, height, 1);
};
