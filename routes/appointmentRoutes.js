
const express = require('express');
const router = express.Router();
const { bookAppointment, cancelAppointment } = require('../controllers/appointmentController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/book', authMiddleware, bookAppointment);
router.put('/cancel/:id', authMiddleware, cancelAppointment);

module.exports = router;