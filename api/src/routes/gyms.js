const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const db = require('../models');
const { handleValidationErrors, handleServerError } = require('../utils/errorHandlers');

const gymValidationRules = [
    body('name').trim().isLength({ min: 1 }).withMessage('Gym name is required'),
    body('address').trim().isLength({ min: 1 }).withMessage('Address is required'),
    body('phone').optional().trim().isLength({ min: 1 }).withMessage('Invalid Phone Format'),
    body('email').optional().isEmail().withMessage('Invalid email format'),
];

// Create a new gym
router.post('/', gymValidationRules, handleValidationErrors, async (req, res) => {
    try {
        const gym = await db.Gym.create(req.body);
        res.status(201).json(gym);
    } catch (error) {
        handleServerError(res, error, 'Failed to create gym');
    }
});

// Get all gyms
router.get('/', async (req, res) => {
    try {
        const gyms = await db.Gym.findAll();
        res.json(gyms);
    } catch (error) {
        handleServerError(res, error, 'Failed to retrieve gyms');
    }
});

// Get a specific gym by ID
router.get('/:id', async (req, res) => {
    try {
        const gym = await db.Gym.findByPk(req.params.id);
        if (!gym) {
            return res.status(404).json({ message: 'Gym not found' });
        }
        res.json(gym);
    } catch (error) {
        handleServerError(res, error, 'Failed to retrieve gym');
    }
});

// Update a gym
router.put('/:id', gymValidationRules, handleValidationErrors, async (req, res) => {
    try {
        const gym = await db.Gym.findByPk(req.params.id);
        if (!gym) {
            return res.status(404).json({ message: 'Gym not found' });
        }
        await gym.update(req.body);
        res.json(gym);
    } catch (error) {
        handleServerError(res, error, 'Failed to update gym');
    }
});

// Delete a gym
router.delete('/:id', async (req, res) => {
    try {
        const gym = await db.Gym.findByPk(req.params.id);
        if (!gym) {
            return res.status(404).json({ message: 'Gym not found' });
        }
        await gym.destroy();
        res.status(204).send();
    } catch (error) {
        handleServerError(res, error, 'Failed to delete gym');
    }
});

module.exports = router;