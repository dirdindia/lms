const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  // Common Fields
  status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
  role: { type: String, enum: ['student', 'teacher', 'admin'], default: 'student' },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String },
  password: { type: String, required: true },
  dob: { type: Date },
  gender: { type: String, enum: ['male', 'female', 'other'] },
  profilePicture: { type: String }, // Assuming URL will be saved

  // Student Specific Fields
  classGrade: { type: String },
  educationBoard: { type: String },
  schoolName: { type: String },
  subjectsOfInterest: { type: String },
  parentName: { type: String },
  parentPhone: { type: String },
  address: { type: String },
  city: { type: String },
  pincode: { type: String },

  // Teacher Specific Fields
  highestQualification: { type: String },
  subjectSpecialization: { type: String },
  yearsOfExperience: { type: Number },
  isEmployed: { type: Boolean, default: false },
  employedSchool: { type: String },
  currentDesignation: { type: String },
  employedLocation: { type: String },
  resume: { type: String },
  educationCertificates: { type: [String] }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
