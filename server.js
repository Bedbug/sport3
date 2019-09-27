//Install express server
var compression = require('compression');
const express = require('express');
const path = require('path');

const app = express();

app.use(compression());

// Serve only the static files form the dist directory
app.use(express.static(__dirname + '/dist/sportimo'));

app.get('/*', function(req,res) {
    if (req.secure) {
        res.sendFile(path.join(__dirname+'/dist/sportimo/index.html'));
    }else{
        res.redirect('https://' + req.headers.host + req.url);
    }
});



// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);