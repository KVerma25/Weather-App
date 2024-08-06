import { useEffect, useState } from 'react'
import './App.css'
import TopButton from './components/TopButton'
import Inputs from './components/Inputs'
import TimeAndLocation from './components/TimeAndLocation'
import TemperatureAndDetails from './components/TemperatureAndDetails'
import Forecast from './components/Forecast'
import { getFormattedWeatherData, getFormattedForecastData } from './services/weatherService'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
function App() {
  const [query, setQuery] = useState('delhi')
  const [units, setUnits] = useState('metric')
  const [weather, setWeather] = useState(null)
  const [forecast, setForecast] = useState(null)
  const [latitude, setLatitude] = useState('28.6667');
  const [longitude, setLongitude] = useState('77.2167');
  const [type, setType] = useState('Clear')


  useEffect(() => {
    const getWeather = async () => {
      toast.info(`Fetched weather data for ${capitalizeFirstLetter(query)}`)

      const weatherData = await getFormattedWeatherData(query);
      console.log(weatherData)
      setWeather(weatherData)
      setType(weatherData.details)

      setLatitude(weatherData.lat)
      setLongitude(weatherData.lon)
      const forecastData = await getFormattedForecastData(latitude, longitude, weatherData.dt, weatherData.timezone);
      console.log(forecastData)
      setForecast(forecastData)
    }
    getWeather()

  }, [query, units])

  const formatBackground = () => {
    if (!weather) return 'from-cyan-600 to-blue-700';

    switch (type.toLocaleLowerCase()) {
      case 'clear':
        return 'from-yellow-600 to-orange-700';
      case 'cloudy':
        return 'from-gray-400 to-gray-600';
      case 'rainy':
        return 'from-blue-600 to-blue-800';
      case 'drizzle':
        return 'from-blue-300 to-blue-500';
      case 'thunderstorm':
        return 'from-gray-800 to-gray-900';
      case 'snow':
        return 'from-white to-gray-400';
      default:
        return 'from-cyan-600 to-blue-700';
    }
  };



  return (
    <>
      <div className={`mx-auto lg:mt-4 py-5 md:px-32 px-3 bg-gradient-to-br ${formatBackground()} h-fill
       shadow-xl shadow-gray-400 `}>
        <TopButton setQuery={setQuery} />
        <Inputs setUnits={setUnits} setQuery={setQuery} setLatitude={setLatitude} setLongitude={setLongitude} />

        {weather && forecast && (
          <>
            <TimeAndLocation weather={weather} />
            <TemperatureAndDetails weather={weather} units={units} />
            <Forecast title='3 hour step forecast' data={forecast.hourly} units={units} />
            <Forecast title='daily forecast' data={forecast.daily} units={units} />
          </>
        )}

        <ToastContainer autoClose={2500} hideProgressBar={true}
          theme='colored' />

      </div>

    </>
  )
}

export default App
