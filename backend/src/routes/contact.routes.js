const express = require('express');
const router = express.Router();
const { createContact, getContacts, updateContact, deleteContact } = require('../controllers/contact.controller');

router.route('/')
  .post(createContact)
  .get(getContacts); // We can add auth middleware here later if needed

router.route('/:id')
  .put(updateContact)
  .delete(deleteContact);

module.exports = router;
