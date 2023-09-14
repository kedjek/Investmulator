const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const sessionSchema = new Schema ({
  cookieID: {type: String, required: true, unique: true},
  createdAt: {type: Date, expires: 30, default: Date.now},
  user: {type: Object, default: {}}
});

module.exports = mongoose.model('Session', sessionSchema);