const Appointment = require('../models/Appointment');
const Doctor = require('../models/Doctor');

exports.bookAppointment = async (req, res) => {
  console.log('Book appointment endpoint hit:', new Date().toISOString());
  console.log('Request body:', req.body);
  console.log('User ID:', req.user._id);
  try {
    const { doctorId, date, startTime, endTime } = req.body;
    
    const doctor = await Doctor.findById(doctorId);
    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }

    const dayOfWeek = new Date(date).toLocaleString('en-us', {weekday: 'long'});
    const availableSlot = doctor.availability.find(a => 
      a.day === dayOfWeek && 
      a.slots.some(s => s.startTime === startTime && s.endTime === endTime)
    );

    if (!availableSlot) {
      return res.status(400).json({ message: 'This slot is not available' });
    }

    const appointment = new Appointment({
      doctor: doctorId,
      patient: req.user._id,
      date,
      startTime,
      endTime
    });
    await appointment.save();
    console.log('Appointment booked:', appointment._id);
    res.status(201).json({ message: 'Appointment booked successfully', appointment });
  } catch (error) {
    console.error('Booking failed:', error.message);
    res.status(400).json({ message: 'Booking failed', error: error.message });
  }
};

exports.cancelAppointment = async (req, res) => {
  console.log('Cancel appointment endpoint hit:', new Date().toISOString());
  console.log('Appointment ID:', req.params.id);
  console.log('User ID:', req.user.id);
  try {
    console.log('Appointment cancelled:', appointment._id);
    const appointment = await Appointment.findOneAndUpdate(
      { _id: req.params.id, patient: req.user.id },
      { status: 'cancelled' },
      { new: true }
    );

    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found or not authorized to cancel' });
    }

    res.json({ message: 'Appointment cancelled successfully', appointment });
  } catch (error) {
    console.error('Cancellation failed:', error.message);
    res.status(400).json({ message: 'Cancellation failed', error: error.message });
  }
};

exports.getMyAppointments = async (req, res) => {
  console.log('Get my appointments endpoint hit:', new Date().toISOString());
  console.log('User ID:', req.user._id);
  try {
    console.log('Appointments fetched:', appointments.length);
    const appointments = await Appointment.find({ patient: req.user._id })
      .populate('doctor', 'name specialty')
      .sort({ date: 1 });
    res.json(appointments);
  } catch (error) {
    console.error('Failed to fetch appointments:', error.message);
    res.status(400).json({ message: 'Failed to fetch appointments', error: error.message });
  }
};