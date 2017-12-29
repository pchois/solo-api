// initialize express
const express = require('express');
const app = express();

// configure the PORT
app.listen((process.env.PORT || 8080), () => {
  console.log(`Server is listening`);
});

// configure SOLO Router
const soloRouter = require('./soloRouter.js');

// allow connections
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

//ROUTE
app.use('/api/solo', soloRouter);


// export app
module.exports = app;
