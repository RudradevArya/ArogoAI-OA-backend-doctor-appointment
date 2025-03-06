const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./config/swagger');
console.log(JSON.stringify(swaggerSpec, null, 2));

require('dotenv').config();

const app = express();

//mid
// app.use(cors());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'https://rudradev-arogo-ai-oa-frontend-doctor-appointment.vercel.app/' || 'http://localhost:3000'
}));
app.use(express.json());


//conn to mongo
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB', err));

//routes
app.use('/api/auth', require('../routes/authRoutes'));
app.use('/api/doctors', require('../routes/doctorRoutes'));
app.use('/api/appointments', require('../routes/appointmentRoutes'));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
// app.use('/api/users', require('./routes/userRoutes'));
// app.use('/api/doctors', require('./routes/doctorRoutes'));
// app.use('/api/appointments', require('./routes/appointmentRoutes'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));