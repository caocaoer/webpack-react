var fs = require('fs');
var path = require('path');
var app = require('express')();
var mockFactory = require('./mockFactory');

const env = process.env;
const HOST = env.npm_package_server_mock_host;
const PORT = env.npm_package_server_mock_port;
const DATA_PATH = env.npm_package_server_mock_dataPath;
app.use(mockFactory({
    headers: {
        'Mock-Data': 'true',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
    },
    'urlPattern': '/',
    'dataPath': DATA_PATH ? DATA_PATH : '/data',
    'skipNotFound': false
}));

app.use(function(err, req, res, next) {
    console.log(req.url, 404);
    res.status(404);
    res.send(err.message);
});

var server = app.listen(PORT, function () {
    console.info('Mock server is listening at ' + PORT);
});