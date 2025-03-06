const User = require('../models/User');
const jwt = require('jsonwebtoken');

exports.register = async (req, res, next) => {
  console.log('Register endpoint hit:', new Date().toISOString());
  console.log('Request body:', req.body);
  try {
    const { name, email, password, role } = req.body;
    const user = new User({ name, email, password, role });
    await user.save();
    console.log('User registered successfully:', user._id);
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Registration failed:', error.message);
    res.status(400).json({ message: 'Registration failed', error: error.message });
  }
};

exports.login = async (req, res, next) => {
  console.log('Login endpoint hit:', new Date().toISOString());
  console.log('Request body:', req.body);
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      console.log('Invalid login attempt for email:', email)
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
    console.log('User logged in successfully:', user._id);
    res.json({ token, userId: user._id, role: user.role });
  } catch (error) {
    console.error('Login failed:', error.message);
    res.status(400).json({ message: 'Login failed', error: error.message });
  }
};