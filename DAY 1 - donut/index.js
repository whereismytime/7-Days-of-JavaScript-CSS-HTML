(function () {
  // Get the pre element / Отримання елементу <pre>
  var preTag = document.getElementById('donut');

  // Rotation angles, radii, constants / Кути, радіуси, константи
  var A = 1, B = 1, R1 = 1, R2 = 2, K1 = 150, K2 = 5;

  // Renders one frame of ASCII donut / Рендер одного ASCII-кадру
  function renderAsciiFrame() {
    var b = []; // Buffer for ASCII symbols / Буфер для ASCII-символів
    var z = []; // Z-buffer for depth / Z-буфер для глибини

    var width = 380;
    var height = 160;

    A += 0.07;
    B += 0.03;

    var cA = Math.cos(A), sA = Math.sin(A),
        cB = Math.cos(B), sB = Math.sin(B);

    // Clear buffers / Очистка буферів
    for (var k = 0; k < width * height; k++) {
      b[k] = k % width === width - 1 ? '\n' : ' ';
      z[k] = 0;
    }

    // Loop through torus angles / Цикл по кутах тора
    for (var j = 0; j < 6.28; j += 0.07) {
      var ct = Math.cos(j), st = Math.sin(j);
      for (var i = 0; i < 6.28; i += 0.02) {
        var sp = Math.sin(i), cp = Math.cos(i),
            h = ct + 2, D = 1 / (sp * h * sA + st * cA + 5),
            t = sp * h * cA - st * sA;

        var x = Math.floor(width / 2 + (width / 4) * D * (cp * h * cB - t * sB));
        var y = Math.floor(height / 2 + (height / 4) * D * (cp * h * sB + t * cB));
        var o = x + width * y;
        var N = Math.floor(8 * ((st * sA - sp * ct * cA) * cB - sp * ct * sA - st * cA - cp * ct * sB));

        if (y >= 0 && y < height && x >= 0 && x < width && D > z[o]) {
          z[o] = D;
          b[o] = '.,-~:;=!*#$@'[N > 0 ? N : 0];
        }
      }
    }

    // Output to screen / Вивід на екран
    preTag.innerHTML = b.join('');
  }

  // Start the ASCII animation / Запуск ASCII-анімації
  function startAsciiAnimation() {
    window.asciiIntervalId = setInterval(renderAsciiFrame, 50);
  }

  // Render initial frame / Рендер початкового кадру
  renderAsciiFrame();

  // Attach event listeners / Додаємо обробники подій
  if (document.all) {
    window.attachEvent('onload', startAsciiAnimation);
  } else {
    window.addEventListener('load', startAsciiAnimation, false);
  }

  window.addEventListener('resize', renderAsciiFrame);
})();
