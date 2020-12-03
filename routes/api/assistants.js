const express = require('express');
const router = express.Router();

//@route  GET /api/users/test
//@desc   Tests user js
//@access Public
router.get('/test', (req, res) => res.json({msg: 'Assistants works'}));



module.exports = router;