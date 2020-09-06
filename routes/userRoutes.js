const express = require('express');

// is) Routes handlers
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

// ii) Routes definitions
const router = express.Router();

//1. '/api/v1/users'
router.route('/').get(getAllUsers).post(createUser);

//2. '/api/v1/tours/:id'
router.route('/:id').get(getUser).patch(updateUser).delete(deleteUser);

module.exports = router;
