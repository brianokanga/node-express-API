const mongoose = require ('mongoose');
const dotnev = require ('dotenv');
const app = require ('./app');
dotnev.config ({path: './config.env'});

// DATABASE CONNECTIONS

// Local database
// const DB = process.env.DATABASE_LOCAL;
// mongoose
//   .connect (DB, {
//     useNewUrlParser: true,
//     useCreateIndex: true,
//     useFindAndModify: false,
//   })
//   .then (con => {
//     console.log (con.connections);
//     console.log ('DB connection successful');
//   });

// Remote database connection
const DB = process.env.DATABASE.replace (
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);
mongoose
  .connect (DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then (() => console.log ('DB connection successful'));

// Schema
const tourSchema = new mongoose.Schema ({
  name: {
    type: String,
    required: [true, 'A tour must have a name'], //validator
    unique: true,
  },
  rating: {
    type: Number,
    default: 4.5,
  },
  price: {
    type: Number,
    required: [true, 'A tour must have a price'],
  },
});

// Tour model
const Tour = mongoose.model ('Tour', tourSchema);

// 1. START THE SERVER
const port = process.env.PORT || 3000;
app.listen (port, () => {
  console.log (`App running on port ${port}...`);
});
