const APP_ID = '6d35f1ab8a502527d69c1ff0d5e0659c'

const DEFAULT_VALUE = '--';
const searchInput = document.querySelector('#search-input');
const cityName = document.querySelector('.city-name');
const weatherState = document.querySelector('.weather-state');
const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');

const sunrise = document.querySelector('.sunrise');
const sunrset = document.querySelector('.sunrset');
const humidity = document.querySelector('.humidity');
const windSpeed = document.querySelector('.wind-speed');



searchInput.addEventListener('change', (e)=>{
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${e.target.value}&appid=${APP_ID}&units=metric&lang=vi`)
        .then(async res=>{
            const data = await res.json();
            console.log('[Search Input]', data);
            cityName.innerHTML=data.name|| DEFAULT_VALUE;
            weatherIcon.setAttribute('src', `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`);
            temperature.innerHTML = Math.round(data.main.temp) || DEFAULT_VALUE;
            weatherState.innerHTML = data.weather[0].description || DEFAULT_VALUE;
        })
});

