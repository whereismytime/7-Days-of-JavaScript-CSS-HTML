
(function() {
    var preTag = document.getElementById('donut'); // Отримання елементу за ID

    // Кути, радіуси та константи
    var A = 1, B = 1, R1 = 1, R2 = 2, K1 = 150, K2 = 5;

    // Функція для рендерингу кадру ASCII
    function renderAsciiFrame(){
        var b = []; // Масив для зберігання символів ASCII
        var z = []; // Масив для зберігання глибинних значень

        var width = 380; // Ширина кадру
        var height = 160; // Висота кадру

        A += 0.07; // Збільшення кута A
        B += 0.03; // Збільшення кута B

        var cA = Math.cos(A), sA = Math.sin(A),
            cB = Math.cos(B), sB = Math.sin(B);

        for(var k = 0; k < width * height; k++){
            b[k] = k % width == width - 1 ? '\n' : ' ';
            z[k] = 0;
        }

        for (var j = 0; j < 6.28; j += 0.07){
            var ct = Math.cos(j), st = Math.sin(j);
            for(var i = 0; i < 6.28; i += 0.02){
                var sp = Math.sin(i), cp = Math.cos(i),
                    h = ct + 2, D = 1 / (sp * h * sA + st * cA + 5),
                    t = sp * h * cA - st * sA;

                var x = Math.floor(width / 2 + (width / 4) * D * (cp * h * cB - t * sB)),
                    y = Math.floor(height / 2 + (height / 4) * D * (cp * h * sB + t * cB)),
                    o = x + width * y,
                    N = Math.floor(8 * ((st * sA - sp * ct * cA) * cB - sp * ct * sA - st * cA - cp * ct * sB));

                if (height > y && y >= 0 && x >= 0 && width > x && D > z[o]){
                    z[o] = D;
                    b[o] = '.,-~:;=!*#$@'[N > 0 ? N : 0];
                }
            }
        }

        preTag.innerHTML = b.join('');
    }

    // Функція для початку анімації ASCII
    function startAsciiAnimation(){
        window.asciiIntervalId = setInterval(renderAsciiFrame, 50);
    }

    // Відображення початкового кадру ASCII
    renderAsciiFrame();

    // Додавання обробника події для запуску анімації після завантаження сторінки
    if (document.all){
        window.attachEvent('onload', startAsciiAnimation);
    } else {
        window.addEventListener('load', startAsciiAnimation, false);
    }

    // Додавання обробника події для оновлення кадру ASCII при зміні розміру вікна
    window.addEventListener('resize', renderAsciiFrame);
})();
