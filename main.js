
const inputCity = document.querySelector('#inputCity');
const buttonCity = document.querySelector('#buttonCity');
const resButton = document.querySelector('#resButton');
const weatherBlock = document.querySelector('#weatherBlock');
const weatherPic = document.querySelector('#weatherPic');


inputCity.addEventListener('input', onInputCityChange)
buttonCity.addEventListener('click', getWeather)
resButton.addEventListener('click', buttonRestart)


function isCityValid(inputCityValue) {
    return /^[A-Z-a-z-А-Я-а-я]+(?:\s[A-Z-a-z-А-Я-а-я]+)*$/.test(inputCityValue);
}


function buttonRestart (){
    document.getElementById('choiceCityBlock').classList.remove('hidden');
    weatherBlock.classList.add('hidden');
    weatherPic.classList.add('hidden');
    resButton.classList.add('hidden');
}

function onInputCityChange() {
    if (isCityValid(inputCity.value)) {
        inputCity.classList.remove('invalid');
        inputCity.classList.add('valid');
        buttonCity.disabled = false;
    } else {
        inputCity.classList.add('invalid');
        inputCity.classList.remove('valid');
        buttonCity.disabled = true;
    }

}

async function getWeather(event){
    event.preventDefault();
    const weatherLink = `https://api.openweathermap.org/data/2.5/weather?q=${inputCity.value}&units=metric&APPID=5d066958a60d315387d9492393935c19`;
    if(inputCity.value === ''){
        return alert('Please enter a valid city name');
    }
    document.getElementById('processing').classList.remove('hidden');
    document.getElementById('choiceCityBlock').classList.add('hidden');
    document.getElementById('resButton').classList.remove('hidden');
    try{
        const data = await fetch(weatherLink).then(res => {
            if(!res.ok){
                weatherBlock.innerHTML = '<p class="block">City is not found. Please click for rest button and enter correctly city name and try again.</p>'
                return;
            }
            return res.json();
        });
        weatherBlock.classList.remove('hidden');
        weatherBlock.innerHTML =
            `<p class="block">Temperature:${data.main.temp}</p>
            <p class="block">Pressure:${data.main.pressure}</p>
            <p class="block">Description:${data.weather[0].description}</p>
            <p class="block">Humidity:${data.main.humidity}</p>
            <p class="block">Wind speed:${data.wind.speed}</p>
            <p class="block">Deg:${data.wind.deg}</p>`;
        weatherPic.classList.remove('hidden');
        weatherPic.src = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
    }catch(error){
        console.log(error);
    }finally{
        document.getElementById('processing').classList.add('hidden');
    }

}