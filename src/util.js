const requestAnimationFrame = window.requestAnimationFrame || window.setTimeout;

const now = () => Date.now();

module.exports = {
  requestAnimationFrame,
  now
};
