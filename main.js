
const inputCity = document.querySelector('#inputCity');
const buttonCity = document.querySelector('#buttonCity');
const resButton = document.querySelector('#resButton');

inputCity.addEventListener('input', onInputCityChange)
buttonCity.addEventListener('click', getWeather)
resButton.addEventListener('click', buttonRestart)


function isCityValid(inputCityValue) {
    return /^[A-Z]+$/.test(inputCityValue);
}


function buttonRestart (){
    document.getElementById('choiceCityBlock').classList.remove('hidden');
    document.getElementById('weatherBlock').classList.add('hidden');
    document.getElementById('weatherPic').classList.add('hidden');
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
                document.getElementById('weatherBlock').innerHTML = 'city is not found. Please click for rest button and enter correctly city name and try again.'
                return;
            }
            return res.json();
        });

        document.getElementById('resButton').classList.remove('hidden');
        document.getElementById('weatherBlock').classList.remove('hidden');
        document.getElementById('weatherBlock').innerHTML =
            `<p class="block">Temperature:${data.main.temp}</p>
            <p class="block">Pressure:${data.main.pressure}</p>
            <p class="block">Description:${data.weather.description}</p>
            <p class="block">Humidity:${data.main.humidity}</p>
            <p class="block">Wind speed:${data.wind.speed}</p>
            <p class="block">Deg:${data.wind.deg}</p>`;
        document.getElementById('weatherPic').classList.remove('hidden');
       document.getElementById('weatherPic').src = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
    }catch(error){
        console.log(error);
    }finally{
        document.getElementById('processing').classList.add('hidden');
    }

}