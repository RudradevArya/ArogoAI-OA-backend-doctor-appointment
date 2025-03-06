const mongoose = require('mongoose');
const User = require('../models/User');
const Doctor = require('../models/Doctor');
const Appointment = require('../models/Appointment');
require('dotenv').config();

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB', err));

const specialties = ['Cardiology', 'Dermatology', 'Neurology', 'Pediatrics', 'Orthopedics'];
const locations = ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix'];

const createUsers = async () => {
  const users = [
    { name: 'John Doe 2', email: 'john2@example.com', password: 'rudradev', role: 'patient' },
    { name: 'Jane Smith', email: 'jane@example.com', password: 'rudradev', role: 'patient' },
    { name: 'Dr. Michael Johnson', email: 'michael@example.com', password: 'rudradev', role: 'doctor' },
    { name: 'Dr. Emily Brown', email: 'emily@example.com', password: 'rudradev', role: 'doctor' },
    { name: 'Dr. David Wilson', email: 'david@example.com', password: 'rudradev', role: 'doctor' },
  ];

  for (let user of users) {
    await User.create(user);
  }
  console.log('Users created');
};

const createDoctorProfiles = async () => {
  const doctors = await User.find({ role: 'doctor' });
  for (let doctor of doctors) {
    await Doctor.create({
      user: doctor._id,
      specialty: specialties[Math.floor(Math.random() * specialties.length)],
      experience: Math.floor(Math.random() * 20) + 1,
      location: locations[Math.floor(Math.random() * locations.length)],
      availability: [
        {
          day: 'Monday',
          slots: [{ startTime: '09:00', endTime: '17:00' }]
        },
        {
          day: 'Wednesday',
          slots: [{ startTime: '10:00', endTime: '18:00' }]
        },
        {
          day: 'Friday',
          slots: [{ startTime: '09:00', endTime: '15:00' }]
        }
      ]
    });
  }
  console.log('Doctor profiles created');
};

const createAppointments = async () => {
  const patients = await User.find({ role: 'patient' });
  const doctors = await Doctor.find().populate('user');
  
  for (let i = 0; i < 10; i++) {
    const patient = patients[Math.floor(Math.random() * patients.length)];
    const doctor = doctors[Math.floor(Math.random() * doctors.length)];
    const date = new Date();
    date.setDate(date.getDate() + Math.floor(Math.random() * 14)); // Random date in next 2 weeks
    
    await Appointment.create({
      doctor: doctor._id,
      patient: patient._id,
      date: date,
      startTime: '10:00',
      endTime: '11:00',
      status: 'scheduled'
    });
  }
  console.log('Appointments created');
};

const seedDatabase = async () => {
  await User.deleteMany({});
  await Doctor.deleteMany({});
  await Appointment.deleteMany({});
  
  await createUsers();
  await createDoctorProfiles();
  await createAppointments();
  
  console.log('Database seeded!');
  mongoose.connection.close();
};

seedDatabase();