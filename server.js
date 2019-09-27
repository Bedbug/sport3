"use strict";
const express = require("express");
const compression = require("compression");

const _port = process.env.PORT || 8080;
const _app_folder = 'dist/sportimo';

const app = express();
app.use(compression());

const _environment = process.env.ENVIRONMENT;

console.log(_environment);

if (_environment === 'production') {    
    app.enable('trust proxy');
    app.use(function (req, res, next) {
        console.log(req.secure);
        if (req.secure) {
            // https request, nothing to handle
            next();
        } else {
            // this is an http request, redirect to https
            res.redirect(301, 'https://' + req.headers.host + req.url);   
        }
    });
}

// ---- SERVE STATIC FILES ---- //
app.get('*.*', express.static(_app_folder, {maxAge: '1y'}));

// ---- SERVE APLICATION PATHS ---- //
app.all('*', function (req, res) {
    res.status(200).sendFile(`/`, {root: _app_folder});
});



// ---- START UP THE NODE SERVER  ----
app.listen(_port, function () {
    console.log("Node Express server for " + app.name + " listening on http://localhost:" + _port);
});