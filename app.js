let weather = {
    "apiKey": "3b39cac153f944d575676367656b4784",
    fetchWeather: function(city){
        fetch(
            "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=metric&appid=" + this.apiKey
        ).then((response) => response.json()).then((data) => this.displayWeather(data));
    },
    displayWeather: function(data) {
        const { name } = data;
        const { icon, description } = data.weather[0];
        const { temp, humidity } = data.main;
        const { speed } = data.wind;
        
        //Icon
        document.querySelector('.city').innerText = "Weather in " + name;
        document.querySelector('.icon').src = "https://openweathermap.org/img/wn/" + icon + "@2x.png";
        document.querySelector(".description").innerText = description;
        document.querySelector(".temp").innerText = celciusToFahrenheit(temp) + "°F";
        document.querySelector(".humidity").innerText = "Humidity: " + humidity + "%";

        if ( kmToMph(speed) === 0 )
        {
            document.querySelector(".wind").innerText = "Wind Speed: Calm";
        } else {
            document.querySelector(".wind").innerText = "Wind Speed: " + kmToMph(speed) + " mph";
        }

        document.querySelector(".weather").classList.remove("loading");
        document.body.style.backgroundImage = "url('https://source.unsplash.com/1600x900/?" + name +"')";
    },
    search: function () {
        this.fetchWeather(document.querySelector(".search-bar").value);
    }
};

document.querySelector(".search button").addEventListener('click', function(){
    weather.search();
});

document.querySelector(".search-bar").addEventListener('keyup', function(event){
    if (event.key == "Enter") {
        weather.search();
    }
});

function celciusToFahrenheit(temp) {
    var result = Math.floor((temp * 9/5) + 32);
    return result;
}

function kmToMph(km) {
    var result = Math.floor(km / 1.609);
    return result;
}

weather.fetchWeather("Chicago");