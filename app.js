const fs = require('fs');

const express = require('express');

const app = express();

// // routes
// app.get ('/', (req, res) => {
//   res
//     .status (200)
//     .json ({mesage: 'Hello from the server.', app: 'express api'});
// });
// app.post ('/', (req, res) => {
//   res.send ('You can post to this endpoint.');
// });

const tours = JSON.parse(
	fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);
// TOURS ROUTES
//get all tours route
app.get('/api/v1/tours', (req, res) => {
	res.status(200).json({
		status: 'success',
		results: tours.length,
		data: {
			tours,
		},
	});
});

// start server
const port = 3000;
app.listen(port, () => {
	console.log(`App running on port ${port}...`);
});
