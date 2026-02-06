(function () {
  var DESIGN_WIDTH = 440;
  var DESIGN_HEIGHT = 959;
  var FOOTER_HEIGHT = 110;

  function applyScale() {
    var vw = window.innerWidth;
    var vh = window.innerHeight;

    // 幅基準のスケール（画面幅いっぱいに表示）
    var scaleX = Math.min(vw, DESIGN_WIDTH) / DESIGN_WIDTH;
    // 高さ基準のスケール（画面全体）
    var scaleY = vh / DESIGN_HEIGHT;
    // 幅優先: 画面幅に合わせる。高さがはみ出す場合のみ高さ基準に
    var scale = Math.min(scaleX, scaleY);

    var scaledW = DESIGN_WIDTH * scale;
    var scaledH = DESIGN_HEIGHT * scale;

    // 全セクションの .screen にスケール適用
    var screens = document.querySelectorAll('.screen');
    screens.forEach(function (s) {
      s.style.transform = 'scale(' + scale + ')';
      s.style.transformOrigin = 'top left';
    });

    var wrappers = document.querySelectorAll('.screen-wrapper');
    wrappers.forEach(function (w) {
      w.style.width = scaledW + 'px';
      w.style.height = scaledH + 'px';
    });
  }

  window.addEventListener('DOMContentLoaded', applyScale);
  window.addEventListener('resize', applyScale);

  // #cta アンカーリンク → scroll-snap コンテナ内でスムーズスクロール
  document.addEventListener('click', function (e) {
    var link = e.target.closest('a[href="#cta"]');
    if (!link) return;
    e.preventDefault();
    var target = document.getElementById('cta');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
})();
