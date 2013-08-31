var ejs = require('ejs');
ejs.open = '[%';
ejs.close = '%]';
var express = require('express');
var app = express();

var db = require('./db');

// app configuration
app.engine('html', require('ejs').__express);
app.set('views', __dirname + '/templates');
app.set('view engine', 'html');
app.use('/static', express.static(__dirname + '/public'));


// Routes
app.get('/', function(req, res) {
    res.render('index', {
        title: "Hello world!"
    });
});
app.get('/whores', function(req, res) {
    res.render('whores', {
        title: "All Whores",
        whores: db.getAllWhores()
    });
});
app.get('/whores/:id', function(req, res) {
    var id = req.params.id;
    res.render('whore', {
        whore: db.getWhoreById(id)
    });
});

// Config server port
app.listen(3000);
console.log('check 127.0.0.1:3000 out');
