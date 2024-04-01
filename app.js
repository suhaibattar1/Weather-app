async function getWeather() {
    const apiKey = '0178390f1a556d24c8ffb17ee4786a97'; // Get your API key from OpenWeatherMap
    const city = document.getElementById('cityInput').value.trim();
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (data.cod === 200) {
            updateBackground(data.weather[0].main); // Update background based on weather
            const weatherInfo = `
                <h2>${data.name}, ${data.sys.country}</h2>
                <p>${data.weather[0].description}</p>
                <p>Temperature: ${data.main.temp} °C</p>
                <p>Humidity: ${data.main.humidity}%</p>
            `;
            document.getElementById('weatherInfo').innerHTML = weatherInfo;
        } else {
            document.getElementById('weatherInfo').innerHTML = `<p>${data.message}</p>`;
        }
    } catch (error) {
        console.error('Error fetching weather data:', error);
        document.getElementById('weatherInfo').innerHTML = '<p>Failed to fetch weather data. Please try again.</p>';
    }
}

function updateBackground(weatherCondition) {
    const body = document.querySelector('body');
    // Remove existing weather classes
    body.classList.remove('clear-sky', 'cloudy', 'rainy', 'snowy');
    
    // Add appropriate class based on weather condition
    switch (weatherCondition.toLowerCase()) {
        case 'clear':
            body.classList.add('clear-sky');
            break;
        case 'clouds':
            body.classList.add('cloudy');
            break;
        case 'rain':
            body.classList.add('rainy');
            break;
        case 'snow':
            body.classList.add('snowy');
            break;
        default:
            body.classList.add('clear-sky'); // Default to clear sky
            break;
    }
}
