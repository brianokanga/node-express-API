const express = require('express');
const tourController = require('./../controllers/tourController');

// i)TOURS routes definitions
const router = express.Router();

// param middleware
// router.param ('id', tourController.checkID);

// ALIAS 
router.route('/top-5-cheap').get(tourController.aliasTopTours, tourController.getAllTours);

//1. '/api/v1/tours'
router
  .route('/')
  .get(tourController.getAllTours)
  .post(tourController.createTour);

//2. '/api/v1/tours/:id'
router
  .route('/:id')
  .get(tourController.getTour)
  .patch(tourController.updateTour)
  .delete(tourController.deleteTour);

module.exports = router;