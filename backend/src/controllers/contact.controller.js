const Contact = require('../models/Contact');
const { contactValidation } = require('../validations/contact.validation');

// @desc    Create a contact inquiry
// @route   POST /api/contacts
// @access  Public
const createContact = async (req, res) => {
  try {
    const { error } = contactValidation.createContact.validate(req.body);
    
    if (error) {
      return res.status(400).json({ success: false, message: error.details[0].message });
    }

    const contact = await Contact.create(req.body);
    
    res.status(201).json({
      success: true,
      data: contact
    });
  } catch (error) {
    console.error('Error creating contact:', error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

// @desc    Get all contact inquiries
// @route   GET /api/contacts
// @access  Private (Admin)
const getContacts = async (req, res) => {
  try {
    // Sort by newest first
    const contacts = await Contact.find().sort({ createdAt: -1 });
    
    res.status(200).json({
      success: true,
      count: contacts.length,
      data: contacts
    });
  } catch (error) {
    console.error('Error getting contacts:', error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

// @desc    Update a contact inquiry (status, remarks)
// @route   PUT /api/contacts/:id
// @access  Private (Admin)
const updateContact = async (req, res) => {
  try {
    const { status, remarks } = req.body;
    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { status, remarks },
      { new: true, runValidators: true }
    );

    if (!contact) {
      return res.status(404).json({ success: false, message: 'Contact not found' });
    }

    res.status(200).json({
      success: true,
      data: contact
    });
  } catch (error) {
    console.error('Error updating contact:', error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

// @desc    Delete a contact inquiry
// @route   DELETE /api/contacts/:id
// @access  Private (Admin)
const deleteContact = async (req, res) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id);

    if (!contact) {
      return res.status(404).json({ success: false, message: 'Contact not found' });
    }

    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (error) {
    console.error('Error deleting contact:', error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

module.exports = {
  createContact,
  getContacts,
  updateContact,
  deleteContact
};
