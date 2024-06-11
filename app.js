function searchWeather() {
    let inp = document.getElementById("search-bar").value;
    const apiKey = '402d9b19e80b5ec14766dc6188b97e4a';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${inp}&appid=${apiKey}&units=metric`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            console.log(data);
            const weather = data.weather[0].description;
            const temp = data.main.temp;
            const feelsLike = data.main.feels_like;
            const minTemp = data.main.temp_min;
            const maxTemp = data.main.temp_max;
            const city = data.name;
            const country = data.sys.country;
            let weatherIcon = '';
            if (weather.includes('cloud')) {
                weatherIcon = '<i class="fas fa-cloud"></i>';
            } else if (weather.includes('sun') || weather.includes('clear')) {
                weatherIcon = '<i class="fas fa-sun"></i>';
            } else if (weather.includes('rain')) {
                weatherIcon = '<i class="fas fa-cloud-rain"></i>';
            } else if (weather.includes('snow')) {
                weatherIcon = '<i class="fas fa-snowflake"></i>';
            } else if (weather.includes('thunderstorm')) {
                weatherIcon = '<i class="fas fa-bolt"></i>';
            } else {
                weatherIcon = '<i class="fas fa-cloud"></i>'; // default icon
            }

            document.getElementById("weatherInfo").innerHTML = `Weather in ${city}, ${country}: ${weatherIcon} ${weather}`;
            document.getElementById("temp").innerHTML = `<i class="fas fa-thermometer-half"></i> ${temp}°C`;
            document.getElementById("feels-like").innerHTML = `<i class="fas fa-temperature-low"></i> Feels like ${feelsLike}°C`;
            document.getElementById("min").innerHTML = `<i class="fas fa-thermometer-quarter"></i> Min: ${minTemp}°C`;
            document.getElementById("max").innerHTML = `<i class="fas fa-thermometer-full"></i> Max: ${maxTemp}°C`;
            
            const infoCard = document.querySelector('.info');
            infoCard.classList.add('show-card');
        })
        .catch(error => {
            document.getElementById("weatherInfo").innerText = 'Error retrieving weather data';
        });
}
