const express = require('express');
const router = express.Router();
const { createProfile, searchDoctors, updateAvailability } = require('../controllers/doctorController');
const authMiddleware = require('../middlewares/authMiddleware');

/**
 * @swagger
 * /api/doctors/profile:
 *   post:
 *     summary: Create a doctor profile
 *     tags: [Doctors]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - specialization
 *               - experience
 *             properties:
 *               name:
 *                 type: string
 *               specialization:
 *                 type: string
 *               experience:
 *                 type: number
 *                 description: Number of years of experience
 *     responses:
 *       201:
 *         description: Doctor profile created successfully
 *       400:
 *         description: Profile creation failed
 */
router.post('/profile', authMiddleware, createProfile);

/**
 * @swagger
 * /api/doctors/search:
 *   get:
 *     summary: Search for doctors
 *     tags: [Doctors]
 *     parameters:
 *       - in: query
 *         name: specialization
 *         schema:
 *           type: string
 *         description: Filter doctors by specialization
 *     responses:
 *       200:
 *         description: List of doctors
 *       400:
 *         description: Search failed
 */
router.get('/search', searchDoctors);

/**
 * @swagger
 * /api/doctors/availability:
 *   put:
 *     summary: Update doctor's availability
 *     tags: [Doctors]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - availableSlots
 *             properties:
 *               availableSlots:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: List of available time slots
 *     responses:
 *       200:
 *         description: Availability updated successfully
 *       400:
 *         description: Failed to update availability
 */
router.put('/availability', authMiddleware, updateAvailability);

router.post('/profile', authMiddleware, createProfile);
router.get('/search', searchDoctors);
router.put('/availability', authMiddleware, updateAvailability);

module.exports = router;