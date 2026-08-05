const User = require('../models/User');
const bcrypt = require('bcryptjs');
const { registerValidation } = require('../validations/userValidation');

// @desc    Register a new user (student/teacher)
// @route   POST /api/users/register
const registerUser = async (req, res) => {
  try {
    // Validate request
    const { error } = registerValidation(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    const { 
      role, name, email, phone, password, dob, gender, profilePicture,
      classGrade, educationBoard, schoolName, subjectsOfInterest, parentName, parentPhone, address, city, pincode,
      highestQualification, subjectSpecialization, yearsOfExperience, isEmployed, employedSchool, currentDesignation, employedLocation, resume, educationCertificates
    } = req.body;

    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists with this email' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const user = await User.create({
      role: role || 'student', // default to student if not provided
      name, email, phone, password: hashedPassword, dob, gender, profilePicture,
      classGrade, educationBoard, schoolName, subjectsOfInterest, parentName, parentPhone, address, city, pincode,
      highestQualification, subjectSpecialization, yearsOfExperience, isEmployed, employedSchool, currentDesignation, employedLocation, resume, educationCertificates
    });

    res.status(201).json({
      message: 'User registered successfully',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all users with pagination and search
// @route   GET /api/users
const getUsers = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.search || '';

    // Build search query
    const query = {};
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } }
      ];
    }

    // Calculate pagination
    const startIndex = (page - 1) * limit;
    const total = await User.countDocuments(query);

    const users = await User.find(query)
      .select('-password')
      .skip(startIndex)
      .limit(limit)
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: users.length,
      total,
      page,
      pages: Math.ceil(total / limit),
      data: users
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  registerUser,
  getUsers
};
