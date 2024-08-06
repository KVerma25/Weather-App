import { DateTime } from 'luxon'

const API_KEY = 'fac212aa02e4f547904284e478944ebc'
const BASE_URL = 'https://api.openweathermap.org/data/2.5/'

const formatToLocalTime = (secs, offset, format = "cccc, dd LLL yyyy '| Local time :' hh:mm a") => DateTime.fromSeconds(secs + offset, { zone: 'utc' })
    .toFormat(format);

const getFormattedForecastData = async (lat, lon, dt, timezone) => {
    const url = `${BASE_URL}forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}`
    const response = await fetch(url);
    const data = await response.json();

    const list = data.list

    // hourly

    const hourly = list.filter((item) => item.dt > (dt)).slice(0, 5).map((i) => ({
        temp: i.main.temp,
        title: formatToLocalTime(i.dt, timezone, 'hh:mm a'),
        icon: `http://openweathermap.org/img/wn/${i.weather[0].icon}@2x.png`

    }))

    // daily
    const daily = list.filter((item) => item.dt_txt.slice(-8) === '00:00:00').slice(0, 5).map((i) => ({
        temp: i.main.temp,
        title: formatToLocalTime(i.dt, 0, 'ccc'),
        icon: `http://openweathermap.org/img/wn/${i.weather[0].icon}@2x.png`

    }))
    return { hourly, daily }
}

const getFormattedWeatherData = async (city) => {
    try {
        const url = `${BASE_URL}weather?q=${city}&appid=${API_KEY}`;
        const response = await fetch(url);
        const data = await response.json();
        // console.log(data)
        const icon = data.weather[0].icon;
        const details = data.weather[0].main;
        const { temp, feels_like, temp_min, temp_max, humidity } = data.main;
        const { sunrise, sunset, country } = data.sys;
        const { speed } = data.wind;
        const { dt, timezone, coord: { lat, lon }, name } = data;

        return {
            temp, feels_like, temp_min, temp_max, humidity, name, country, dt, timezone, lat, lon,
            sunrise: formatToLocalTime(sunrise, timezone, 'hh:mm a'), sunset: formatToLocalTime(sunset, timezone, 'hh:mm a'),
            speed, details, icon: `http://openweathermap.org/img/wn/${icon}@2x.png`,
            formattedLocalTime: formatToLocalTime(dt, timezone)
        };
    } catch (error) {

        console.error('Error fetching or processing weather data:', error);
        throw error;
    }
};


export { getFormattedWeatherData, getFormattedForecastData }
