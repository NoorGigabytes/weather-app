import React, {useState, useRef, useEffect} from "react"
import Weather from "./components/Weather"

function App() {
  const apiKey = "5fe255505bb66149315d4bd5386bf540"
  const inputRef = useRef(null)
  const [updated, setUpdated] = useState('')
  const [validCity, setValidcity] = useState(false)
  const [weatherData, setWeatherData] = useState({})

  useEffect(() => {
    fetchReq()
    const updateWeatherMinute = setInterval(fetchReq, 60000 );
        return () => clearInterval( updateWeatherMinute );
    }, [updated])

  function fetchReq() {
    if (updated !== "") {
      fetch(`https://api.openweathermap.org/data/2.5/weather?q=${updated}&units=metric&appid=${apiKey}`)
          .then(res => res.json())
          .then(data => {
            setWeatherData({
            city: data.name,
            timezone: data.timezone,
            temp: data.main.temp,
            icon: data.weather[0].icon,
            description: data.weather[0].description,
            feelsLike: data.main.feels_like,
            humidity: data.main.humidity,
            pressure: data.main.pressure,
            wind: data.wind.speed,
            visibility: data.visibility
          })
          setValidcity(true)
        })
          .catch(error => {
            alert('Enter a valid city name.')
            setValidcity(false)
          })
    }
  }

  const handleClick = () => {
    setUpdated(inputRef.current.value);
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      setUpdated(inputRef.current.value);
    }
  }

  return (
    <div className="card">
      <div className="search">
        <input
          ref={inputRef}
          type="text" 
          name="input" 
          id="input" 
          className="search-bar" 
          placeholder="Search"
          onKeyDown={handleKeyDown}
        />
        <button onClick={handleClick}>
          <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 1024 1024" height="1.5em" width="1.5em" xmlns="http://www.w3.org/2000/svg">
            <path d="M909.6 854.5L649.9 594.8C690.2 542.7 712 479 712 412c0-80.2-31.3-155.4-87.9-212.1-56.6-56.7-132-87.9-212.1-87.9s-155.5 31.3-212.1 87.9C143.2 256.5 112 331.8 112 412c0 80.1 31.3 155.5 87.9 212.1C256.5 680.8 331.8 712 412 712c67 0 130.6-21.8 182.7-62l259.7 259.6a8.2 8.2 0 0 0 11.6 0l43.6-43.5a8.2 8.2 0 0 0 0-11.6zM570.4 570.4C528 612.7 471.8 636 412 636s-116-23.3-158.4-65.6C211.3 528 188 471.8 188 412s23.3-116.1 65.6-158.4C296 211.3 352.2 188 412 188s116.1 23.2 158.4 65.6S636 352.2 636 412s-23.3 116.1-65.6 158.4z"></path>
          </svg>
        </button>
      </div>
      {!validCity ? <h3>Loading...</h3> : <Weather 
        city={weatherData.city} 
        temp={weatherData.temp} 
        icon={weatherData.icon} 
        description={weatherData.description} 
        feelsLike={weatherData.feelsLike} 
        humidity={weatherData.humidity} 
        pressure={weatherData.pressure} 
        wind={weatherData.wind} 
        visibility={weatherData.visibility} 
        timezone={weatherData.timezone} 
      />}
    </div>
  );
}

export default App;
