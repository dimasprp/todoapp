const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema({
  email: {
    type: String,
    required: 'Data must have an email'
  },
  name: {
    type: String,
    required: 'Data must have an name'
  },
  password: {
    type: String,
    required: 'Data must have an password'
  },
  token:{
    type:String,
    default:null
  }
});

module.exports = mongoose.model('User', userSchema);
