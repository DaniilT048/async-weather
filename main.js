
const inputCity = document.querySelector('#inputCity');
const buttonCity = document.querySelector('#buttonCity');
const resButton = document.querySelector('#resButton');

inputCity.addEventListener('input', onInputCityChange)
buttonCity.addEventListener('click', buttonDisable)
buttonCity.addEventListener('click', getWeather)
resButton.addEventListener('click', buttonRestart)


function isCityValid(inputCityValue) {
    return /^[A-Z]+$/.test(inputCityValue);
}

function buttonDisable (){
    if(inputCity.value === ''){
        return alert('Please enter a valid city name');
    }
}

function buttonRestart (){
    document.getElementById('choiceCityBlock').classList.remove('hidden');
    document.getElementById('weatherBlock').classList.add('hidden');
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
const weatherLink = `http://api.openweathermap.org/data/2.5/weather?q=${inputCity.value}&units=metric&APPID=5d066958a60d315387d9492393935c19`;
// const pic = `http://openweathermap.org/img/w/${main.icon}.png`;

async function getWeather(){

    document.getElementById('processing').classList.remove('hidden');
    document.getElementById('choiceCityBlock').classList.add('hidden');
    document.getElementById('resButton').classList.remove('hidden');
    try{
        const data = await fetch(weatherLink).then(res => {
            if(!res.ok){
                document.getElementById('weatherBlock').innerHTML = 'city is not found. Please click for rest button and enter correctly city name and try again.'
            }
            return res.json();
        });
        document.getElementById('resButton').classList.remove('hidden');
        document.getElementById('weatherBlock').classList.remove('hidden');
        document.getElementById('weatherBlock').innerHTML = data.main.temp;

        // document.getElementById('weatherPic').src = pic;
    }catch(error){
        console.log(error);
    }finally{
        document.getElementById('processing').classList.add('hidden');
    }
}