const express = require('express');
const morgan = require('morgan');
const { route } = require('./routes/tourRoutes');

const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');
const app = express();

// 1. MIDDLEWARES
// The order of middleware determines how they are used
if (process.env.NODE_ENV === 'development') {
	app.use(morgan('dev'));
}

// Third party logger middleware
app.use(morgan('dev'));

// Simple middleware
app.use(express.json());

// middleware for serving static files
app.use(express.static(`${__dirname}/public`));

// Custom middleware functionS
// app.use ((req, res, next) => {
//   console.log (`Hello from the middleware!!`);
//   next ();
// });

app.use((req, res, next) => {
	req.requestTime = new Date().toString();
	next();
});

// 2. ROUTES HANDLERS

// 3. ROUTES

// Mounting the routers
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

module.exports = app;
