const apiKey = "04876c5d24fe4f7a8f1110103230908";
const form = document.querySelector(".weather-form");
const input = document.querySelector(".input");
const output = document.querySelector(".weather-output");

form.onsubmit = async function(e) {
  e.preventDefault();
  const city = input.value.trim();
  if (!city) return;
  const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;
  const res = await fetch(url);
  const data = await res.json();
  output.innerHTML = "";
  if (data.error) {
    const html = `<div class="card"><p>${data.error.message}</p></div>`;
    output.insertAdjacentHTML("beforeend", html);
  } else {
    const html = `
      <div class="card">
        <h2 class="card-city">${data.location.name}, <span>${data.location.country}</span></h2>
        <div class="card-weather">
          <div class="card-value">${data.current.temp_c}<sup>°</sup>C</div>
          <img src="pogoda.png" alt="weather icon" class="img-w" />
        </div>
        <div class="description">${data.current.condition.text}</div>
      </div>`;
    output.insertAdjacentHTML("beforeend", html);
  }
};