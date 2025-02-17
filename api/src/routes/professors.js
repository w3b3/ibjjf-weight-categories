const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const db = require('../models');
const { handleValidationErrors, handleServerError } = require('../utils/errorHandlers');

const professorValidationRules = [
    body('name').trim().isLength({ min: 1 }).withMessage('Name is required'),
    body('belt').isIn(['Brown', 'Black']).withMessage('Invalid belt rank'),
    body('stripe').isInt({ min: 0, max: 4 }).withMessage('Stripe must be between 0 to 4'),
    body('photo').optional().isURL().withMessage('Photo must be a valid URL'),
];

// Create a new professor
router.post('/', professorValidationRules, handleValidationErrors, async (req, res) => {
    try {
        const professor = await db.Professor.create(req.body);
        res.status(201).json(professor);
    } catch (error) {
        handleServerError(res, error, 'Failed to create professor');
    }
});

// Get all professors
router.get('/', async (req, res) => {
    try {
        const professors = await db.Professor.findAll();
        res.json(professors);
    } catch (error) {
        handleServerError(res, error, 'Failed to retrieve professors');
    }
});

// Get a specific professor by ID
router.get('/:id', async (req, res) => {
    try {
        const professor = await db.Professor.findByPk(req.params.id);
        if (!professor) {
            return res.status(404).json({ message: 'Professor not found' });
        }
        res.json(professor);
    } catch (error) {
        handleServerError(res, error, 'Failed to retrieve professor');
    }
});

// Update a professor
router.put('/:id', professorValidationRules, handleValidationErrors, async (req, res) => {
    try {
        const professor = await db.Professor.findByPk(req.params.id);
        if (!professor) {
            return res.status(404).json({ message: 'Professor not found' });
        }
        await professor.update(req.body);
        res.json(professor);
    } catch (error) {
        handleServerError(res, error, 'Failed to update professor');
    }
});

// Delete a professor
router.delete('/:id', async (req, res) => {
    try {
        const professor = await db.Professor.findByPk(req.params.id);
        if (!professor) {
            return res.status(404).json({ message: 'Professor not found' });
        }
        await professor.destroy();
        res.status(204).send();
    } catch (error) {
        handleServerError(res, error, 'Failed to delete professor');
    }
});

module.exports = router;