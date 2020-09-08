const mongoose = require('mongoose');
const dotnev = require('dotenv');
const app = require('./app');

dotnev.config({
  path: './config.env'
});

// DATABASE CONNECTIONS

// Local database
// const DB = process.env.DATABASE_LOCAL;
// mongoose
//   .connect (DB, {
//     useNewUrlParser: true,
//     useCreateIndex: true,
//     useFindAen (con => {
//     console.log (con.connections);
//     console.log ('DB connection successful');
//   });

// Remote database connection
const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
  .then(() => console.log('DB connection successful'))
  .catch(err => {
    console.log('ERROR', err);
  });

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

// Documents (instance of the tour model)
const testTour = new Tour({
  name: 'The Forest Hiker',
  rating: 4.7,
  price: 497
});

// save the document to the database
// save returns a promise
testTour
  .save()
  .then(doc => {
    console.log(doc);
  })
  .catch(err => {
    console.log('ERROR', err);
  });

// 1. START THE SERVER
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});