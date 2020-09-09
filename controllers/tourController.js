const fs = require('fs');
const Tour = require('./../models/tourModel');
const {
  find,
  findById
} = require('./../models/tourModel');
const {
  match
} = require('assert');

// i) Routes handlers
// get all tours route handler
// find() returns a promise
exports.getAllTours = async (req, res) => {
  try {
    console.log(req.query);
    //1. BUILD A QUERY
    //1. Filtering

    //  method 1
    const queryObj = {
      ...req.query
    };
    const excludedFields = ['page', 'sort', 'limit', 'fields'];
    excludedFields.forEach(el => delete queryObj[el]);

    //2. Advanced filtering
    let queryStr = JSON.stringify(queryObj);
    conqueryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `${match}`);
    console.log(JSON.parse(queryStr));


    // {difficulty: 'easy', duration: { gte: '5' } }

    // method 2
    // const query = Tour.find().where('duration').equals(5).where('difficulty').equals('easy');

    const query = Tour.find(queryObj);

    // EXECUTE A QUERY
    const tours = await query;

    // SEND RESPONSE
    res.status(200).json({
      status: 'success',
      results: tours.length,
      data: {
        tours
      }
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err
    });
  }
};

// Get one tour route handler
// findById(req.params.id) <=> findOne({ _id: req.params.id})
exports.getTour = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id);
    res.status(200).json({
      status: 'success',
      data: {
        tour
      }
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err
    });
  }
};

// Create New Tour route handler
exports.createTour = async (req, res) => {
  try {
    const newTour = await Tour.create(req.body);

    res.status(201).json({
      status: 'success',
      data: {
        tour: newTour
      }
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err
    });
  }
};

// Update a Tour route handler
exports.updateTour = async (req, res) => {
  try {
    const tour = await Tour.findOneAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.status(200).json({
      status: 'success',
      data: {
        tour
      }
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err
    });
  }
};

// Delete a Tour route handler
exports.deleteTour = async (req, res) => {
  try {
    await Tour.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: 'success',
      data: null
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err
    });
  }
};