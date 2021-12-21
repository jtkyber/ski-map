import { useStoreState, useStoreActions } from 'easy-peasy';
import '../styles/markers.css';

const SingleMarker = ({ resort }) => {
  const urlRoot = 'https://shielded-springs-47306.herokuapp.com';

  const { resortHoverName, toggleResortNames } = useStoreState(state => ({
    resortHoverName: state.resortHoverName,
    toggleResortNames: state.stored.toggleResortNames
  }));

  const { setSelectedResort, setCurrentWebcamLink, setResortHoverName, setCurrentWeatherData, setShowWeeklyWeather, setWeeklyWeatherData } = useStoreActions(actions => ({
    setSelectedResort: actions.setSelectedResort,
    setCurrentWebcamLink: actions.setCurrentWebcamLink,
    setResortHoverName: actions.setResortHoverName,
    setCurrentWeatherData: actions.setCurrentWeatherData,
    setShowWeeklyWeather: actions.setShowWeeklyWeather,
    setWeeklyWeatherData: actions.setWeeklyWeatherData
  }));

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

  const makePopupEvenWidthAndHeight = () => {
    const popup = document.querySelector('.mapboxgl-popup-content');
    const popupWidth = popup.offsetWidth;
    const popupHeight = popup.offsetHeight;

    // if ((popupWidth % 2) !== 0) {
    //   // popup.style.width = `${Math.ceil(popupWidth / 2) * 2}px !important`;
    //   popup.style.setProperty("width", `${Math.ceil(popupWidth / 2) * 2}px`, "important");
    // }

    // if ((popupHeight % 2) !== 0) {
    //   // popup.style.height = `${Math.ceil(popupHeight / 2) * 2}px !important`;
    //   popup.style.setProperty("height", `${Math.ceil(popupWidth / 2) * 2}px`, "important");
    // }
    console.log('width: ' + popup.style.width, 'height: ' + popup.style.height);
  }

  const handleResortClick = async (e, resort) => {
    e.preventDefault();
    setShowWeeklyWeather(false);
    setWeeklyWeatherData(null);
    setCurrentWeatherData(null);
    setSelectedResort(resort);
    await fetchCurrentWeatherData(resort.geometry.coordinates[1], resort.geometry.coordinates[0])
    // makePopupEvenWidthAndHeight();
  }

  const handleResortNamesHoverOrBtn = (target) => {
    setResortHoverName(target.parentNode.id);
    target.parentNode.style.setProperty("--resort-name", `"${target.parentNode.id}"`);
  }

  return (
    <button
      onClick={(e) => {
        handleResortClick(e, resort);
        setCurrentWebcamLink(resort.properties.webcams);
      }}
      className={`
        markerBtn
        ${(resortHoverName === resort.properties.name) && !toggleResortNames ? 'showMarkerName' : ''}
        ${toggleResortNames ? 'showAllMarkerNames' : ''}
      `}
      id={resort.properties.name}
    >
      <img
        src={require('../skis2.png')}
        alt={resort.properties.name}
        onMouseEnter={(e) => handleResortNamesHoverOrBtn(e.target)}
      />
    </button>
  )
}

export default SingleMarker;
