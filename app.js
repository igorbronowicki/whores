var ejs = require('ejs');
var db = require('./db');
var express = require('express');
var _ = require('underscore');
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
    var count = db.getAllWhores().length-1;
    var random = _.random(count);
    var related_whores = [];
    related_whores.push(db.getWhoreById(_.random(0, count)));
    related_whores.push(db.getWhoreById(_.random(0, count)));
    related_whores.push(db.getWhoreById(_.random(0, count)));
    
 console.log(db.getWhoreById(_.random(0, count)));
    if (!whore) res.redirect('/whores');
    res.render('whore.html', {
        "whore": whore,
        "related_whores": related_whores
    });
});
app.get('*', function(req, res){
    res.redirect('/whores');
});

// Config server port
app.listen(3000);
console.log('check 127.0.0.1:3000 out');
