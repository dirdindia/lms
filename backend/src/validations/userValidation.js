const Joi = require('joi');

const registerValidation = (data) => {
  const schema = Joi.object({
    role: Joi.string().valid('student', 'teacher', 'admin').required(),
    name: Joi.string().min(3).required(),
    email: Joi.string().min(6).required().email(),
    phone: Joi.string().allow('').optional(),
    password: Joi.string().min(6).required(),
    dob: Joi.date().allow('').optional(),
    gender: Joi.string().valid('male', 'female', 'other').allow('').optional(),
    profilePicture: Joi.string().allow('').optional(),

    // Student fields
    classGrade: Joi.string().allow('').optional(),
    educationBoard: Joi.string().allow('').optional(),
    schoolName: Joi.string().allow('').optional(),
    subjectsOfInterest: Joi.string().allow('').optional(),
    parentName: Joi.string().allow('').optional(),
    parentPhone: Joi.string().allow('').optional(),
    address: Joi.string().allow('').optional(),
    city: Joi.string().allow('').optional(),
    pincode: Joi.string().allow('').optional(),

    // Teacher fields
    highestQualification: Joi.string().allow('').optional(),
    subjectSpecialization: Joi.string().allow('').optional(),
    yearsOfExperience: Joi.number().allow('').optional(),
    isEmployed: Joi.boolean().optional(),
    employedSchool: Joi.string().allow('').optional(),
    currentDesignation: Joi.string().allow('').optional(),
    employedLocation: Joi.string().allow('').optional(),
    resume: Joi.string().allow('').optional(),
    educationCertificates: Joi.array().items(Joi.string()).optional()
  });
  return schema.validate(data);
};

module.exports = {
  registerValidation
};
