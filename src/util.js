const requestAnimationFrame = window.requestAnimationFrame || window.setTimeout;

const now = () => Date.now();

export default {
  requestAnimationFrame,
  now
}
