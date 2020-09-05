const express = require ('express');

const app = express ();

// routes
app.get ('/', (req, res) => {
  res
    .status (200)
    .json ({mesage: 'Hello from the server.', app: 'express api'});
});
app.post ('/', (req, res) => {
  res.send ('You can post to this endpoint.');
});

// start server
const port = 3000;
app.listen (port, () => {
  console.log (`App running on port ${port}...`);
});
