const requestAnimationFrame = window.requestAnimationFrame || window.setTimeout;

const now = () => Date.now();

const degToRad = (degree) => degree * Math.PI / 180;

export default {
  requestAnimationFrame,
  now,
  degToRad
};
