let cityInput = document.getElementsByTagName('textarea')[0].innerHTML;
let showButton = document.getElementById('show');
let weatherForecast = document.getElementById('container');

//API Call
const Get = (url,callback) => {
  // create new XHR object
  let oReq = new XMLHttpRequest();

  // attach events: 'load', 'error'
  oReq.addEventListener('progress', function(){
    
  });
  oReq.addEventListener('load', function(){
    callback(this.responseText);
  });
  oReq.addEventListener('error', function(){
    console.log('ERROR loading data from', url);
  });

  // first arg: METHOD, second arg: URL
  oReq.open('GET', url);
  // HEADERS GO HERE
  oReq.setRequestHeader('Accept', 'application/json');
  //fire off request
  oReq.send();
};


const displayWeather = (cityID) => {
	
	(Get(`http://api.openweathermap.org/data/2.5/forecast?id=${cityID}&appid=${apiKey}`,(data) => {
		const parsedWeather = JSON.parse(data);
		//parsedWeather.list[0].weather[0].description
		let dateCache ={};	
		
		while(weatherForecast.hasChildNodes()) {
			weatherForecast.removeChild(weatherForecast.lastChild);
		}
		
		let forecastCityHeader = document.createElement('h3');
		forecastCityHeader.innerHTML = `5 Day Forecast for ${parsedWeather.city.name} <br>`
		weatherForecast.appendChild(forecastCityHeader);

		for (var i = 1; i <= 5; i++) {
			let day = document.createElement('div');
			day.id = 'day' + i;
			day.className = 'day';
			weatherForecast.appendChild(day)
			let dayText = document.createElement('p');
			dayText.id = 'dayText' + i;
			dayText.className = 'dayText';
			day.appendChild(dayText);
		}


		var j = 1;
		for (var i = 0; i < parsedWeather.list.length; i++) {
			if(!dateCache.hasOwnProperty(parsedWeather.list[i].dt_txt.substring(0,10))) {
				dateCache[parsedWeather.list[i].dt_txt.substring(0,10)] = 'exists';
				let fillIn = document.getElementById('dayText' + j);
				fillIn.innerHTML = 
					`date: ${parsedWeather.list[i].dt_txt.substring(0,10)} <br>
					description: ${parsedWeather.list[i].weather[0].description} <br>
					temperature: ${kToF(parsedWeather.list[i].main.temp)} F <br>
					`;
				j++;
			}
		}
	}))();

}

function kToF(kelvin) {
	return Math.round(kelvin*(9/5)-459.67);
}

showButton.addEventListener('click', ()=> {
	cityInput = document.getElementsByTagName('textarea')[0].value;
	//container display 5 day forecast for that city
	//or throw error if they enter an invalid value in textarea
	//parse through cit.list.json to find cityID
	cityInput = cityInput.toLowerCase();

	let cityInputID = null;

	cityList.some(city => {
		//if city name matches name in cityList, return id#
		if(cityInput === city.name.toLowerCase()) {
			cityInputID = city._id;
			return true;
		} else {
			return false;
		}
	});

	if(cityInputID === null) {
		console.log('that\'s not a valid entry');
	} else {
		displayWeather(cityInputID);
	}
	
});




