const Appointment = require('../models/Appointment');
const Doctor = require('../models/Doctor');

exports.bookAppointment = async (req, res) => {
  try {
    const { doctorId, date, startTime, endTime } = req.body;
    
    //chcking if slot availble
    const doctor = await Doctor.findById(doctorId);
    const dayOfWeek = new Date(date).toLocaleString('en-us', {weekday: 'long'});
    const availableSlot = doctor.availability.find(a => 
      a.day === dayOfWeek && 
      a.slots.some(s => s.startTime === startTime && s.endTime === endTime)
    );

    if (!availableSlot) {
      return res.status(400).json({ message: 'This slot is not available' });
    }

    //make new appoi
    const appointment = new Appointment({
      doctor: doctorId,
      patient: req.user.id,
      date,
      startTime,
      endTime
    });
    await appointment.save();

    res.status(201).json({ message: 'Appointment booked successfully', appointment });
  } catch (error) {
    res.status(400).json({ message: 'Booking failed', error: error.message });
  }
};

exports.cancelAppointment = async (req, res) => {
  try {
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
    res.status(400).json({ message: 'Cancellation failed', error: error.message });
  }
};