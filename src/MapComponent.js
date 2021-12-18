import React, { useEffect } from 'react';
import { useStoreState, useStoreActions } from 'easy-peasy';
import ReactMapGL, { Marker, Popup } from 'react-map-gl';
import mapboxgl from 'mapbox-gl';
import skiResorts from "./skiResorts.json";
import 'mapbox-gl/dist/mapbox-gl.css';
import './styles/mapComponent.css';
import './styles/currentWeather.css';
import './styles/weeklyWeather.css';
// eslint-disable-next-line import/no-webpack-loader-syntax
mapboxgl.workerClass = require("worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker").default;


const MapComponent = ({ setWeeklyWeatherData, weeklyWeatherData }) => {

  const { selectedResort, currentWebcamLink, resortHoverName, currentWeatherData, viewport } = useStoreState(state => ({
    selectedResort: state.selectedResort,
    currentWebcamLink: state.currentWebcamLink,
    resortHoverName: state.resortHoverName,
    currentWeatherData: state.currentWeatherData,
    viewport: state.viewport
  }));

  const { setSelectedResort, setCurrentWebcamLink, setResortHoverName, setCurrentWeatherData, setViewport, setShowWeeklyWeather } = useStoreActions(actions => ({
    setSelectedResort: actions.setSelectedResort,
    setCurrentWebcamLink: actions.setCurrentWebcamLink,
    setResortHoverName: actions.setResortHoverName,
    setCurrentWeatherData: actions.setCurrentWeatherData,
    setViewport: actions.setViewport,
    setShowWeeklyWeather: actions.setShowWeeklyWeather
  }));

  const accessToken = 'pk.eyJ1IjoianRreWJlciIsImEiOiJja3g4YnNsMWMzNGhjMm9wMnlnZGg2NnR4In0.6FPRdpBZ28zeMHHihPYzLg';
  // const urlRoot = 'https://shielded-springs-47306.herokuapp.com';
  const urlRoot = 'http://localhost:3001';

  useEffect(() => {
    console.log(weeklyWeatherData)
  }, [weeklyWeatherData])

  const fetchCurrentWeatherData = async (lat, lon) => {
    try {
      const res = await fetch(`${urlRoot}/scrapeCurrentWeather?lat=${lat}&lon=${lon}`);
        if (!res.ok) {
            throw new Error('Error')
        }
        const weather = await res.json();
        setCurrentWeatherData({...weather});
    } catch(err) {
      console.log(err);
    }
  }

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

  const handleResortClick = async (e, resort) => {
    e.preventDefault();
    setShowWeeklyWeather(false);
    setWeeklyWeatherData(null);
    setCurrentWeatherData(null);
    setSelectedResort(resort);
    await fetchCurrentWeatherData(resort.geometry.coordinates[1], resort.geometry.coordinates[0])
    await makePopupEvenWidthAndHeight();
  }

  const handleResortOnHover = (target) => {
    setResortHoverName(target.id);
    target.style.setProperty("--resort-name", `"${target.id}"`);
  }

  const makePopupEvenWidthAndHeight = () => {
    const popup = document.querySelector('.popup');
    const popupWidth = popup.offsetWidth;
    const popupHeight = popup.offsetHeight;

    if ((popupWidth % 10) !== 0) {
      popup.style.width = `${Math.ceil(popupWidth / 10) * 10}px`
    }

    if ((popupHeight % 10) !== 0) {
      popup.style.height = `${Math.ceil(popupHeight / 10) * 10}px`
    }
  }

  return (
      <ReactMapGL
        {...viewport}
        mapboxApiAccessToken={accessToken}
        mapStyle='mapbox://styles/jtkyber/ckx8ff5ll089g14nvynn2vgk4'
        onViewportChange={(viewport => {
          setViewport(viewport);
        })}
      >
      {
        skiResorts.map(resort => (
          <Marker key={resort.properties.name} latitude={resort.geometry.coordinates[1]} longitude={resort.geometry.coordinates[0]}>
            <button
              onMouseEnter={(e) => handleResortOnHover(e.target)}
              onClick={(e) => {
                handleResortClick(e, resort);
                setCurrentWebcamLink(resort.properties.webcams);
              }}
              className={`markerBtn ${resortHoverName === resort.properties.name ? 'showMarkerName' : ''}`}
              id={resort.properties.name}
            >
              <img
                src={require('./mountain.png')}
                alt={resort.properties.name}
              />
            </button>
          </Marker>
        ))
      }
      {
        selectedResort
        ?
        <Popup
          latitude={selectedResort.geometry.coordinates[1]}
          longitude={selectedResort.geometry.coordinates[0]}
          onClose={() => {
            setSelectedResort(null);
          }}
        >
          <div className='popup'>
            <h3 className='popupName'>{selectedResort.properties.name}</h3>
            {
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
            <div className='loadingWeather'>
              <h4>Loading Weather...</h4>
            </div>
            }
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
        </Popup>
        :
        null
      }
      </ReactMapGL>
  );
}

export default MapComponent;































// const setWebcams = (data) => {
  //   const webcams = [];
  //   for (let cam of data.result.webcams) {
  //     webcams.push({
  //       id: cam.id,
  //       status: cam.status,
  //       title: cam.title
  //     })
  //   }
  //   return webcams;
  // }

  // const fetchWebcamFeed = async () => {
  //   try {
  //     const res = await fetch(`https://api.windy.com/api/webcams/v2/list/webcam=1361879037`, {
  //       "method": "GET",
  //       "headers": {
  //         "x-windy-key": "QOoByZsmI7Lro2O7SoAqYPJjvJtBsmiY"
  //       }
  //     })
  //     if (!res.ok) {
  //       throw new Error('Error')
  //     }
  //     const data = await res.json();
  //     console.log(data);
  //   } catch(err) {
  //     console.log(err)
  //   }
  // }

  // const fetchWebcamData = async (lat, lon) => {
  //   try {
  //     const res = await fetch(`https://api.windy.com/api/webcams/v2/list/nearby=${lat},${lon},${10}/orderby=popularity,desc`, {
  //       "method": "GET",
  //       "headers": {
  //         "x-windy-key": "QOoByZsmI7Lro2O7SoAqYPJjvJtBsmiY"
  //       }
  //     })
  //     if (!res.ok) {
  //       throw new Error('Error')
  //     }
  //     const data = await res.json();
  //     const webcams = await setWebcams(data);
  //     setCurrentWebcams([...webcams]);
  //   } catch(err) {
  //     console.log(err)
  //   }
  // }
