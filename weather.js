const http = require("http");
let url = require("url");

let weatherApi = 'http://api.openweathermap.org/data/2.5/weather?q=';
const appId = "&appid=2b421cd305b88e39d4182ac89b85e186";

http.createServer(function (req, res) {
    if (req.url.includes("/?city=")) {
        let query = url.parse(req.url, true).query;
        let city = query.city;
        getWeather(city, res);
    } else {
        res.write('Invalid url');
        res.end();
    }
}).listen(2020);

function getWeather(city, res) {
    let data = '';
    return http.get(weatherApi + city + appId, (resp) => {
        resp.on('data', (chunk) => {
            data += chunk;
        });
        resp.on('end', () => {
            console.log(JSON.parse(data).weather[0]);
            res.write(JSON.stringify(JSON.parse(data).weather[0]));
            res.end();
        });
    }).on("error", (err) => {
        console.log("Error: " + err.message);
    });
}

//http://localhost:2020/?city=delhi