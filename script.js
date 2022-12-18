const searchBtn = document.querySelector('.search');
const temp = document.querySelector('.temp');
const tempUnit = 'imperial';
const place = document.querySelector('.location');

searchBtn.onclick = getData;
async function getData() {
    const input = document.querySelector('.input').value;
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${input}&APPID=a93dc5d8b847e21f3fdb25aa086743d9&units=${tempUnit}`, {mode:'cors'});
    const data = await response.json();
    console.log(data)
    temp.textContent = `${data.main.temp}`;    
    const testResponse = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${data.sys.country}&appid=a93dc5d8b847e21f3fdb25aa086743d9&units=${tempUnit}`, {mode:'cors'});

    const lat = data.coord.lat;
    const long = data.coord.lon;
    const testResp = await fetch(`http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${long}&appid=a93dc5d8b847e21f3fdb25aa086743d9`, {mode:'cors'});
    const testDat = await testResp.json();
    console.log(testDat) 

    if ( testDat[0].state !== '') {
        return place.firstChild.textContent = `${data.name}, ${testDat[0].state}, ${data.sys.country}`;
    } else return place.firstChild.textContent = `${data.name}, ${data.sys.country}`;
    ;
}

