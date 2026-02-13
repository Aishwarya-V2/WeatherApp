document.getElementById("getWeather").addEventListener("click", function() {
    const city = document.getElementById("city").value;
    const apiKey = "Your_API_Key"; // Replace with your OpenWeatherMap API key
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const weatherDiv = document.getElementById("weatherResult");
            if(data.cod === 200){
                let icon = "";
                const condition = data.weather[0].main.toLowerCase();
                
                if(condition.includes("cloud")) icon = "images/cloudy.png";
                else if(condition.includes("rain")) icon = "images/rainy.png";
                else icon = "images/sunny.png";

                weatherDiv.innerHTML =
                    `<img src="${icon}" alt="Weather Icon">
                    <h2>${data.name}</h2>
                    <p>🌡 Temperature: ${data.main.temp} °C</p>
                    <p>💧 Humidity: ${data.main.humidity} %</p>
                    <p>☁ Condition: ${data.weather[0].description}</p>`;
            } else {
                weatherDiv.innerHTML = `<p style="color: red;">City not found!</p>`;
            }
        })
        .catch(error => {
            console.error("Error fetching data:", error);
            document.getElementById("weatherResult").innerHTML = `<p style="color: red;">Error fetching weather data.</p>`;
        });
});
