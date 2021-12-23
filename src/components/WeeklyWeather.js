import React, { useEffect } from 'react';
import { useStoreState, useStoreActions } from 'easy-peasy';
import '../styles/weeklyWeather.css';

const WeeklyWeather = ({ urlRoot }) => {
  const { selectedResort, weeklyWeatherData, currentSnowReportLink, chetlerMode } = useStoreState(state => ({
    selectedResort: state.selectedResort,
    weeklyWeatherData: state.weeklyWeatherData,
    currentSnowReportLink: state.currentSnowReportLink,
    chetlerMode: state.stored.chetlerMode
  }));

  const { setCurrentSnowReportLink } = useStoreActions(actions => ({
    setCurrentSnowReportLink: actions.setCurrentSnowReportLink
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
    setCurrentSnowReportLink(null);
    fetchSnowReport(selectedResort.properties.name);
  }, [])

  const fetchSnowReport = async (name) => {
    try {
      const res = await fetch(`${urlRoot}/scrapeSnowForecast?name=${name}`);
      if (!res.ok) {
          throw new Error('Error')
      }
      const url = await res.json();
      setCurrentSnowReportLink(url);
    } catch(err) {
      console.log(err);
    }
  }

  return (
    <div className='weeklyWeatherContainer'>
      <div className={`${chetlerMode ? 'chetlerMode' : null}`}></div>
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
      <a
        className='snowForecast'
        href={currentSnowReportLink}
        target='_blank'
        rel='noopener noreferrer'>
        ❄️<span className='snowForecastText'>Detailed Snow Forecast</span>❄️
      </a>
    </div>
  )
}

export default WeeklyWeather;
