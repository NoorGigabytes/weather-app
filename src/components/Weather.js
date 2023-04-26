import React, {useState, useEffect, useCallback} from "react"

export default function Weather (props) {
    const [timerVal, setTimerVal] = useState([])

    const tick = useCallback(() => {
        let date = new Date();
        let utcTimeInSeconds = date.getUTCHours()*3600 + date.getUTCMinutes()*60 + date.getUTCSeconds();
        let localTimeInSeconds = utcTimeInSeconds + props.timezone;
        if (localTimeInSeconds < 0) {
            localTimeInSeconds = 86400 + localTimeInSeconds
        } else if (localTimeInSeconds > 86400) {
            localTimeInSeconds = localTimeInSeconds - 86400
        }
        let hours = Math.floor(localTimeInSeconds / 3600);
        localTimeInSeconds %= 3600;
        let minutes = Math.floor(localTimeInSeconds / 60);
        let seconds = localTimeInSeconds % 60;
        setTimerVal([hours, minutes, seconds])
    }, [props.timezone])

    useEffect(() => {
        const timer = setInterval( tick, 1000 );
        return () => clearInterval( timer );
    }, [tick])

    return (
        <div className="weather loading">
            <h2 className="city">Weather in {props.city}</h2>
            <h1 className="temp">{props.temp}°C</h1>
            <div className="flex">
                <img src={`https://openweathermap.org/img/wn/${props.icon}.png`} alt="" className="icon" />
                <div className="description">{props.description}</div>
            </div>
            <div className="flex position">
                <div className="flex-left">
                    <div className="feels-like">Feels like: {props.feelsLike}°C</div>
                    <div className="humidity">Humidity: {props.humidity}%</div>
                    <div className="pressure">Pressure: {props.pressure} Pa</div>
                    <div className="wind">Wind speed: {props.wind} km/h</div>
                    <div className="visibility">Visibility: {props.visibility/1000} km</div>
                </div>
                <div className="flex-right">
                    {timerVal[0] && <div className="time">{`${String(timerVal[0]).padStart(2,'0')}:${String(timerVal[1]).padStart(2,'0')}:${String(timerVal[2]).padStart(2,'0')}`}</div>}
                </div>
            </div>
        </div>
    )
}