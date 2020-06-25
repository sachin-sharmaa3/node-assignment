const fs = require('fs');
let url = require("url");
const http = require("http");

http.createServer(function (req, res) {
    let query = url.parse(req.url, true).query;
    if (req.url.includes("/public?month=")) {
        let month = query.month;
        readFile(res, 'public', month);
    } else if (req.url.includes("/flexible?month=")) {
        let month = query.month;
        readFile(res, 'flexible', month);
    }
    else {
        res.write('Invalid url');
        res.end();
    }
}).listen(2020);

function readFile(res, holidayType, month) {
    fs.readFile('files/HolidaysList.json', (err, data) => {
        if (err) {
            console.error(err);
            return;
        }
        res.write(JSON.stringify(JSON.parse(data)[holidayType][month]));
        res.end();
    })
}

//http://localhost:2020//public?month=march