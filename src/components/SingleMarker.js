import { useStoreState, useStoreActions } from 'easy-peasy';
import '../styles/markers.css';

const SingleMarker = ({ resort, urlRoot }) => {
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

  const handleResortClick = async (e, resort) => {
    e.preventDefault();
    setShowWeeklyWeather(false);
    setWeeklyWeatherData(null);
    setCurrentWeatherData(null);
    setSelectedResort(resort);
    await fetchCurrentWeatherData(resort.geometry.coordinates[1], resort.geometry.coordinates[0])
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
