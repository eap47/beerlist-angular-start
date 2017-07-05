var express = require('express');
var mongoose = require('mongoose')
var bodyParser = require('body-parser')


mongoose.connect('mongodb://localhost/beers', function() {
    console.log("DB connection established!!")
});
var Beer = require("./beerModel");
var app = express();

app.use(express.static('public'));
app.use(express.static('node_modules'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.get('/beers', function(req, res, next) {
    Beer.find(function(error, beers) {
        if (error) {
            return next(error);
        } else {
            return res.send(beers);
        }
    });
});

app.post('/beers', function(req, res, next) {
    var newBeer = new Beer(req.body)
    newBeer.save(function(err, data) {
        if (err) {
            return next(error);
        } else {
            return res.send(data)
        }
    });
});

app.post('/beers/:id/ratings', function(req, res, next) {
    //code a suitable update object 
    //using req.body to retrieve the new rating
    var updateObject = { $push: { ratings: req.body.rating } };
    Beer.findByIdAndUpdate(req.param.id, updateObject, { new: true }, function(err, beer) {
        if (err) {
            return next(err);
        } else {
            res.send(beer);
        }
    });
});

app.delete('/beers/:id', function(req, res, next) {
    Beer.findByIdAndRemove(req.params.id, function(err, beer) {
        if (err) {
            return next(err);
        } else {
            res.send(beer);
        }
    });
});

// error handler to catch 404 and forward to main error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// main error handler
// warning - not for use in production code!
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.send({
        message: err.message,
        error: err
    });
});


app.listen(8000, function() {
    console.log("yo yo yo, on 8000!!")
});