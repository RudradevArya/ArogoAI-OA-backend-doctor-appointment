
const express = require('express');
const router = express.Router();
const { bookAppointment, cancelAppointment, getMyAppointments} = require('../controllers/appointmentController');
const authMiddleware = require('../middlewares/authMiddleware');

/**
 * @swagger
 * /api/appointments/book:
 *   post:
 *     summary: Book an appointment
 *     tags: [Appointments]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - doctorId
 *               - date
 *               - time
 *             properties:
 *               doctorId:
 *                 type: string
 *                 description: The ID of the doctor
 *               date:
 *                 type: string
 *                 format: date
 *                 description: Appointment date (YYYY-MM-DD)
 *               time:
 *                 type: string
 *                 description: Appointment time (HH:MM format)
 *     responses:
 *       201:
 *         description: Appointment booked successfully
 *       400:
 *         description: Failed to book appointment
 */
router.post('/book', authMiddleware, bookAppointment);

/**
 * @swagger
 * /api/appointments/cancel/{id}:
 *   put:
 *     summary: Cancel an appointment
 *     tags: [Appointments]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The appointment ID to cancel
 *     responses:
 *       200:
 *         description: Appointment canceled successfully
 *       404:
 *         description: Appointment not found
 */
router.put('/cancel/:id', authMiddleware, cancelAppointment);

/**
 * @swagger
 * /api/appointments/my-appointments:
 *   get:
 *     summary: Get logged-in user's appointments
 *     tags: [Appointments]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: List of appointments
 *       401:
 *         description: Unauthorized
 */
router.get('/my-appointments', authMiddleware, getMyAppointments);

router.post('/book', authMiddleware, bookAppointment);
router.put('/cancel/:id', authMiddleware, cancelAppointment);
router.get('/my-appointments', authMiddleware, getMyAppointments);

module.exports = router;