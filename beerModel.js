var mongoose = require('mongoose');

var beerSchema = new mongoose.Schema({
    name: String,
    style: String,
    image_url: String,
    abv: Number,
    ratings: [Number],

});

var Beer = mongoose.model('beer', beerSchema)

module.exports = Beer