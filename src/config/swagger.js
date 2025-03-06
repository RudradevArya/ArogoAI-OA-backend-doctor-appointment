
const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Doctor Appointment API',
      version: '1.0.0',
      description: 'API for doctor appointment booking system',
    },
    servers: [
      {
        url: 'https://arogoai-oa-backend-doctor-appointment.onrender.com' || 'http://localhost:5000',
        description: 'Development server',
      },
    ],
  },
  apis: ['./routes/*.js'], 
};

module.exports = swaggerJsdoc(options);