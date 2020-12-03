const express = require('express');
const app = express();
const mongoose = require ('mongoose');
const assistants = require('./routes/api/assistants');
const suites = require('./routes/api/suites');

//First route
app.get('/', (req, res) => res.send('Hello'));

//Use routes
app.use('/api/assistants', assistants);
app.use('/api/suites', suites);

const port = 7000;
app.listen(port, () => console.log(`Server running on port ${port}`));

//Db config
const db = require('./config/keys').mongoURI;
//Connect to mongoDB
mongoose
  .connect(db)
  .then(() => console.log('MongoDb connected'))
  .catch(err => console.log(err));