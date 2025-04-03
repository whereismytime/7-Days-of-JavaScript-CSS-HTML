// Fetch crypto prices and render to DOM / Отримання цін криптовалют і рендер в DOM
function fetchCoinData() {
  fetch(
    'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin%2Ccardano%2Cdogecoin%2Cethereum%2Clitecoin%2Ctether&vs_currencies=usd&include_24hr_change=true'
  )
    .then(res => res.json())
    .then(json => {
      const container = document.querySelector('.container');
      container.innerHTML = ''; // Clear previous data / Очищення попередніх даних

      const coins = Object.keys(json);

      for (let coin of coins) {
        const { usd, usd_24h_change } = json[coin];
        const change = usd_24h_change.toFixed(5);

        container.innerHTML += `
          <div class="coin ${change < 0 ? 'falling' : 'rising'}">
            <div class="coin-logo">
              <img src="images/${coin}.png" alt="${coin} logo" />
            </div>
            <div class="coin-name">
              <h3>${coin}</h3>
              <span>/USD</span>
            </div>
            <div class="coin-price">
              <span class="price">$${usd}</span>
              <span class="change">${change}</span>
            </div>
          </div>
        `;
      }
    })
    .catch(error => {
      console.error('Error while fetching coin data / Помилка під час запиту:', error);
    });
}

// Run once at start / Виклик при завантаженні
fetchCoinData();

// Auto refresh every 10 seconds / Автооновлення кожні 10 секунд
setInterval(fetchCoinData, 10000);
