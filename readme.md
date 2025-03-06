# Doctor Appointment System - Backend

## Setup and Installation

1. Clone the repository
2. Navigate to the backend directory: `cd backend`
3. Install dependencies: `npm install`
4. Create a `.env` file and add the following:


MONGODB_URI=your_mongodb_connection_string JWT_SECRET=your_jwt_secret 
PORT=5000
AWS_ACCESS_KEY_ID=your_access_key
AWS_SECRET_ACCESS_KEY=your_secret_key
AWS_REGION=your_preferred_region
FRONTEND_URL=https://rudradev-arogo-ai-oa-frontend-doctor-appointment.vercel.app/

1. Start the server: `npm start`
2. For development with auto-reload: `npm run dev`

## API Documentation

API documentation is available via Swagger UI at `/api-docs` when the server is running.

## Deployment

This backend is configured for deployment on Render. Follow these steps:
Deployed Link: https://arogoai-oa-backend-doctor-appointment.onrender.com/api-docs/

1. Connect your GitHub repository to Render
2. Set up a new Web Service
3. Use the following settings:
   - Build Command: `npm install`
   - Start Command: `npm start`
4. Add environment variables in Render dashboard

## Task List and Assignment Comparison

### Implemented Features:
- [x] User Authentication (JWT-based)
- [x] Doctor and Patient registration
- [x] Login functionality
- [x] Password hashing (using bcrypt)
- [x] Doctor search API (by specialty and location)
- [x] Appointment booking system
- [x] Doctor availability management
- [x] Basic concurrency handling for appointments
- [x] API documentation with Swagger
- [ ] Advanced search filters (e.g., by doctor's name)
- [ ] Comprehensive error handling and validation
- [ ] Email notifications for bookings (tried using AWS SES but got errors)
- [ ] Deployment of Beanstalk (Did on render instead)
- [ ] Create CICD github actions for beanstalk deployment 

### Assignment Requirements Comparison:
1. User Authentication & Role Management: Fully implemented
2. Doctor Search & Profile Management: Implemented with basic search functionality
3. Appointment Booking System: Core functionality implemented
4. Web Interface: Implemented on the frontend
5. Deployment: Configured for Render deployment

## Demo
![Doctor appointment API Demo at demo/demo.gif](demo/demo.gif)

[![Watch the video](https://raw.githubusercontent.com/RudradevArya/ArogoAI-OA-backend-doctor-appointment/main/demo/thumb.png)](https://raw.githubusercontent.com/RudradevArya/ArogoAI-OA-backend-doctor-appointment/main/demo/demo.mp4)

