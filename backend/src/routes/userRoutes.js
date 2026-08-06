const express = require('express');
const router = express.Router();
const { registerUser, getUsers, getPendingUsers, updateUserStatus } = require('../controllers/userController');

router.post('/register', registerUser);
router.get('/pending', getPendingUsers);
router.get('/', getUsers);
router.put('/:id/status', updateUserStatus);

module.exports = router;
