const searchBtn = document.querySelector('.search');
const temp = document.querySelector('.temp');
const tempUnit = 'imperial';
const place = document.querySelector('.location');
const tempMin = document.querySelector('.temp-min').lastElementChild;
const tempMax = document.querySelector('.temp-max').lastElementChild;

searchBtn.onclick = getData;

async function getData() {
    const input = document.querySelector('.input').value;
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${input}&APPID=a93dc5d8b847e21f3fdb25aa086743d9&units=${tempUnit}`, {mode:'cors'});
    const data = await response.json();

    temp.textContent = `${data.main.temp}`; 
    tempMax.textContent = `${data.main.temp_max}`;     
    tempMin.textContent = `${data.main.temp_min}`;  
    getState(data);
}

async function getState(data) {
    const lat = data.coord.lat;
    const long = data.coord.lon;
    const fetchData = await fetch(`http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${long}&appid=a93dc5d8b847e21f3fdb25aa086743d9`, {mode:'cors'});
    const geoData = await fetchData.json();

    //displays city, state, & country if possible
    if ( geoData[0].state !== '') {
        return place.firstChild.textContent = `${data.name}, ${geoData[0].state}, ${data.sys.country}`;
    } else return place.firstChild.textContent = `${data.name}, ${data.sys.country}`;
}

// const testResponse = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${data.sys.country}&appid=a93dc5d8b847e21f3fdb25aa086743d9&units=${tempUnit}`, {mode:'cors'});
