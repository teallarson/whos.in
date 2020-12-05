const express = require('express');
const router = express.Router();
//load assistant model
const Assistant = require('../../models/Assistant');
//validation
const validateAssistantInput = require('../../validation/assistant');

//@route  GET /api/assistants/test
//@desc   Tests assistants js
//@access Public
router.get('/test', (req, res) => res.json({msg: 'Assistants works'}));

//@route  POST  /api/assistants/add
//@desc   Add an assistant
//@access Public
router.post('/add', (req, res) => {
  const {errors, isValid} = validateAssistantInput(req.body);

  if(!isValid){
    return res.status(400).json(errors);
  }

  Assistant.findOne({name: req.body.name})
    .then((assistant) => {
      if(assistant){
        return res.status(400).json({name: 'An assistant with that name already exists'});
      } else {
        const newAssistant = new Assistant({
          name: req.body.name,
          phone: req.body.phone,
          status: req.body.status,
          notes: req.body.notes
        });
        newAssistant.save()
          .then(assistant => res.json(assistant))
          .catch(err => console.log(err));
      }
    })
    .catch();
})

//@route  POST  /api/assistants/update
//@desc   Update an assistant's status/leave note
//@access Public
router.post('/update', (req, res) => {
  Assistant.findOne({name: req.body.name})
    .then((assistant) => {
      const assistantFields = {};
      assistantFields.status = req.body.status;
      assistantFields.notes = req.body.notes;

      if(assistant){
        //update assistant status
        Assistant.findOneAndUpdate(
          { name: req.body.name },
          { $set: assistantFields },
          { new: true }
          )
          .then(assistant => res.json(assistant));
      } else {
        return res.status(400).json({assistant: 'That assistant does not exist'});
      }
    })
    .catch()
})

//@route   GET    /api/assistants
//@desc    Get all assistants data
//@access  Public
router.get('/', (req, res) => {
  const errors = {}

  Assistant.find()
    // .populate()
    .then((assistants) => {
      if(!assistants) {
        errors.noassistants = "There are no assistants";
        return res.status(404).json(errors);
      }

      res.json(assistants);
    })
    .catch((err) => res.status(404).json(err));
});

//@route   DELETE /api/assistants/delete
//@desc    Delete an assistant from the record
//@access  PUBLIC
router.delete(
  '/delete',
  (req, res) => {
    Assistants.findOneAndRemove({name: req.body.name})
    .then(() => res.json({ success: true }))
    .catch((err) => console.log(err));
  }
);

module.exports = router;