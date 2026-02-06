(function () {
  var DESIGN_WIDTH = 440;
  var DESIGN_HEIGHT = 959;

  function applyResponsiveScale() {
    var vw = window.innerWidth;
    var vh = window.innerHeight;

    var scaleX = Math.min(vw, DESIGN_WIDTH) / DESIGN_WIDTH;
    var scaleY = vh / DESIGN_HEIGHT;
    var scale = Math.min(scaleX, scaleY);

    var screen = document.querySelector('.screen');
    var wrapper = document.querySelector('.screen-wrapper');
    if (!screen || !wrapper) return;

    screen.style.transform = 'scale(' + scale + ')';
    screen.style.transformOrigin = 'top left';

    var scaledWidth = DESIGN_WIDTH * scale;
    var scaledHeight = DESIGN_HEIGHT * scale;
    wrapper.style.width = scaledWidth + 'px';
    wrapper.style.height = scaledHeight + 'px';
  }

  window.addEventListener('DOMContentLoaded', applyResponsiveScale);
  window.addEventListener('resize', applyResponsiveScale);
})();
