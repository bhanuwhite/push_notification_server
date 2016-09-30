'use strict';
var bodyparser = require('body-parser'),
        morgan = require('morgan'),
        express = require('express'),
        port = process.env.PORT || 8080,
        app = express();

app.use(bodyparser.urlencoded({limit: '400mb'}));
app.use(bodyparser.json({limit: '400mb'}));
app.use(morgan('dev'));

app.use('/', express.static(__dirname + '/'));
app.use('/sub_domains/', express.static(__dirname + '/sub_domains'));
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

//requiring the routes
require('./app/routes/server.routes.js')(app);

app.listen(port, function () {
    console.log('Listeninggg on', port);
});

module.exports = app;
