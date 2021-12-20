import React, { useEffect } from 'react';
import SingleMarker from './SingleMarker';
import SinglePopup from './SinglePopup';
import { useStoreState, useStoreActions } from 'easy-peasy';
import ReactMapGL, { Marker, Popup } from 'react-map-gl';
import mapboxgl from 'mapbox-gl';
import skiResorts from "../skiResorts.json";
import 'mapbox-gl/dist/mapbox-gl.css';
// eslint-disable-next-line import/no-webpack-loader-syntax
mapboxgl.workerClass = require("worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker").default;


const MapComponent = () => {
  const { selectedResort, viewport, toggleResortNames, favorites, toggleFavorites } = useStoreState(state => ({
    selectedResort: state.selectedResort,
    viewport: state.viewport,
    toggleResortNames: state.stored.toggleResortNames,
    favorites: state.stored.favorites,
    toggleFavorites: state.stored.toggleFavorites
  }));

  const { setSelectedResort, setViewport } = useStoreActions(actions => ({
    setSelectedResort: actions.setSelectedResort,
    setViewport: actions.setViewport
  }));

  const accessToken = 'pk.eyJ1IjoianRreWJlciIsImEiOiJja3g4YnNsMWMzNGhjMm9wMnlnZGg2NnR4In0.6FPRdpBZ28zeMHHihPYzLg';
  // const urlRoot = 'http://localhost:3001';

  useEffect(() => {
    const markers = document.querySelectorAll('.showAllMarkerNames');
    for (let marker of markers) {
      marker.style.setProperty("--resort-name", `"${marker.id}"`);
    }
  }, [toggleResortNames])

  return (
      <ReactMapGL
        {...viewport}
        mapboxApiAccessToken={accessToken}
        mapStyle='mapbox://styles/jtkyber/ckxdnbiug3mua14nva7s2ehy7'
        onViewportChange={(viewport => {
          setViewport(viewport);
        })}
      >
      {
        !toggleFavorites
        ?
        skiResorts.map(resort => (
          <Marker key={resort.properties.name} latitude={resort.geometry.coordinates[1]} longitude={resort.geometry.coordinates[0]}>
            <SingleMarker resort={resort} />
          </Marker>
        ))
        :
        skiResorts.reduce((temp, resort) => {
          if (favorites.includes(resort.properties.name)) {
            temp.push(
              <Marker key={resort.properties.name} latitude={resort.geometry.coordinates[1]} longitude={resort.geometry.coordinates[0]}>
                <SingleMarker resort={resort} />
              </Marker>
            )
          }
          return temp;
        }, [])
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
          <SinglePopup />
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
