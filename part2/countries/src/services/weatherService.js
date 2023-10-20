import axios from "axios";

const WEATHER_API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

function getWeatherInCity(city, callback) {
    axios
        .get(`http://api.weatherapi.com/v1/current.json?key=${WEATHER_API_KEY}&q=${city}&aqi=no`)
        .then(response => {
            const current = response.data.current;
            callback({
                temp: current.temp_c,
                icon: current.condition.icon,
                description: current.condition.text,
                wind: current.wind_kph / 3.6
            });
        });
}

export default {getWeatherInCity};
