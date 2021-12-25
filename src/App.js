import React, { useEffect } from 'react';
import { useStoreState, useStoreActions } from 'easy-peasy';
import { FlyToInterpolator } from 'react-map-gl';
import MapComponent from './components/MapComponent';
import WeeklyWeather from './components/WeeklyWeather';
import skiResorts from "./skiResorts.json";
import './App.css';

const App = () => {
  const urlRoot = 'https://shielded-springs-47306.herokuapp.com';
  // const urlRoot = 'http://localhost:3001';

  const { weeklyWeatherData, showWeeklyWeather, selectedResort, toggleResortNames, toggleFavorites, darkMode, search, viewport, favorites, chetlerMode } = useStoreState(state => ({
    weeklyWeatherData: state.weeklyWeatherData,
    showWeeklyWeather: state.showWeeklyWeather,
    selectedResort: state.selectedResort,
    toggleResortNames: state.stored.toggleResortNames,
    toggleFavorites: state.stored.toggleFavorites,
    darkMode: state.stored.darkMode,
    search: state.search,
    viewport: state.viewport,
    favorites: state.stored.favorites,
    chetlerMode: state.stored.chetlerMode
  }));

  const { setWeeklyWeatherData, setShowWeeklyWeather, setToggleResortNames, setToggleFavorites, setDarkMode, setSearch, setViewport, setChetlerMode } = useStoreActions(actions => ({
    setWeeklyWeatherData: actions.setWeeklyWeatherData,
    setShowWeeklyWeather: actions.setShowWeeklyWeather,
    setToggleResortNames: actions.setToggleResortNames,
    setToggleFavorites: actions.setToggleFavorites,
    setDarkMode: actions.setDarkMode,
    setSearch: actions.setSearch,
    setViewport: actions.setViewport,
    setChetlerMode: actions.setChetlerMode
  }));

  const zoomToResort = (e) => {
    const searchBar = document.querySelector('.resortSearch');
    const searchBarContainer = document.querySelector('.searchContainer');
    let newLatitude = viewport.latitude;
    let newLongitude = viewport.longitude;
    let zoom = viewport.zoom;

    if ((e.keyCode === 13) && (search.length)) {
      e.preventDefault();

      if ((search === 'bentchetler') && (!chetlerMode)) {
        searchBar.value = '';
        setSearch('');
        setChetlerMode(true);

        searchBarContainer.classList.add('chetlerModeActivated');
        setTimeout(() => {
          searchBarContainer.classList.remove('chetlerModeActivated');
        }, 3000)
      } else if ((search === 'nobentchetler') && (chetlerMode)) {
        searchBar.value = '';
        setSearch('');
        setChetlerMode(false);

        searchBarContainer.classList.add('chetlerModeDisabled');
        setTimeout(() => {
          searchBarContainer.classList.remove('chetlerModeDisabled');
        }, 3000)
      } else {
        for (let resort of skiResorts) {
          if (!toggleFavorites) {
            if (resort.properties.name.toLowerCase().includes(search.toLowerCase())) {
              newLatitude = resort.geometry.coordinates[1];
              newLongitude = resort.geometry.coordinates[0];
              zoom = 11;
              break;
            }
          } else if (favorites.includes(resort.properties.name)) {
            if (resort.properties.name.toLowerCase().includes(search.toLowerCase())) {
              newLatitude = resort.geometry.coordinates[1];
              newLongitude = resort.geometry.coordinates[0];
              zoom = 11;
              break;
            }
          }
        }
        searchBar.value = '';
        setSearch('');
        if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
          searchBar.blur();
          setTimeout(() => {
            setViewport({
              ...viewport,
              width: '100%',
              height: '100%',
              latitude: newLatitude,
              longitude: newLongitude,
              zoom: zoom,
              transitionDuration: 1000,
              transitionInterpolator: new FlyToInterpolator()
            })
          }, 500)
        } else {
          setViewport({
            ...viewport,
            latitude: newLatitude,
            longitude: newLongitude,
            zoom: zoom,
            transitionDuration: 1000,
            transitionInterpolator: new FlyToInterpolator()
          })
        }
      }
    } else if ((e.keyCode === 13) && (!search.length)) {
      if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        searchBar.blur();
        setViewport({
          ...viewport,
          latitude: 38.9,
          longitude: -106.7,
          zoom: 6,
          transitionDuration: 1000,
          transitionInterpolator: new FlyToInterpolator()
        })
      } else {
        setViewport({
          ...viewport,
          latitude: 40.3,
          longitude: -99.2,
          zoom: 4,
          transitionDuration: 1000,
          transitionInterpolator: new FlyToInterpolator()
        })
      }
    } else if (e.ctrlKey && e.altKey) {
      setViewport({
        ...viewport,
        latitude: 39.1,
        longitude: -106.8,
        zoom: 7,
        transitionDuration: 1000,
        transitionInterpolator: new FlyToInterpolator()
      })
    }
  }

  useEffect(() => {
    document.addEventListener('keydown', zoomToResort);

    return () => {
      document.removeEventListener('keydown', zoomToResort);
    }
  }, [search])

  return (
    <div onClick={() => setShowWeeklyWeather(false)} className='container'>
      <div className='mapContainer'>
        <div className='settingsAndSearchContainer'>
          <div className={`settingsContainer ${showWeeklyWeather ? 'blurMap' : null}`}>
            <button
              onClick={() => setToggleResortNames()}
              className={`settingsBtn ${darkMode ? 'settingsBtnDark' : ''}`}>
              {toggleResortNames ? 'Hide Labels' : 'Show Labels'}
            </button>
            <button
              onClick={() => setToggleFavorites()}
              className={`settingsBtn ${darkMode ? 'settingsBtnDark' : ''}`}>
              {toggleFavorites ? 'Show All Resorts' : 'Show Favorites'}
            </button>
            <button
              onClick={() => setDarkMode()}
              className={`settingsBtn ${darkMode ? 'settingsBtnDark' : ''}`}>
              {!darkMode ? 'Dark Mode' : 'Light Mode'}
            </button>
          </div>
          <div className='searchContainer'>
            <input
              onChange={(e) => setSearch(e.target.value)}
              className={`resortSearch ${darkMode ? 'resortSearchDark' : ''} ${showWeeklyWeather ? 'blurMap' : null}`}
              type='text'
              placeholder='Filter Resorts'
            />
          </div>
        </div>
        <div className={`map ${showWeeklyWeather ? 'blurMap' : null}`}>
          <MapComponent urlRoot={urlRoot} setWeeklyWeatherData={setWeeklyWeatherData} weeklyWeatherData={weeklyWeatherData}/>
        </div>
        {
        showWeeklyWeather && selectedResort !== null
        ?
          <WeeklyWeather urlRoot={urlRoot} />
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
