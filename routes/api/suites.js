const express = require('express');
const router = express.Router();
//load suite model
const Suite = require('../../models/Suite')
//validation
const validateSuiteInput = require ('../../validation/suite');

//@route  GET /api/suites/test
//@desc   Tests suite js
//@access Public
router.get('/test', (req, res) => res.json({msg: 'Suites works'}));

//@route  POST  /api/suites/add
//@route  Add a suite
//@access Public
router.post('/add', (req, res) => {
  const {errors, isValid} = 
  validateSuiteInput(req.body);

  if(!isValid){
    return res.status(400).json(errors);
  }

  Suite.findOne({suitename: req.body.suitename})
    .then((suite) => {
      if(suite){
        return res.status(400).json({suite: 'A suite with that name already exists'});
      } else {
        const newSuite = new Suite({
          suitename: req.body.suitename,
          status: req.body.status,
          provider: req.body.provider,
          notes: req.body.notes
        });
        newSuite.save()
          .then(suite => res.json(suite))
          .catch(err => console.log(err));
      }
    })
    .catch();
})
//@route  POST  /api/suites/update
//@desc   Update a suite's status, notes, etc.
//@access Public
router.post('/update', (req, res) => {
  Suite.findOne({name: req.body.suitename})
    .then((suite) => {
      const suiteFields = {};
      suiteFields.status = req.body.status;
      suiteFields.provider = req.body.provider;
      suiteFields.notes = req.body.notes;

      if(suite){
        //update suite status and notes
        Suite.findOneAndUpdate(
          { suitename: req.body.suitename },
          { $set: suiteFields },
          { new: true }
        )
        .then(suite => res.json(suite));
      } else {
        return res.status(400).json({suite: 'That suite does not exist'});
      }
    })
    .catch();
})


module.exports = router;