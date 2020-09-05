const fs = require('fs');

const express = require('express');
const e = require('express');

const app = express();

app.use(express.json()); //simple middleware

const tours = JSON.parse(
	fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);
// TOURS ROUTES HANDLERS
//get all tours route handler
const getAllTours = (req, res) => {
	res.status(200).json({
		status: 'success',
		results: tours.length,
		data: {
			tours,
		},
	});
};

// Get one tour route handler
const getTour = (req, res) => {
	console.log(req.params);
	const id = req.params.id * 1;
	const tour = tours.find(el => el.id === id);

	// if (id > tours.length) {
	if (!tour) {
		return res.status(404).json({
			status: 'fail',
			message: 'Invalid ID',
		});
	}

	res.status(200).json({
		status: 'success',
		data: {
			tour,
		},
	});
};

// Create New Tour route handler
const createTour = (req, res) => {
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
};

// Update a Tour route handler
const updateTour = (req, res) => {
	if (req.params.id * 1 > tours.length) {
		return res.status(404).json({
			status: 'fail',
			message: 'Invalid ID',
		});
	}

	res.status(200).json({
		status: 'success',
		data: {
			tour: '<Updated tour here!!>',
		},
	});
};

// Delete a Tour route handler
const deleteTour = (req, res) => {
	if (req.params.id * 1 > tours.length) {
		return res.status(404).json({
			status: 'fail',
			message: 'Invalid ID',
		});
	}

	res.status(204).json({
		status: 'success',
		data: {
			tour: null,
		},
	});
};

// Routes
// app.get('/api/v1/tours', getAllTours);
// app.post('/api/v1/tours', createTour);
// app.get('/api/v1/tours/:id', getTour);
// app.patch('/api/v1/tour/:id', updateTour);
// app.delete('/api/v1/tour/:id', deleteTour);

//1. '/api/v1/tours'
app.route('/api/v1/tours').get(getAllTours).post(createTour);

//2. '/api/v1/tours/:id'
app
	.route('/api/v1/tours/:id')
	.get(getTour)
	.patch(updateTour)
	.delete(deleteTour);

// start server
const port = 3000;
app.listen(port, () => {
	console.log(`App running on port ${port}...`);
});
