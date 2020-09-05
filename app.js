const fs = require('fs');

const express = require('express');

const app = express();

app.use(express.json()); //simple middleware

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

// get all tours route
app.post('/api/v1/tours', (req, res) => {
	const newId = tours[tours.length - 1].id + 1;
	const newTour = Object.assign({ id: newId }, req.body);

	tours.push(newTour);
	fs.writeFile(
		`${__dirname}/dev-data/data/tours-simple.json`,
		JSON.stringify(tours),
		err => {
			res.status(201).json({
				status: 'success',
				data: {
					tour: newTour,
				},
			});
		}
	);
});
// start server
const port = 3000;
app.listen(port, () => {
	console.log(`App running on port ${port}...`);
});
