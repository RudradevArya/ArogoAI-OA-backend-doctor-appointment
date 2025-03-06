const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  specialty: { type: String, required: true },
  experience: { type: Number, required: true },
  location: { type: String, required: true },
  availability: [{
    day: { type: String, enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'] },
    slots: [{ startTime: String, endTime: String }]
  }]
}, { timestamps: true });

module.exports = mongoose.model('Doctor', doctorSchema);