const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  role: { type: String, enum: ['student', 'faculty', 'admin'], default: 'student' },
  // add fields as needed
});
module.exports = mongoose.model('User', userSchema);
