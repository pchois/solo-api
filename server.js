// initialize express
const express = require('express');
const app = express();

// configure the PORT
const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
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
