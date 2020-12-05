const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create schema
const SuiteSchema = new Schema({
  suitename: {
    type: String
  },
  status: {
    type: String
  },
  provider: {
    type: String
  },
  notes: {
    type: String
  }
});

module.exports = Suite = mongoose.model('suites', SuiteSchema)