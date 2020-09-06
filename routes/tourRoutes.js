const express = require('express');
const fs = require('fs');

//  Reading data from the file
const tours = JSON.parse(
	fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);

// i) Routes handlers
// get all tours route handler
const getAllTours = (req, res) => {
	console.log(req.requestTime);
	res.status(200).json({
		status: 'success',
		requestAt: req.requestTime,
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

// i)TOURS routes definitions
const router = express.Router();

//1. '/api/v1/tours'
router.route('/').get(getAllTours).post(createTour);

//2. '/api/v1/tours/:id'
router.route('/:id').get(getTour).patch(updateTour).delete(deleteTour);

module.exports = router;
