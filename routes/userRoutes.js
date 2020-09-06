const express = require('express');
const userController = require('./../controllers/userController');

// i) Routes definitions
const router = express.Router();

//1. '/api/v1/users'
router
	.route('/')
	.get(userController.getAllUsers)
	.post(userController.createUser);

//2. '/api/v1/tours/:id'
router
	.route('/:id')
	.get(userController.getUser)
	.patch(userController.updateUser)
	.delete(userController.deleteUser);

module.exports = router;
