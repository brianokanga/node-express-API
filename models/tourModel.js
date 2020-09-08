const mongoose = require('mongoose')

// Schema
const tourSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'A tour must have a name'], //validator
        unique: true
    },
    rating: {
        type: Number,
        default: 4.5
    },
    price: {
        type: Number,
        required: [true, 'A tour must have a price']
    }
});

// Tour model
const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;