import React, { useEffect } from 'react';
import { useStoreState, useStoreActions } from 'easy-peasy';
import '../styles/weeklyWeather.css';

const WeeklyWeather = ({ urlRoot }) => {
  const { selectedResort, weeklyWeatherData, openSnowLink, snowForecastLink, chetlerMode, currentWeatherData } = useStoreState(state => ({
    selectedResort: state.selectedResort,
    weeklyWeatherData: state.weeklyWeatherData,
    openSnowLink: state.openSnowLink,
    snowForecastLink: state.snowForecastLink,
    chetlerMode: state.stored.chetlerMode,
    currentWeatherData: state.currentWeatherData
  }));

  const { setOpenSnowLink, setSnowForecastLink } = useStoreActions(actions => ({
    setOpenSnowLink: actions.setOpenSnowLink,
    setSnowForecastLink: actions.setSnowForecastLink
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

  useEffect(() => {
    setOpenSnowLink(null);
    setSnowForecastLink(null);
    if (selectedResort?.properties?.name) {
      fetchSnowForcast(selectedResort.properties.name);
      fetchOpenSnow(selectedResort.properties.name);
    }
  }, [])

  const fetchSnowForcast = async () => {
    try {
      const name = selectedResort.properties.name;
      const res = await fetch(`${urlRoot}/scrapeSnowForecast?name=${name}`);
      if (!res.ok) {
          throw new Error('Error')
      }
      const url = await res.json();
      setSnowForecastLink(url);
    } catch(err) {
      console.log(err);
    }
  }

  const fetchOpenSnow = async () => {
    try {
      const name = selectedResort.properties.name;
      const res = await fetch(`${urlRoot}/scrapeOpenSnow?name=${name}`);
      if (!res.ok) {
          throw new Error('Error')
      }
      const url = await res.json();
      setOpenSnowLink(url);
    } catch(err) {
      console.log(err);
    }
  }

  return (
    <div className='weeklyWeatherContainer'>
      <div className={`${chetlerMode ? 'chetlerMode' : null}`}></div>
      <h2 className='weeklyWeatherResortName'>{selectedResort?.properties?.name ? selectedResort.properties.name : selectedResort[2]} Weekly Forecast</h2>
      <div className='weeklyWeather'>
      {
        weeklyWeatherData.map((w, index) => (
          <div key={w.day + index} className='weeklyWeatherRow'>
            <h3>{w.day}:</h3>
            <div className='weeklyWeatherImg'><img src={'https://darksky.net' + w.icon} alt='Weather Img'/></div>
            <h3>High: {w.maxTemp}</h3>
            <h3>Low: {w.minTemp}</h3>
          </div>
        ))
      }
      </div>
      {
      selectedResort?.properties?.name
      ?
      <>
        <a
          className='snowForecast'
          href={openSnowLink}
          target='_blank'
          rel='noopener noreferrer'>
          ❄️<span className='snowForecastText'>Snow Forecast</span>❄️
        </a>
        <a
          className='detailedSnowForecast'
          href={snowForecastLink}
          target='_blank'
          rel='noopener noreferrer'>
          ❄️<span className='detailedSnowForecastText'>Detailed Snow Forecast</span>❄️
        </a>
      </>
      : 
      <a
          className='detailedSnowForecast'
          href={currentWeatherData.darkSkyUrl}
          target='_blank'
          rel='noopener noreferrer'>
          🌩️<span className='snowForecastText'>Detailed Forecast</span>🌩️
        </a>
      }
    </div>
  )
}

export default WeeklyWeather;
