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

const synth = window.speechSynthesis;

recognition.lang = 'vi-VI';

// du lieu tra ve tu webapi ngay khi ket thuc noi
recognition.continuous = false;

const microphone = document.querySelector('.microphone');

const speak = (text)=>{
    // kiem tra synthesis co dang noi hay khong
    if(synth.speaking){
        console.error('Busy. Speaking...');
        return;
    }

    const utter = new SpeechSynthesisUtterance(text);

    utter.onend = ()=>{
        console.log('SpeechSynthesisUtterance.onend');
    }

    utter.onerror = (err) =>{
        console.error('SpeechSynthesisUtterance.onerror', err);
    }

    synth.speak(utter);
}

const handleVoice = (text) =>{
    // console.log('text', text);
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

    // xu ly thay doi mau nen cua ung dung
    const container = document.querySelector('.container');
    // "thay đổi màu nền [black, green,...]"
    if(handledText.includes('thay đổi màu nền')){
        const color = handledText.split('màu nền')[1].trim();
        container.style.background = color;
        return;
    }

    if(handledText.includes('màu nền mặc định')){
        container.style.background = '';
        return;
    }
    // mấy giờ rồi
    if(handledText.includes('mấy giờ')){
        const textToSpeech = `${moment().hours()} giờ ${moment().minutes()} phút`;
        speak(textToSpeech);
        return;
    }

    speak('Không phù hợp');
}
microphone.addEventListener('click', (e)=>{
    e.preventDefault();
    
    recognition.start();
    // hoi cho phep dung  mic khong?
    microphone.classList.add('recording');

});
// microphone.onclick = function(e){
//     e.preventDefault();
//     recognition.start();
//     microphone.classList.add('recording');

// }

// noi xong
recognition.onspeechend = () =>{
    recognition.stop();

    microphone.classList.remove('recording');
}

// co loi xay ra => in ra loi
recognition.onerror = (err) =>{
    console.error(err);

    microphone.classList.remove('recording');
}

// ket qua tra ve tu web api
recognition.onresult = (e) =>{
    console.log('onresult', e);

    const text = e.results[0][0].transcript;
    handleVoice(text);
}

// navigator.geolocation.getCurrentPosition(function(position){
//     console.log(position.coords.latitude, position.coords.longitude);
// })
// navigator.geolocation.getCurrentPosition(function(position){
//     console.log(position.main.name, position.main.temp);
// })
