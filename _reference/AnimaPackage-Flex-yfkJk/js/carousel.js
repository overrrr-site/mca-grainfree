(function() {
  var carousels = {
    feature: { current: 0, total: 3 },
    voice:   { current: 0, total: 4 },
    honesty: { current: 0, total: 3 }
  };

  function updateDots(name, index) {
    var dotsContainer = document.querySelector('.carousel-dots[data-carousel="' + name + '"]');
    if (!dotsContainer) return;
    var dots = dotsContainer.querySelectorAll('.dot');
    dots.forEach(function(dot, i) {
      dot.classList.toggle('active', i === index);
    });
  }

  function createDots() {
    Object.keys(carousels).forEach(function(name) {
      var dotsContainer = document.querySelector('.carousel-dots[data-carousel="' + name + '"]');
      if (!dotsContainer) return;
      var total = carousels[name].total;
      for (var i = 0; i < total; i++) {
        var dot = document.createElement('span');
        dot.className = 'dot' + (i === 0 ? ' active' : '');
        dot.dataset.index = i;
        dot.dataset.carousel = name;
        dot.setAttribute('aria-label', 'スライド ' + (i + 1));
        dot.addEventListener('click', function() {
          var n = this.dataset.carousel;
          var idx = parseInt(this.dataset.index, 10);
          showSlide(n, idx);
        });
        dotsContainer.appendChild(dot);
      }
    });
  }

  function showSlide(name, index) {
    var carousel = carousels[name];
    if (!carousel) return;
    if (index < 0) index = carousel.total - 1;
    if (index >= carousel.total) index = 0;
    carousel.current = index;

    var container = document.querySelector('.' + name);
    if (!container) return;

    // すべてのカード（main_01, main_02, ...）を非表示
    var allCards = container.querySelectorAll('[class^="main_0"]');
    allCards.forEach(function(card) { card.style.display = 'none'; });

    // 対象カードを表示
    var targetCard = container.querySelector('.main_0' + (index + 1));
    if (targetCard) {
      targetCard.style.display = '';
    }

    // ドットインジケータ更新
    updateDots(name, index);
  }

  document.addEventListener('click', function(e) {
    var btn = e.target.closest('.slider-btn, .frame-9, .frame-10');
    if (!btn) return;
    var name = btn.dataset.carousel;
    if (!name || !carousels[name]) return;
    var direction = btn.classList.contains('slider-btn--prev') ||
                    btn.classList.contains('frame-9') ? -1 : 1;
    showSlide(name, carousels[name].current + direction);
  });

  // タッチスワイプ対応
  function initSwipe() {
    Object.keys(carousels).forEach(function(name) {
      var container = document.querySelector('.' + name);
      if (!container) return;

      var startX = 0;
      var startY = 0;
      var isDragging = false;

      container.addEventListener('touchstart', function(e) {
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
        isDragging = true;
      }, { passive: true });

      container.addEventListener('touchend', function(e) {
        if (!isDragging) return;
        isDragging = false;
        var endX = e.changedTouches[0].clientX;
        var endY = e.changedTouches[0].clientY;
        var diffX = endX - startX;
        var diffY = endY - startY;

        // 横方向の移動が縦方向より大きく、30px以上の場合にスワイプ判定
        if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 30) {
          if (diffX < 0) {
            // 左スワイプ → 次へ
            showSlide(name, carousels[name].current + 1);
          } else {
            // 右スワイプ → 前へ
            showSlide(name, carousels[name].current - 1);
          }
        }
      }, { passive: true });
    });
  }

  // 初期状態
  document.addEventListener('DOMContentLoaded', function() {
    createDots();
    Object.keys(carousels).forEach(function(name) {
      showSlide(name, 0);
    });
    initSwipe();
  });
})();
