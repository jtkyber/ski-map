const scrapeWeather = async (req, res, p) => {
    try {
        const lat = req.query.lat;
        const lon = req.query.lon;
        const url = `https://darksky.net/forecast/${lat},${lon}/us12/en`
        const browser = await p.launch();
        const page = await browser.newPage();
        await page.goto(url);

        let weatherData = {};

        await page.waitForSelector('.forecast', {
            visible: true
        })

        const currentWeather = await page.evaluate(() => {
            const temp = [];
            const icon = document.querySelector('#title > .currently img').getAttribute('src');

            const summary = document.querySelector('#title > .currently .desc .summary').innerText;

            const feelsLike = document.querySelector('#title > .currently .desc .summary-high-low .feels-like-text').innerText;

            const minTemp = document.querySelector('#title > .currently .desc .summary-high-low .low-temp-text').innerText;

            const maxTemp = document.querySelector('#title > .currently .desc .summary-high-low .high-temp-text').innerText;

            const restOfDay = document.querySelector('#title .currently__summary').innerText;

            temp.push( {
                icon: icon,
                summary: summary,
                feelsLike: feelsLike,
                minTemp: minTemp,
                maxTemp: maxTemp,
                restOfDay: restOfDay
            })

            return temp;
        });

        const weeklyWeather = await page.evaluate(() => {
            const temp = [];

            const icons = document.querySelectorAll('#week .skycon img');
            const iconArr = Array.from(icons).slice(1).map((i) => {
                const icon = i.getAttribute('src');
                return icon;
            });

            const days = document.querySelectorAll('#week > .day > .date__icon__details > .name');
            const dayArr = Array.from(days).slice(1).map(day => {
                return day.innerText;
            });

            const minTemps = document.querySelectorAll('#week > .day > .tempRange > .minTemp');
            const minTempArr = Array.from(minTemps).slice(1).map(temp => {
                return temp.innerText;
            });

            const maxTemps = document.querySelectorAll('#week > .day > .tempRange > .maxTemp');
            const maxTempArr = Array.from(maxTemps).slice(1).map(temp => {
                return temp.innerText;
            });

            for (let i = 0; i < iconArr.length; i++) {
                temp.push( {
                    icon: iconArr[i],
                    day: dayArr[i],
                    minTemp: minTempArr[i],
                    maxTemp: maxTempArr[i]
                })
            }

            return temp;
        });

        weatherData = ({
            current: currentWeather,
            week: weeklyWeather
        })

        res.json(weatherData);

        browser.close();
    } catch(err) {
        console.log(err);
    }
}

module.exports = {
    scrapeWeather
}
