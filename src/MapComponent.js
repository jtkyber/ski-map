import React, { useState, useEffect } from 'react';
import ReactMapGL, { Marker, Popup } from 'react-map-gl';
import mapboxgl from 'mapbox-gl';
import skiResorts from "./skiResorts.json";
import 'mapbox-gl/dist/mapbox-gl.css';
import './mapComponent.css';
// eslint-disable-next-line import/no-webpack-loader-syntax
mapboxgl.workerClass = require("worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker").default;


const MapComponent = () => {
  const accessToken = 'pk.eyJ1IjoianRreWJlciIsImEiOiJja3g4YnNsMWMzNGhjMm9wMnlnZGg2NnR4In0.6FPRdpBZ28zeMHHihPYzLg';

  const [viewport, setViewport] = useState({
    latitude: 39.8,
    longitude: -99.2,
    width: '100%',
    height: '100%',
    zoom: 3
  })

  const [selectedResort, setSelectedResort] = useState(null);
  const [currentWebcamLink, setCurrentWebcamLink] = useState('');
  const [resortHoverName, setResortHoverName] = useState('');
  const [currentWeatherData, setCurrentWeatherData] = useState(null);

  useEffect(() => {

  }, [resortHoverName])

  const fetchWeatherData = async (lat, lon) => {
    try {
      const res = await fetch(`http://localhost:4000/scrapeWeather?lat=${lat}&lon=${lon}`);
        if (!res.ok) {
            throw new Error('Error')
        }
        const weather = await res.json();
        setCurrentWeatherData({...weather});
    } catch(err) {
      console.log(err);
    }
  }

  const handleResortClick = async (e, resort) => {
    e.preventDefault();
    setCurrentWeatherData(null);
    setSelectedResort(resort);
    fetchWeatherData(resort.geometry.coordinates[1], resort.geometry.coordinates[0])
  }

  const handleResortOnHover = (target) => {
    setResortHoverName(target.id);
    target.style.setProperty("--resort-name", `"${target.id}"`);
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
            <h4 className='popupName'>{selectedResort.properties.name}</h4>
            {
            currentWeatherData !== null
            ?
            <div className='currentWeatherContainer'>
              <div className='currentSummaryRow'>
                <img className='currentImg' src={'https://darksky.net' + currentWeatherData.current[0].icon} alt='Weather Img'/>
                <h3>{currentWeatherData.current[0].summary.slice(0, -1)}</h3>
              </div>
              <div className='highLowRow'>
                <h5>Feels like: {currentWeatherData.current[0].feelsLike}</h5>
                <h5>Low: {currentWeatherData.current[0].minTemp}</h5>
                <h5>High: {currentWeatherData.current[0].maxTemp}</h5>
              </div>
              <h3 className='restOfDay'>{currentWeatherData.current[0].restOfDay.slice(0, -1)}</h3>
            </div>
            :
            <div className='loadingWeather'>
              <h4>Loading Weather...</h4>
            </div>
            }
            <div className='webcamLink'>
              <a href={currentWebcamLink} target='_blank' rel='noopener noreferrer'>Webcams</a>
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
