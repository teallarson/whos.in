const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const providerSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

module.exports = Provider = mongoose.model('providers', providerSchema);