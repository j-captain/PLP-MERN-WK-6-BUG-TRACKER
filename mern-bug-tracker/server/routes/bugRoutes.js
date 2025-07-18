const express = require('express');
const router = express.Router();
const bugController = require('../controllers/bugController');

// Create a new bug
router.post('/', bugController.createBug);

// Get all bugs
router.get('/', bugController.getAllBugs);

//Get bug by ID
router.get('/:id', bugController.getBugById);

// Update a bug
router.put('/:id', bugController.updateBug);

// Delete a bug
router.delete('/:id', bugController.deleteBug);

module.exports = router;