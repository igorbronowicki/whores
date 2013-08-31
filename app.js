var ejs = require('ejs');
var db = require('./db');
var express = require('express');
ejs.open = '[%';
ejs.close = '%]';
var app = express();

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
    var whore = db.getWhoreById(id);
    if (!whore) res.redirect('/whores');
    res.render('whore', {
        whore: whore
    });
});
app.get('*', function(req, res){
    res.redirect('/whores');
});

// Config server port
app.listen(3000);
console.log('check 127.0.0.1:3000 out');
