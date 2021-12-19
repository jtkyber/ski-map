import { useStoreState, useStoreActions } from 'easy-peasy';
import MapComponent from './MapComponent';
import './styles/App.css';
import './styles/weeklyWeather.css';

const App = () => {
  const { weeklyWeatherData, showWeeklyWeather, selectedResort, currentWeatherData } = useStoreState(state => ({
    weeklyWeatherData: state.weeklyWeatherData,
    showWeeklyWeather: state.showWeeklyWeather,
    selectedResort: state.selectedResort,
    currentWeatherData: state.currentWeatherData
  }));

  const { setWeeklyWeatherData, setShowWeeklyWeather } = useStoreActions(actions => ({
    setWeeklyWeatherData: actions.setWeeklyWeatherData,
    setShowWeeklyWeather: actions.setShowWeeklyWeather
  }));

  return (
    <div onClick={() => setShowWeeklyWeather(false)} className='container'>
      <div className='mapContainer'>
        <div className={`map ${showWeeklyWeather ? 'blurMap' : null}`}>
          <MapComponent setWeeklyWeatherData={setWeeklyWeatherData} weeklyWeatherData={weeklyWeatherData}/>
        </div>
        {
        showWeeklyWeather && selectedResort !== null
        ?
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
        :
        null
        }
      </div>
    </div>
  );
}

export default App;






















  // mapboxgl.accessToken = 'pk.eyJ1IjoianRreWJlciIsImEiOiJja3g3eDhpbHowMDNnMm5taDM2M2N4MHcwIn0.1Cpxt5mKy5bc-Bp8WP8B5w';

  // const newMap = () => {
  //   return new mapboxgl.Map({
  //     container: 'map',
  //     style: 'mapbox://styles/jtkyber/ckx80qtnd0dn214mnl97jqesc',
  //     center: [-99.2, 39.8],
  //     zoom: 4
  //   });
  // }

  // const map = new mapboxgl.Map({
  //   container: 'map',
  //   style: 'mapbox://styles/jtkyber/ckx80qtnd0dn214mnl97jqesc',
  //   center: [-99.2, 39.8],
  //   zoom: 4
  // });

  // const map = setTimeout(() => {
  //   newMap();
  // },100);

  //   map.on('click', (event) => {
  //     const features = map.queryRenderedFeatures(event.point, {
  //       layers: ['ski-resorts']
  //     });
  //     if (!features.length) {
  //       return;
  //     }
  //     const feature = features[0];

  //     const popup = new mapboxgl.Popup({ offset: [0, -15] });
  //     popup.setLngLat(feature.geometry.coordinates)
  //     .setHTML(
  //       `<h3>${feature.properties.title}</h3><p>${feature.properties.description}</p>`
  //     )
  //     .addTo(map);
  //   });
