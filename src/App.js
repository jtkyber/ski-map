import MapComponent from './MapComponent';
import './App.css';

const App = () => {
  return (
    <div className='container'>
      <div className='mapContainer'>
        <MapComponent />
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
