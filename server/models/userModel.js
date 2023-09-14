const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// const SALT_WORK_FACTOR = 10;
// const bcrypte = require('bcryptjs');

const userSchema = new Schema ({
  username: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  buyingpower: {type: Number, default: 50000}
});

module.exports = mongoose.model('User', userSchema);