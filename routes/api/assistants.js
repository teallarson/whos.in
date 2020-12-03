const express = require('express');
const router = express.Router();
const Assistant = require('../../models/Assistant');


//@route  GET /api/assistants/test
//@desc   Tests assistants js
//@access Public
router.get('/test', (req, res) => res.json({msg: 'Assistants works'}));

//@route  POST  /api/assistants/add
//@desc   Add an assistant
//@access Public

router.post('/add', (req, res) => {
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
router.post('./update', (req, res) => {
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

//@route   DELETE /api/assistants/delete
//@desc    Delete an assistant from the record
//@access  PUBLIC
router.delete(
  './delete',
  (req, res) => {
    Assistants.findOneAndRemove({name: req.body.name})
    .then(() => res.json({ success: true }))
    .catch((err) => console.log(err));
  }
);

module.exports = router;