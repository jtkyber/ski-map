import { action } from 'easy-peasy';

const model  = {
    //State:

    weeklyWeatherData: null,
    selectedResort: null,
    currentWebcamLink: '',
    resortHoverName: '',
    currentWeatherData: null,
    showWeeklyWeather: false,
    viewport: {
        latitude: 39.8,
        longitude: -99.2,
        width: '100%',
        height: '100%',
        zoom: 3.5
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
    })
}

export default model;
