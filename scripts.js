const apiKey = "f55ba6eb7020c81e8169061b3d9a02b9";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city) {
    const response = await fetch(apiUrl + city + "&appid=" + apiKey + "&units=metric");
    
    if (response.status == 404) {
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
    } else {
        var data = await response.json();

        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + " km/hr";

        if (data.weather[0].main == "Clouds") {
            weatherIcon.src = "https://cdn-icons-png.flaticon.com/512/1146/1146856.png";
        } else if (data.weather[0].main == "Clear") {
            weatherIcon.src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZ72cHdnsJc030kYyx4AOU05O0qSmvJ0QdIw&usqp=CAU";
        } else if (data.weather[0].main == "Rain") {
            weatherIcon.src = "https://i.pinimg.com/236x/03/1f/80/031f80a02383f31bdd57ae24b3cdde2f.jpg"
        } else if (data.weather[0].main == "Drizzle") {
            weatherIcon.src = "https://i.pinimg.com/564x/4f/4a/d6/4f4ad6f495d35d0cb456ed362b452808.jpg"
        } else if (data.weather[0].main == "Mist") {
            weatherIcon.src = "https://i.pinimg.com/236x/56/6f/ff/566fff25659b5a79b4b0f0c491d26bea.jpg"; // image URL
        }

        document.querySelector(".weather").style.display = "block";
        document.querySelector(".error").style.display = "none";
    }
}

searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value);
});