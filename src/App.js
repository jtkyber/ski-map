import React, { useEffect } from 'react';
import { useStoreState, useStoreActions } from 'easy-peasy';
import MapComponent from './components/MapComponent';
import WeeklyWeather from './components/WeeklyWeather';
import './App.css';

const App = () => {
  const { weeklyWeatherData, showWeeklyWeather, selectedResort, toggleResortNames, toggleFavorites } = useStoreState(state => ({
    weeklyWeatherData: state.weeklyWeatherData,
    showWeeklyWeather: state.showWeeklyWeather,
    selectedResort: state.selectedResort,
    toggleResortNames: state.stored.toggleResortNames,
    toggleFavorites: state.stored.toggleFavorites
  }));

  const { setWeeklyWeatherData, setShowWeeklyWeather, setToggleResortNames, setToggleFavorites } = useStoreActions(actions => ({
    setWeeklyWeatherData: actions.setWeeklyWeatherData,
    setShowWeeklyWeather: actions.setShowWeeklyWeather,
    setToggleResortNames: actions.setToggleResortNames,
    setToggleFavorites: actions.setToggleFavorites
  }));

  useEffect(() => {

  }, [toggleFavorites])

  return (
    <div onClick={() => setShowWeeklyWeather(false)} className='container'>
      <div className='settingsContainer'>
        <button
          onClick={() => setToggleResortNames()}
          className='settingsBtn'>
          {toggleResortNames ? 'Hide Labels' : 'Show Labels'}
        </button>
        <button
          onClick={() => setToggleFavorites()}
          className='settingsBtn'>
          {toggleFavorites ? 'Show All Resorts' : 'Show Favorites'}
        </button>
      </div>
      <div className='mapContainer'>
        <div className={`map ${showWeeklyWeather ? 'blurMap' : null}`}>
          <MapComponent setWeeklyWeatherData={setWeeklyWeatherData} weeklyWeatherData={weeklyWeatherData}/>
        </div>
        {
        showWeeklyWeather && selectedResort !== null
        ?
          <WeeklyWeather />
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
