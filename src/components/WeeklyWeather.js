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

    if (map.offsetWidth < 768 || map.offsetHeight < 768) {
      wWeather.style.setProperty("--weekly-weather-scale", `${scale * 0.8}`)
    }
  }, [])

  return (
    <div className='weeklyWeatherContainer'>
      <h3 className='weeklyWeatherResortName'>{selectedResort.properties.name} Weekly Forecast</h3>
      <div className='weeklyWeather'>
      {
        weeklyWeatherData.map((w, index) => (
          <div key={w.day + index} className='weeklyWeatherRow'>
            <h4>{w.day}:</h4>
            <div className='weeklyWeatherImg'><img src={'https://darksky.net' + w.icon} alt='Weather Img'/></div>
            <h4>Low: {w.minTemp}</h4>
            <h4>High: {w.maxTemp}</h4>
          </div>
        ))
      }
      </div>
      <a className='moreWeather' href={currentWeatherData.darkSkyUrl} target='_blank' rel='noopener noreferrer'>More Weather Info</a>
    </div>
  )
}

export default WeeklyWeather;
