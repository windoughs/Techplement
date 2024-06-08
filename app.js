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
            document.getElementById("weatherInfo").innerText = `Weather in ${city}, ${country}: ${weather}`;
            document.getElementById("temp").innerHTML = `Temperature Now : ${temp}°C , but feels like ${feelsLike}   `;
            document.getElementById("min").innerText = `Minimum Temperature : ${minTemp}`;
            document.getElementById("max").innerText = `Maximum Temperature : ${maxTemp}`;
        })
        .catch(error => {
            document.getElementById("weatherInfo").innerText = 'Error retrieving weather data';
        });
}
