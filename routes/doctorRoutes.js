const express = require('express');
const router = express.Router();
const { createProfile, searchDoctors, updateAvailability } = require('../controllers/doctorController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/profile', authMiddleware, createProfile);
router.get('/search', searchDoctors);
router.put('/availability', authMiddleware, updateAvailability);

module.exports = router;