"use strict";
const express = require("express");
const compression = require("compression");
// const cors = require('cors');

const _port = process.env.PORT || 8080;
const _app_folder = 'dist/sportimo';

const app = express();
// app.use(cors());
app.use(compression());

const _environment = process.env.ENVIRONMENT;

const replace = require('replace-in-file');


console.log("SERVER: Setting changes for Environment: " + _environment);

if (_environment === 'production') {    
	// Replace production.json API endpoints with development env ones if the _environment is not set to production
	
	const options = {
	  files: ['dist/sportimo/assets/config/production.json'],
	  to: ['"production": true','"ROOT":"https://clientserver-3.herokuapp-prod.com/client-api/v1"', '"SOCKET":"https://socketserver-3-prod.herokuapp.com/"'],
	  from: ['"production": falase','"ROOT":"https://clientserver-3.herokuapp.com/client-api/v1"', '"SOCKET":"https://socketserver-3.herokuapp.com/"'],
	  countMatches: true,
	};

	try {
		const results = replace.sync(options);
		console.log('Replacement results:', results);
	  }
	  catch (error) {
		console.error('Error occurred during production environment API settings replacement with development ones:', error);
	  }

	app.enable('trust proxy');
    app.use(function (req, res, next) {
        
        if (req.secure) {
            // https request, nothing to handle
            next();
        } else {
            // this is an http request, redirect to https
            res.redirect(301, 'https://' + req.headers.host + req.url);   
        }
    });
}
else {
	// Replace production.json API endpoints with development env ones if the _environment is not set to production
	
	const options = {
	  files: ['dist/sportimo/assets/config/production.json'],
	  to: ['"production": false','"ROOT":"https://clientserver-3.herokuapp.com/client-api/v1"', '"SOCKET":"https://socketserver-3.herokuapp.com/"'],
	  from: ['"production": true','"ROOT":"https://clientserver-3-prod.herokuapp.com/client-api/v1"', '"SOCKET":"https://socketserver-3-prod.herokuapp.com/"'],
	  countMatches: true,
	};

	try {
		const results = replace.sync(options);
		console.log('Replacement results:', results);
	  }
	  catch (error) {
		console.error('Error occurred during production environment API settings replacement with development ones:', error);
	  }
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