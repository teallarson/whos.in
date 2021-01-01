const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const providerSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    Lowercase: true,
  },
  password: {
    type: String,
  }
});

module.exports = Provider = mongoose.model('providers', providerSchema);