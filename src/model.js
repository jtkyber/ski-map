import { action, persist } from 'easy-peasy';

const model  = {
    //State:

    stored: persist(
        {
            toggleResortNames: false,
            favorites: [],
            toggleFavorites: false
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
    viewport: {
        latitude: 40.3,
        longitude: -99.2,
        width: '100%',
        height: '100%',
        zoom: 4
    },

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
}

export default model;
