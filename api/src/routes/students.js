const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const db = require('../models');
const {handleValidationErrors, handleServerError} = require('../utils/errorHandlers')

// Validation rules for creating/updating a student
const studentValidationRules = [
    body('name').trim().isLength({ min: 1 }).withMessage('Name is required'),
    body('age').isInt({ min: 4 }).withMessage('Age must be an integer and at least 4'),
    body('weight').isFloat({ min: 0 }).withMessage('Weight must be a positive number'),
    body('belt').isIn(['White', 'Grey', 'Yellow', 'Orange', 'Green', 'Blue', 'Purple', 'Brown', 'Black']).withMessage('Invalid belt rank'),
    body('stripe').isInt({ min: 0, max: 4 }).withMessage('Stripe must be between 0 to 4'),
    body('photo').optional().isURL().withMessage('Photo must be a valid URL'),
];


// Create a new student
router.post('/', studentValidationRules, handleValidationErrors, async (req, res) => {
    try {
        const student = await db.Student.create(req.body);
        res.status(201).json(student);
    } catch (error) {
        handleServerError(res, error, 'Failed to create student');
    }
});

// Get all students
router.get('/', async (req, res) => {
    try {
        const students = await db.Student.findAll();
        res.json(students);
    } catch (error) {
         handleServerError(res, error, 'Failed to retrieve students');
    }
});

// Get a specific student by ID
router.get('/:id', async (req, res) => {
    try {
        const student = await db.Student.findByPk(req.params.id);
        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }
        res.json(student);
    } catch (error) {
        handleServerError(res, error, 'Failed to retrieve student');
    }
});

// Update a student
router.put('/:id', studentValidationRules, handleValidationErrors,  async (req, res) => {
    try {
        const student = await db.Student.findByPk(req.params.id);
        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }
        await student.update(req.body);
        res.json(student);
    } catch (error) {
       handleServerError(res, error, 'Failed to update student');
    }
});

// Delete a student
router.delete('/:id', async (req, res) => {
    try {
        const student = await db.Student.findByPk(req.params.id);
        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }
        await student.destroy();
        res.status(204).send(); // No content
    } catch (error) {
        handleServerError(res, error, 'Failed to delete student');
    }
});

module.exports = router;