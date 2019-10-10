//Install express server
var compression = require('compression');
const express = require('express');
const path = require('path');

const app = express();

app.use(compression());

// Serve only the static files form the dist directory
app.use(express.static(__dirname + '/dist/sportimo'));

// app.get('/*', function(req,res) {
//     // if (req.secure) {
//     //     res.sendFile(path.join(__dirname+'/dist/sportimo/index.html'));
//     // }else{
//         console.log(path.join(__dirname+'/dist/sportimo/index.html'));
//         res.sendFile(path.join(__dirname+'/dist/sportimo/index.html'));
//         // res.redirect('https://' + req.headers.host + req.url);
//     // }
// });

app.all('*', function(req, res, next){
    console.log('req start: ',req.secure, req.hostname, req.url, process.env.PORT || 8080);
    if (req.secure || req.hostname == "localhost") {
        return next();
    }

    res.redirect('https://'+req.hostname + ':' + process.env.PORT || 8080 + req.url);
});


// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);