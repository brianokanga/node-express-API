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



// 1. START THE SERVER
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});