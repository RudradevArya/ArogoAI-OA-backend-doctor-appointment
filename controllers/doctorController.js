const Doctor = require('../models/Doctor');

exports.createProfile = async (req, res) => {
  try {
    const { specialty, experience, location } = req.body;
    
    // Check if a doctor profile already exists for this user
    let doctor = await Doctor.findOne({ user: req.user._id });
    
    if (doctor) {
      return res.status(400).json({ message: 'Doctor profile already exists for this user' });
    }

    doctor = new Doctor({
      user: req.user._id,
      specialty,
      experience,
      location
    });
    
    await doctor.save();
    res.status(201).json({ message: 'Doctor profile created successfully', doctor });
  } catch (error) {
    res.status(400).json({ message: 'Failed to create doctor profile', error: error.message });
  }
};

exports.searchDoctors = async (req, res) => {
  try {
    const { specialty, location, name } = req.query;
    let query = {};
    if (specialty) query.specialty = new RegExp(specialty, 'i');
    if (location) query.location = new RegExp(location, 'i');
    if (name) {
      query['$or'] = [
        { 'user.name': new RegExp(name, 'i') }
      ];
    }
    
    const doctors = await Doctor.find(query).populate('user', 'name');
    res.json(doctors);
  } catch (error) {
    res.status(400).json({ message: 'Search failed', error: error.message });
  }
};

exports.updateAvailability = async (req, res) => {
  try {
    const { availability } = req.body;
    const doctor = await Doctor.findOneAndUpdate(
      { user: req.user.id },
      { availability },
      { new: true }
    );
    res.json({ message: 'Availability updated successfully', doctor });
  } catch (error) {
    res.status(400).json({ message: 'Failed to update availability', error: error.message });
  }
};