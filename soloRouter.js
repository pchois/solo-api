// initialize express
const express = require('express');
const soloRouter = express.Router();
const bodyParser = require('body-parser');
const morgan = require('morgan');

// set body-parser
soloRouter.use(bodyParser.json());

// set morgan (logging)
soloRouter.use(morgan('tiny'));

// define the STACK
const soloStack = require('./soloStack.js');

// ROUTES

// get all makes
soloRouter.get('/makes', soloStack.retrieveMakes);

// get all models given a make
soloRouter.get('/models', soloStack.retrieveModels);

// get all trims  given a make and a model
soloRouter.get('/trims', soloStack.retrieveTrims);

// get all years  given a make, model and trim
soloRouter.get('/years', soloStack.retrieveYears);

// get all years  given a make and model (no trim)
soloRouter.get('/yearss3', soloStack.retrieveYearsS3);

// get a class for scenario 1
soloRouter.get('/s1', soloStack.retrieveClassS1);

// get a class for scenario 2
soloRouter.get('/s2', soloStack.retrieveClassS2);

// get a class for scenario 3
soloRouter.get('/s3', soloStack.retrieveClassS3);

// get a class for scenario 4
soloRouter.get('/s4', soloStack.retrieveClassS4);

// export menu Router
module.exports = soloRouter;
