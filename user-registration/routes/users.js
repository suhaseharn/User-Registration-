const express = require('express');
const router = express.Router();
const {
    getUsers,
    createUser,
    updateUser,
    deleteUser,
} = require('../controllers/userController');

// CRUD Routes
router.get('/', getUsers);           // Get all users
router.post('/', createUser);        // Create a new user
router.put('/:id', updateUser);      // Update a user
router.delete('/:id', deleteUser);   // Delete a user

module.exports = router;
