import React, { useEffect, useState } from 'react'

export default function WeatherData() {
    const [weather, setWeather] = useState({ x: "default" });
    const [city, setCity] = useState('delhi');
    const [input, setInput] = useState('');


    const key = '9f23b56e8dcad8299bf4e5a2a3fc932b';
    // baseUrl: 'https://api.openweathermap.org/data/2.5/weather'
    // const city = 'delhi';

    const getWeatherReport = async (city) => {
        let dataJson = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=metric`);
        let data = await dataJson.json();
        // let date = new Date(data.sys.sunrise);
        setWeather(data);
        
        console.log(data);
        console.log(weather);
    }
    let todayDate = new Date();

    useEffect(() => {
        getWeatherReport(city);
    }, [city])

    const handleChange = (event) => {
        setInput(event.target.value);
    }

    const btnClick = () => {
        if(input.length == 0){
            alert("Please Enter a City Name First");
            return;
        }
        setCity(input);
    }

    const dateManage = (dateArg) => {
        let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

        let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

        let year = dateArg.getFullYear();
        let month = months[dateArg.getMonth()];
        let date = dateArg.getDate();
        let day = days[dateArg.getDay()];
        // console.log(year+" "+date+" "+day+" "+month);
        return `${date} ${month} (${day}) , ${year}`
    }


    const getTime = (todayDate) => {
        let hour = addZero(todayDate.getHours());
        let minute = addZero(todayDate.getMinutes());
        if(hour > 12){
            hour = hour - 12;
            minute = minute +" PM"
        }
        else{
            minute = minute+" AM"
        }
        return `${hour}:${minute}`;
    }
    const addZero = (i) => {
        if (i < 10) {
            i = "0" + i;
        }
        return i;
    }

    const getIconClass = (classarg) => {
        if (classarg === 'Rain') {
            return 'fas fa-cloud-showers-heavy';
        } else if (classarg === 'Clouds') {
            return 'fas fa-cloud';
        } else if (classarg === 'Clear') {
            return 'fas fa-cloud-sun';
        } else if (classarg === 'Snow') {
            return 'fas fa-snowman';
        } else if (classarg === 'Sunny') {
            return 'fas fa-sun';
        } else if (classarg === 'Mist') {
            return 'fas fa-smog';
        } else if (classarg === 'Thunderstorm' || classarg === 'Drizzle') {
            return 'fas fa-thunderstorm';
        } else {
            return 'fas fa-cloud-sun';
        }
    }
    





    return (
        <div className='main'>

        
        < div className='card'>

            <div className='header'>
                <h2>Weather</h2>
                <input className='input-box' type='text' placeholder='Enter City Name' value={input} onChange={handleChange}></input>
                <button type='button' onClick={btnClick}>Submit</button>
            </div>

            {
                weather.x == 'default' ? <div> Enter a city name </div> : weather.cod === 200 ?
                    <div className='details'>
                        <div className="location-deatils">
                            <div className="city" id="city">{weather.name}, {weather.sys.country}</div>
                            <div className="date" id="date"> {dateManage(todayDate)}</div>
                        </div>
                        <div className="weather-status">
                            <div className="temp" id="temp">{Math.round(weather.main.temp)}&deg;C </div>
                            <div className="weather" id="weather"> {weather.weather[0].main} <i className={getIconClass(weather.weather[0].main)}></i>  </div>
                            <div className="min-max" id="min-max">{Math.floor(weather.main.temp_min)}&deg;C (min) / {Math.ceil(weather.main.temp_max)}&deg;C (max) </div>
                          
                            <div id="updated_on">Updated as of {getTime(todayDate)}</div>
                        </div>
                
                        <div className="day-details">
                            <div className="basic">Feels like {weather.main.feels_like}&deg;C | Humidity {weather.main.humidity}%  <br></br> Pressure {weather.main.pressure} mb | Wind {weather.wind.speed} KMPH</div>
                        </div>


                    </div>

                    : <div className='error'> <br></br>{weather.message.toUpperCase()} <br></br> Some Error Occured <br></br> Enter Correct City Name</div>
            }
        </div>

</div>
    );
}
