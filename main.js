const inputCity = document.querySelector('#cityChoice');
const buttonCity = document.querySelector('#buttonCity');
const resButton = document.querySelector('#resButton');

inputCity.addEventListener('input', onInputCityChange)
buttonCity.addEventListener('click', buttonDisable)

function isCityValid(inputCityValue) {
    return /^[A-Z]+$/.test(inputCityValue);
}

function buttonDisable (){
    if(inputCity.value === ''){
        return alert('Please enter a valid city name');
    }
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
