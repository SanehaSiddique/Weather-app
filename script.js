const apiKey = "869e06c2eabe444e77c856d297351d36";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city) {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

    if (response.status == 404) {
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
    }
    else {
        var data = await response.json();

        console.log(data);

        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

        if (data.weather[0].main == "Clouds" && data.main.temp > 0) {
            weatherIcon.src = "images/clouds.png";
        }
        else if (data.weather[0].main == "Clear" && data.main.temp > 0) {
            weatherIcon.src = "images/clear.png";
        }
        else if (data.weather[0].main == "Rain" && data.main.temp > 0) {
            weatherIcon.src = "images/rain.png";
        }
        else if (data.weather[0].main == "Drizzle" && data.main.temp > 0) {
            weatherIcon.src = "images/drizzle.png";
        }
        else if (data.weather[0].main == "Mist" && data.main.temp > 0) {
            weatherIcon.src = "images/mist.png";
        }
        else if (data.main.temp < 0) {
            weatherIcon.src = "images/snow.png";
        }

        document.querySelector(".weather").style.display = "block";
        document.querySelector(".error").style.display = "none";
    }
}

// function checkWeather(city) {
//     fetch(apiUrl + city + `&appid=${apiKey}`)
//         .then(response => {
//             if (response.status === 404) {
//                 document.querySelector(".error").style.display = "block";
//                 document.querySelector(".weather").style.display = "none";
//                 return Promise.reject("City not found");
//             }
//             return response.json();
//         })
//         .then(data => {
//             console.log(data);

//             document.querySelector(".city").innerHTML = data.name;
//             document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
//             document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
//             document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

//             if (data.weather[0].main == "Clouds" && data.main.temp > 0) {
//                 weatherIcon.src = "images/clouds.png";
//             }
//             else if (data.weather[0].main == "Clear" && data.main.temp > 0) {
//                 weatherIcon.src = "images/clear.png";
//             }
//             else if (data.weather[0].main == "Rain" && data.main.temp > 0) {
//                 weatherIcon.src = "images/rain.png";
//             }
//             else if (data.weather[0].main == "Drizzle" && data.main.temp > 0) {
//                 weatherIcon.src = "images/drizzle.png";
//             }
//             else if (data.weather[0].main == "Mist" && data.main.temp > 0) {
//                 weatherIcon.src = "images/mist.png";
//             }
//             else if (data.main.temp < 0) {
//                 weatherIcon.src = "images/snow.png";
//             }

//             document.querySelector(".weather").style.display = "block";
//             document.querySelector(".error").style.display = "none";
//         })
//         .catch(() => {
//             document.querySelector(".error").style.display = "block";
//             document.querySelector(".weather").style.display = "none";
//         });
// }

searchBtn.addEventListener("click", () => {
    if (searchBox.value == "") {
        alert("Please enter a city name");
    }
    else {
        checkWeather(searchBox.value);
    }
});