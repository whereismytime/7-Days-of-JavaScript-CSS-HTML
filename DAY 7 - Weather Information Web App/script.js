const apiKey = '04876c5d24fe4f7a8f1110103230908';


const header = document.querySelector('.header');
const form = document.querySelector('form');
const input = document.querySelector('.input');

function removeCard(){
            const prevCard = document.querySelector('.card');
        if(prevCard) prevCard.remove()
}

form.onsubmit = function(e){
e.preventDefault();
let city = input.value.trim();
const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`

fetch(url).then((response) => {
    return response.json()
}).then((data) => {
    console.log(data)
    
    if(data.error){
        removeCard()
        const html = ` <div class="card">${data.error.message}</div>`
        header.insertAdjacentHTML('afterend', html)

    }else{
        removeCard()
    const html = `
    <div class="card">
    <h2 class="card-city">${data.location.name} <span> ${data.location.country}</span></h2>
    <div class="card-weather">
        <div class="card-value">${data.current.temp_c} <sup>°</sup>C</div>
        <img src="pogoda.png" alt="weather" class="img-w">
    </div>
    <div class="description">${data.current.condition.text}</div>
</div>
    `
    header.insertAdjacentHTML('afterend', html)
    }  
})
}
