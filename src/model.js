import { action, persist } from 'easy-peasy';

const viewPortSettings = () => {
     if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        return {
            latitude: 38.9,
            longitude: -106.7,
            width: '100%',
            height: '100%',
            zoom: 6
        }
     } else return {
            latitude: 40.3,
            longitude: -99.2,
            width: '100%',
            height: '100%',
            zoom: 4
        }
}

const model  = {
    //State:

    stored: persist(
        {
            toggleResortNames: false,
            favorites: [],
            toggleFavorites: false,
            darkMode: false,
            chetlerMode: false
        },
        {
            storage: 'localStorage',
        }

    ),

    weeklyWeatherData: null,
    selectedResort: null,
    currentWebcamLink: '',
    resortHoverName: '',
    currentWeatherData: null,
    showWeeklyWeather: false,
    currentIsFavorite: false,
    search: '',
    openSnowLink: null,
    snowForecastLink: null,
    intervalID: null,
    viewport: viewPortSettings(),

    //Actions:

    setWeeklyWeatherData: action((state, input) => {
        state.weeklyWeatherData = input;
    }),

    setSelectedResort: action((state, input) => {
        state.selectedResort = input;
    }),

    setCurrentWebcamLink: action((state, input) => {
        state.currentWebcamLink = input;
    }),

    setResortHoverName: action((state, input) => {
        state.resortHoverName = input;
    }),

    setCurrentWeatherData: action((state, input) => {
        state.currentWeatherData = input;
    }),

    setViewport: action((state, input) => {
        state.viewport = input;
    }),

    setShowWeeklyWeather: action((state, input) => {
        state.showWeeklyWeather = input;
    }),

    setToggleResortNames: action((state) => {
        state.stored.toggleResortNames = !state.stored.toggleResortNames;
    }),

    addToFavorites: action((state, input) => {
        state.stored.favorites.push(input);
    }),

    removeFromFavorites: action((state, input) => {
        const index = state.stored.favorites.indexOf(input);
        state.stored.favorites.splice(index, 1);
    }),

    setToggleFavorites: action((state) => {
        state.stored.toggleFavorites = !state.stored.toggleFavorites;
    }),

    setDarkMode: action((state) => {
        state.stored.darkMode = !state.stored.darkMode;
    }),

    setSearch: action((state, input) => {
        state.search = input;
    }),

    setOpenSnowLink: action((state, input) => {
        state.openSnowLink = input;
    }),

    setSnowForecastLink: action((state, input) => {
        state.snowForecastLink = input;
    }),

    setChetlerMode: action((state, input) => {
        state.stored.chetlerMode = input;
    }),

    setIntervalID: action((state, input) => {
        state.intervalID = input;
    }),

}

export default model;
