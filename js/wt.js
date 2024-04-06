const APP_ID = '6d35f1ab8a502527d69c1ff0d5e0659c'

const DEFAULT_VALUE = '--';
const searchInput = document.querySelector('#search-input');
const cityName = document.querySelector('.city-name');
const weatherState = document.querySelector('.weather-state');
const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');

const sunrise = document.querySelector('.sunrise');
const sunset = document.querySelector('.sunset');
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

            sunrise.innerHTML = moment.unix(data.sys.sunrise).format('H:mm') || DEFAULT_VALUE;
            sunset.innerHTML = moment.unix(data.sys.sunset).format('H:mm') || DEFAULT_VALUE;
            humidity.innerHTML = data.main.humidity || DEFAULT_VALUE;
            windSpeed.innerHTML = (data.wind.speed * 3.6).toFixed(2) || DEFAULT_VALUE;
        })
});

// Tro ly ao
var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
const recognition = new SpeechRecognition();
recognition.lang = 'vi-VI';

// du lieu tra ve tu webapi ngay khi ket thuc noi
recognition.continuous = false;

const microphone = document.querySelector('.microphone');

const handleVoice = (text) =>{
    console.log('text', text);
    // xu ly loi goi tim kiem
    //thoi tiet tai Ha Noi = ["thoi tiet", "Ha Noi"]
    const handledText = text.toLowerCase();
    if(handledText.includes('thời tiết tại')){
        const location = handledText.split('tại')[1].trim();

        console.log('location', location);
        searchInput.value = location;
        const changeEvent = new Event('change');
        searchInput.dispatchEvent(changeEvent);
        return;
    }
}
microphone.addEventListener('click', (e)=>{
    e.preventDefault();

    recognition.start();
    // hoi cho phep dung  mic khong?
});

// noi xong
recognition.onspeechend = () =>{
    recognition.stop();
}

// co loi xay ra => in ra loi
recognition.onerror = (err) =>{
    console.error(err);
}

// ket qua tra ve tu web api
recognition.onresult = (e) =>{
    console.log('onresult', e);

    const text = e.results[0][0].transcript;
    handleVoice(text);
}
