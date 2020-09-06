const fs = require('fs');
const express = require('express');
const morgan = require('morgan');

const app = express();

// 1. MIDDLEWARES
// The order of middleware determines how they are used

// Third party logger middleware
app.use(morgan('dev'));

// Simple middleware
app.use(express.json());

// Custom middleware functionS
app.use((req, res, next) => {
	console.log(`Hello from the middleware!!`);
	next();
});

app.use((req, res, next) => {
	req.requestTime = new Date().toString();
	next();
});

//  Reading data from the file
const tours = JSON.parse(
	fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

// 2. ROUTES HANDLERS

// I) TOURS
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

// II) USERS

// Get all tours route handler
const getAllUsers = (req, res) => {
	res.status(500).json({
		status: 'success',
		message: 'This route is not yet defined!',
	});
};

// Get User route handler
const getUser = (req, res) => {
	res.status(500).json({
		status: 'success',
		message: 'This route is not yet defined!',
	});
};

// Create User route handler
const createUser = (req, res) => {
	res.status(500).json({
		status: 'success',
		message: 'This route is not yet defined!',
	});
};

// Update user route handler
const updateUser = (req, res) => {
	res.status(500).json({
		status: 'success',
		message: 'This route is not yet defined!',
	});
};

// Delete User route handler
const deleteUser = (req, res) => {
	res.status(500).json({
		status: 'success',
		message: 'This route is not yet defined!',
	});
};

// 3. ROUTES

// i)TOURS

//1. '/api/v1/tours'
app.route('/api/v1/tours').get(getAllTours).post(createTour);

//2. '/api/v1/tours/:id'
app
	.route('/api/v1/tours/:id')
	.get(getTour)
	.patch(updateTour)
	.delete(deleteTour);

// ii) USERS

//1. '/api/v1/users'
app.route('/api/v1/users').get(getAllUsers).post(createUser);

//2. '/api/v1/tours/:id'
app
	.route('/api/v1/users/:id')
	.get(getUser)
	.patch(updateUser)
	.delete(deleteUser);

// 4. START THE SERVER
const port = 3000;
app.listen(port, () => {
	console.log(`App running on port ${port}...`);
});
