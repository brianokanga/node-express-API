const express = require('express');
const tourController = require('./../controllers/tourController');

// i)TOURS routes definitions
const router = express.Router();

// param middleware
// router.param ('id', tourController.checkID);

//1. '/api/v1/tours'
router
  .route('/')
  .get(tourController.getAllTours)
  .post(tourController.checkBody, tourController.createTour);

//2. '/api/v1/tours/:id'
router
  .route('/:id')
  .get(tourController.getTour)
  .patch(tourController.updateTour)
  .delete(tourController.deleteTour);

module.exports = router;