// initialize express
const express = require('express');
const soloRouter = express.Router();

// consigure sqlite
const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('./database.sqlite');

// STACKS
// get all makes
// error handling is very basic
// for this call, there should never be a case where this query returns no results -- not handling a case if it does
const retrieveMakes = (req, res, next) => {
  db.all("SELECT * FROM Makes;", (err, makes) => {
    if(err){
      res.status(500).send(err);
    }else{
      res.status(200).send(makes);
    }
  });
}

// get all models, the make_id is required
// error handling is very basic
// for this call, there should never be a case where this query returns no results -- not handling a case if it does
const retrieveModels = (req, res, next) => {
  db.all("SELECT * FROM Models m JOIN MakeModelMap mmm on m.id = mmm.model_id WHERE mmm.make_id = $id ORDER BY name ASC;",
  {$id: req.query.makeId},
  (err, models) => {
    if(err){
      res.status(500).send(err);
    }else{
      res.status(200).send(models);
    }
  });
}

// get all trims, make_id and model_id are required
// error handling is very basic
// for this call, currently not handling the case where no results are returned -- look into returning a 204
const retrieveTrims = (req, res, next) => {
  db.all("SELECT * from Trims t JOIN ModelTrimMap mtm on t.id = mtm.trim_id WHERE mtm.make_id = $make_id AND mtm.model_id = $model_id ORDER BY name ASC;",
  {$make_id: req.query.makeId, $model_id: req.query.modelId},
  (err, trims) => {
    if(err){
      res.status(500).send(err);
    }else{
      res.status(200).send(trims);
    }
  });
}

// get all years for scenarios 1, 2 and 4. make_id, model_id and trim_id are required
// error handling is very basic
// for this call, there should never be a case where this query returns no results -- not handling a case if it does
const retrieveYears = (req, res, next) => {
  db.all("SELECT * FROM Years y JOIN TrimYearMap tym ON y.id = tym.year_id WHERE tym.make_id = $make_id AND tym.model_id = $model_id AND tym.trim_id = $trim_id ORDER BY name ASC;",
  {$make_id: req.query.makeId, $model_id: req.query.modelId, $trim_id: req.query.trimId},
  (err, years) => {
    if(err){
      res.status(500).send(err);
    }else{
      res.status(200).send(years);
    }
  });
}

// get all years for scenario 3. make_id and model_id are required
// error handling is very basic
// for this call, there should never be a case where this query returns no results -- not handling a case if it does
const retrieveYearsS3 = (req, res, next) => {
  db.all("SELECT * FROM Years y JOIN ModelYearMap mym ON y.id = mym.year_id WHERE mym.make_id = $make_id AND mym.model_id = $model_id ORDER BY name ASC;",
  {$make_id: req.query.makeId, $model_id: req.query.modelId},
  (err, yearss3) => {
    if(err){
      res.status(500).send(err);
    }else{
      res.status(200).send(yearss3);
    }
  });
}

// get the class for scenario 2, make_id and model_id are required
// error handling is very basic
// for this call, there should never be a case where this query returns no results -- not handling a case if it does
// currently using db.all, should really use db.get since only 1 result should be returned. Maybe leave db.all and handle the error is more than 1 result comes back.
const retrieveClassS1 = (req, res, next) => {
  db.all("SELECT * FROM Classes c JOIN Scenario1 s1 ON c.id = s1.class_id WHERE s1.make_id = $make_id AND s1.model_id = $model_id ORDER BY name ASC;",
  {$make_id: req.query.makeId, $model_id: req.query.modelId},
  (err, classes1) => {
    if(err){
      res.status(500).send(err);
    }else{
      res.status(200).send(classes1);
    }
  });
}

// get the class for scnerio 2, make_id, model_id and trim_id are required
// error handling is very basic
// for this call, there should never be a case where this query returns no results -- not handling a case if it does
// currently using db.all, should really use db.get since only 1 result should be returned. Maybe leave db.all and handle the error is more than 1 result comes back.
const retrieveClassS2 = (req, res, next) => {
  db.all("SELECT * FROM Classes c JOIN Scenario2 s2 ON c.id = s2.class_id WHERE s2.make_id = $make_id AND s2.model_id = $model_id AND s2.trim_id = $trim_id ORDER BY name ASC;",
  {$make_id: req.query.makeId, $model_id: req.query.modelId, $trim_id: req.query.trimId},
  (err, classes2) => {
    if(err){
      res.status(500).send(err);
    }else{
      res.status(200).send(classes2);
    }
  });
}

// get the class for scneario 3, make_id, model_id and year_id are required
// error handling is very basic
// for this call, there should never be a case where this query returns no results -- not handling a case if it does
// currently using db.all, should really use db.get since only 1 result should be returned. Maybe leave db.all and handle the error is more than 1 result comes back.
const retrieveClassS3 = (req, res, next) => {
  db.all("SELECT * FROM Classes c JOIN Scenario3 s3 ON c.id = s3.class_id WHERE s3.make_id = $make_id AND s3.model_id = $model_id AND s3.year_id = $year_id ORDER BY name ASC;",
  {$make_id: req.query.makeId, $model_id: req.query.modelId, $year_id: req.query.yearId},
  (err, classes3) => {
    if(err){
      res.status(500).send(err);
    }else{
      res.status(200).send(classes3);
    }
  });
}

// get the class for scenario 4, make_id, model_id, trim_id and year_id are required
// error handling is very basic
// for this call, there should never be a case where this query returns no results -- not handling a case if it does
// currently using db.all, should really use db.get since only 1 result should be returned. Maybe leave db.all and handle the error is more than 1 result comes back.
const retrieveClassS4 = (req, res, next) => {
  db.all("SELECT * FROM Classes c JOIN Scenario4 s4 ON c.id = s4.class_id WHERE s4.make_id = $make_id AND s4.model_id = $model_id AND s4.trim_id = $trim_id AND s4.year_id = $year_id ORDER BY name ASC;",
  {$make_id: req.query.makeId, $model_id: req.query.modelId, $trim_id: req.query.trimId, $year_id: req.query.yearId},
  (err, classes4) => {
    if(err){
      res.status(500).send(err);
    }else{
      res.status(200).send(classes4);
    }
  });
}

// export the functions
module.exports = {
  retrieveMakes,
  retrieveModels,
  retrieveTrims,
  retrieveYears,
  retrieveYearsS3,
  retrieveClassS1,
  retrieveClassS2,
  retrieveClassS3,
  retrieveClassS4
}
