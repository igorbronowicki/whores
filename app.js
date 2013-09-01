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
// Главная стр. сайта
app.get('/', function(req, res) {
    res.render('index', {
        title: "Hello world!"
    });
});

// Страница списка шлюх
app.get('/whores', function(req, res) {
    res.render('whores.html', {
        title: "All Whores",
        whores: db.getAllWhores()
    });
});

// Страница просмотра выбранной шлюхи
app.get('/whores/:id', function(req, res) {
    var id = +req.params.id;
    var whore = db.getWhoreById(id);
    var random_whores = db.getRandomWhores();
    if (!whore) res.redirect('/whores');
    res.render('whore.html', {
        "whore": whore,
        "random_whores": random_whores
    });
});

// Чтобы не писать 404.html мы делаем redirect
app.get('*', function(req, res){
    res.redirect('/whores');
});

// Config server port
app.listen(3000);
console.log('check 127.0.0.1:3000 out');