/*******************************************************************************
* Author: Tyler Freitas
* Date: 11/8/2018
* Email: freitast@oregonstate.edu
*******************************************************************************/
var express = require('express');

var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});
var bodyParser = require('body-parser');

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.set('port', process.argv[2]);


// Route for get requests.
app.get('/', function(req, res){
    var queryNames = [];
    for(var name in req.query){
        queryNames.push({"name": name, "value":req.query[name]});
    }
    var context = {};
    context.data = queryNames;
    res.render('get-request', context);
});


// Route for post requests.
app.post('/', function(req, res){
    var queryNames = [];
    for(var name in req.body){
        queryNames.push({"name": name, "value": req.body[name]});
    }
    var context = {};
    context.data = queryNames;
    res.render('post-request', context);
});


app.use(function (req, res) {
    res.status(404);
    res.render('404');
});

app.use(function (err, req, res, next){
    console.error(err.stack);
    res.type('text/plain');
    res.status(500);
    res.render('500');
});

app.listen(app.get('port'), function(){
    console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl + C  to terminate.');
});
