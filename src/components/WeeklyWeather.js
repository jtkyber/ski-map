import { useStoreState } from 'easy-peasy';
import '../styles/weeklyWeather.css';

const WeeklyWeather = () => {
  const { selectedResort, weeklyWeatherData, currentWeatherData } = useStoreState(state => ({
    selectedResort: state.selectedResort,
    weeklyWeatherData: state.weeklyWeatherData,
    currentWeatherData: state.currentWeatherData
  }));

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
