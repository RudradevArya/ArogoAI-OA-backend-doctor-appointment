const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

//mid
app.use(cors());
app.use(express.json());
app.use('/api/auth', require('./routes/authRoutes'));

//conn to mongo
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB', err));

//routes
// app.use('/api/users', require('./routes/userRoutes'));
// app.use('/api/doctors', require('./routes/doctorRoutes'));
// app.use('/api/appointments', require('./routes/appointmentRoutes'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));