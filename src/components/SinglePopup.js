import React, { useEffect } from 'react';
import { useStoreState, useStoreActions } from 'easy-peasy';
import CurrentWeather from './CurrentWeather';
import '../styles/popup.css';

const SinglePopup = () => {
  const urlRoot = 'https://shielded-springs-47306.herokuapp.com';

  const { selectedResort, currentWebcamLink, currentWeatherData, favorites } = useStoreState(state => ({
    selectedResort: state.selectedResort,
    currentWebcamLink: state.currentWebcamLink,
    currentWeatherData: state.currentWeatherData,
    favorites: state.stored.favorites
  }));

  const { setShowWeeklyWeather, setWeeklyWeatherData, addToFavorites, removeFromFavorites } = useStoreActions(actions => ({
    setShowWeeklyWeather: actions.setShowWeeklyWeather,
    setWeeklyWeatherData: actions.setWeeklyWeatherData,
    addToFavorites: actions.addToFavorites,
    removeFromFavorites: actions.removeFromFavorites
  }));

  useEffect(() => {
    console.log(favorites)
  }, [favorites])

  const fetchWeeklyWeatherData = async (lat, lon) => {
    try {
      const res = await fetch(`${urlRoot}/scrapeWeeklyWeather?lat=${lat}&lon=${lon}`);
        if (!res.ok) {
            throw new Error('Error')
        }
        const weather = await res.json();
        setWeeklyWeatherData(weather);
        setShowWeeklyWeather(true);
    } catch(err) {
      console.log(err);
    }
  }

  return (
    <div className='popup'>
      <div className='favoritesBtnAndName'>
        <button
          onClick={() => {
            if (!favorites.includes(selectedResort.properties.name)) {
              addToFavorites(selectedResort.properties.name);
            } else {
              removeFromFavorites(selectedResort.properties.name);
            }
          }}
          className={`favoritesBtn ${!favorites.includes(selectedResort.properties.name) ? 'addToFavorites' : 'removeFromFavorites'}`}>
            <h3>{`${!favorites.includes(selectedResort.properties.name) ? '+' : '-'}`}</h3>
        </button>
        <h3 className='popupName'>{selectedResort.properties.name}</h3>
      </div>
      <CurrentWeather />
      <div className='weeklyForcastWebcamBtnContainer'>
        <button
          onClick={() => fetchWeeklyWeatherData(selectedResort.geometry.coordinates[1], selectedResort.geometry.coordinates[0])}
          className='weeklyWeatherBtn'>Weekly Forecast
        </button>
        <button className='webcamLink'>
          <a href={currentWebcamLink} target='_blank' rel='noopener noreferrer'>Webcams</a>
        </button>
      </div>
    </div>
  );
}

export default SinglePopup;
