//select Elements
//my api key=3e634834ad192fb4a392c07720892283

const iconElement=document.querySelector('.weather-icon')
const tempElement=document.querySelector('.temperature-value p')
const descElement=document.querySelector('.temperature-description')
const locationElement=document.querySelector('.location p')
const notificationElement=document.querySelector('.notification')

//data
const weather={};
weather.temperature={
    unit:'celsius'
};

//const and variables
const KELVIN=273;
//API key 
const key='3e634834ad192fb4a392c07720892283'

//check i the broser supports geolocoalization
if('geolocation'in navigator){
    navigator.geolocation.getCurrentPosition(setPosition, showError);
}else
   {
    notificationElement.style.display='block';
    notificationElement.innerHTML='<p>Broser doesn"t support Geolocalization'
}

//set user position
function setPosition(position)
{
   let latitude = position.coords.latitude;
   let longitude= position.coords.longitude;

  getWeather(latitude,longitude);
}

//sho error hen ther is a problem ith geolocalization

function showError(error)
{
    notificationElement.style.display='block';
    notificationElement.innerHTML=`<p> ${error.message}`
}

//get api rom provider
function getWeather(latitude,longitude){
    let api =`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`
    fetch(api).then(function(response){
        let data=response.json();
        return data
    })
    .then(function(data){
        weather.temperature.value=Math.floor(data.main.temp-KELVIN)
        weather.description=data.weather[0].description;
        weather.iconId=data.weather[0].icon;
        weather.city=data.name
        weather.country=data.sys.country;
    })
    .then(function(){
        displayWeather();
    });
}
//display the eather to the UI
function displayWeather(){
    iconElement.innerHTML=``
    tempElement.innerHTML=`${weather.temperature.value}<span style='font-size:100px;'>&#8451</span>`
    descElement.innerHTML=weather.description;
    locationElement.innerHTML=`${weather.city},${weather.country}`

}