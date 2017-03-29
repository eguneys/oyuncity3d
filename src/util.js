const requestAnimationFrame = window.requestAnimationFrame || window.setTimeout;

const now = () => Date.now();

const degToRad = (degree) => degree * Math.PI / 180;

// http://jsfiddle.net/FtML5/3/
function textureTransparentGradient(color) {
  var size = 16;
  // create canvas
  const canvas = document.createElement( 'canvas' );
  canvas.width = size;
  canvas.height = size;

  // get context
  var context = canvas.getContext( '2d' );

  // draw gradient
  context.rect( 0, 0, size, size );
  var gradient = context.createLinearGradient( 0, 0, 0, size );
  gradient.addColorStop(0, 'rgba(0, 0, 0, 1)');
  gradient.addColorStop(1, 'rgba(0, 0, 0, 0.6)');
  context.fillStyle = gradient;
  context.fill();

  return canvas;
}

export default {
  requestAnimationFrame,
  now,
  degToRad,
  textureTransparentGradient
};
