const p = require('puppeteer');
const express = require('express');
const cors = require('cors');
const app = express();
app.use(express.json());
app.use(cors());

const weatherScraper = require('./scrapers/weatherScraper');

app.get('/scrapeWeather', (req, res) => { weatherScraper.scrapeWeather(req, res, p) })

app.listen(4000, () => {
    console.log(`app is running on port 4000`);
})
