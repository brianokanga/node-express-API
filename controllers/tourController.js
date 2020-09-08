const fs = require('fs');
const Tour = require('./../models/tourModel');



// check body param middleware
exports.checkBody = (req, res, next) => {
  // check if body contains name and price property
  if (!req.body.name || !req.body.price) {
    // if not , send back 400
    return res.status(400).json({
      status: 'fail',
      message: 'missing name or price',
    });
  }

  next();
};

// i) Routes handlers
// get all tours route handler
exports.getAllTours = (req, res) => {
  console.log(req.requestTime);
  res.status(200).json({
    status: 'success',
    requestAt: req.requestTime,
    // results: tours.length,
    // data: {
    //   tours,
    // },
  });
};

// Get one tour route handler
exports.getTour = (req, res) => {
  console.log(req.params);
  const id = req.params.id * 1;

  // const tour = tours.find(el => el.id === id);
  // res.status(200).json({
  //   status: 'success',
  //   data: {
  //     tour,
  //   },
  // });
};

// Create New Tour route handler
exports.createTour = (req, res) => {
  res.status(201).json({
    status: 'success',
    // data: {
    //   tour: newTour,
    // },
  });
};


// Update a Tour route handler
exports.updateTour = (req, res) => {
  res.status(200).json({
    status: 'success',
    data: {
      tour: '<Updated tour here...>',
    },
  });
};

// Delete a Tour route handler
exports.deleteTour = (req, res) => {
  res.status(204).json({
    status: 'success',
    data: null,
  });
};