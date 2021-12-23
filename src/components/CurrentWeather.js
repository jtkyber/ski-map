import { useStoreState } from 'easy-peasy';
import '../styles/currentWeather.css';

const CurrentWeather = () => {
  const { currentWeatherData } = useStoreState(state => ({
    currentWeatherData: state.currentWeatherData
  }));

  return (
      currentWeatherData !== null
      ?
      <div className='currentWeatherContainer'>
        <div className='currentSummaryRow'>
          <img className='currentImg' src={'https://darksky.net' + currentWeatherData.icon} alt='Weather Img'/>
          <h3>{currentWeatherData.summary.slice(0, -1)}</h3>
        </div>
        <div className='highLowRow'>
          <h5>Feels like: {currentWeatherData.feelsLike}</h5>
          <h5>Low: {currentWeatherData.minTemp}</h5>
          <h5>High: {currentWeatherData.maxTemp}</h5>
        </div>
        <h3 className='restOfDay'>{currentWeatherData.restOfDay.slice(0, -1)}</h3>
      </div>
      :
      <div className='currentWeatherContainerLoading'>
        <div className='currentSummaryRow'>
          <div className='loadingCurWeatherImg'></div>
          <div className='loadingCurWeatherSummary'></div>
        </div>
        <div className='highLowRow'>
          <div className='loadingCurWeatherFeelsLike'></div>
          <div className='loadingCurWeatherLow'></div>
          <div className='loadingCurWeatherHigh'></div>
        </div>
        <div className='restOfDay'>
          <div className='loadingCurWeatherRestOfDay'></div>
          <div className='loadingCurWeatherRestOfDay2'></div>
        </div>
      </div>
  )
}

export default CurrentWeather;
