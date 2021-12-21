import React, { useEffect } from 'react';
import { useStoreState } from 'easy-peasy';
import '../styles/weeklyWeather.css';

const WeeklyWeather = () => {
  const { selectedResort, weeklyWeatherData, currentWeatherData } = useStoreState(state => ({
    selectedResort: state.selectedResort,
    weeklyWeatherData: state.weeklyWeatherData,
    currentWeatherData: state.currentWeatherData
  }));

  useEffect(() => {
    const map = document.querySelector('.mapContainer');
    const wWeather = document.querySelector('.weeklyWeatherContainer');

    const scale = Math.min(
      map.offsetWidth / wWeather.offsetWidth,
      map.offsetHeight / wWeather.offsetHeight,
    )

    if (map.offsetWidth < 560) {
      wWeather.style.setProperty("--weekly-weather-scale", `${scale * 0.9}`)
    }
    if (map.offsetHeight < 560) {
      wWeather.style.setProperty("--weekly-weather-scale", `${scale * 0.8}`)
    }
  }, [])

  return (
    <div className='weeklyWeatherContainer'>
      <h2 className='weeklyWeatherResortName'>{selectedResort.properties.name} Weekly Forecast</h2>
      <div className='weeklyWeather'>
      {
        weeklyWeatherData.map((w, index) => (
          <div key={w.day + index} className='weeklyWeatherRow'>
            <h3>{w.day}:</h3>
            <div className='weeklyWeatherImg'><img src={'https://darksky.net' + w.icon} alt='Weather Img'/></div>
            <h3>Low: {w.minTemp}</h3>
            <h3>High: {w.maxTemp}</h3>
          </div>
        ))
      }
      </div>
      <a className='moreWeather' href={currentWeatherData.darkSkyUrl} target='_blank' rel='noopener noreferrer'>More Weather Info</a>
    </div>
  )
}

export default WeeklyWeather;
