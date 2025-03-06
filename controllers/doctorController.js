const Doctor = require('../models/Doctor');

exports.createProfile = async (req, res) => {
  console.log('Create doctor profile endpoint hit:', new Date().toISOString());
  console.log('Request body:', req.body);
  console.log('User ID:', req.user._id);
  try {
    const { specialty, experience, location } = req.body;
    console.log('Doctor profile created:', doctor._id);
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
    console.error('Failed to create doctor profile:', error.message);
    res.status(400).json({ message: 'Failed to create doctor profile', error: error.message });
  }
};

exports.searchDoctors = async (req, res) => {
  console.log('Search doctors endpoint hit:', new Date().toISOString());
  console.log('Query parameters:', req.query);
  try {
    console.log('Doctors found:', doctors.length);
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
    res.json(doctors.length > 0 ? doctors : { message: 'No doctors found', doctors: [] });
  } catch (error) {
    console.error('Search failed:', error.message);
    res.status(400).json({ message: 'Search failed', error: error.message });
  }
};

exports.updateAvailability = async (req, res) => {
  console.log('Update availability endpoint hit:', new Date().toISOString());
  console.log('Request body:', req.body);
  console.log('User ID:', req.user.id);
  try {
    console.log('Availability updated for doctor:', doctor._id);
    const { availability } = req.body;
    const doctor = await Doctor.findOneAndUpdate(
      { user: req.user.id },
      { availability },
      { new: true }
    );
    res.json({ message: 'Availability updated successfully', doctor });
  } catch (error) {
    console.error('Failed to update availability:', error.message);
    res.status(400).json({ message: 'Failed to update availability', error: error.message });
  }
};