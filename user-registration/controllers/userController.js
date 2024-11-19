const User = require('../models/user');

// Get all users
const getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// Add a new user
const createUser = async (req, res) => {
    try {
        const { name, email, dob } = req.body;
        const newUser = await User.create({ name, email, dob });
        res.status(201).json(newUser);
    } catch (err) {
        res.status(500).json({ message: 'Error creating user' });
    }
};

// Update an existing user
const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, dob } = req.body;
        const updatedUser = await User.findByIdAndUpdate(
            id,
            { name, email, dob },
            { new: true, runValidators: true }
        );
        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(updatedUser);
    } catch (err) {
        res.status(500).json({ message: 'Error updating user' });
    }
};

// Delete a user
const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedUser = await User.findByIdAndDelete(id);
        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: 'User deleted' });
    } catch (err) {
        res.status(500).json({ message: 'Error deleting user' });
    }
};

module.exports = {
    getUsers,
    createUser,
    updateUser,
    deleteUser,
};