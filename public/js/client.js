console.log(apiKey);

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
		console.log(parsedWeather);
		for (var i = 0; i < 5; i++) {
			weatherForecast.innerHTML += 
				`date: ${parsedWeather.list[i].dt_txt.substring(0,10)} <br>
				description: ${parsedWeather.list[i].weather[0].description} <br>
				temperature: ${kToF(parsedWeather.list[i].main.temp)} <br>
				`;
		}
	}))();

}

function kToF(kelvin) {
	return Math.round((kelvin*(9/5)-459.67)*100)/100;
}

showButton.addEventListener('click', ()=> {
	cityInput = document.getElementsByTagName('textarea')[0].innerHTML;
	//container display 5 day forecast for that city
	//or throw error if they enter an invalid value in textarea
	//parse through cit.list.json to find cityID
	

	displayWeather(707860);

});




