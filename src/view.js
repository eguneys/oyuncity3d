module.exports = function(ctrl) {
  var data = ctrl.data;
  return {
    tag: 'p',
    children: `${data.msg} is alive! <br/> <span class="cat">${data.face}</span> `
  };
};
