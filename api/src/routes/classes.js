const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const db = require('../models');
const { handleValidationErrors, handleServerError } = require('../utils/errorHandlers');

const classValidationRules = [
    body('name').trim().isLength({ min: 1 }).withMessage('Class name is required'),
    body('schedule').trim().isLength({ min: 1 }).withMessage('Schedule is required'),
    body('type').isIn(['Kids', 'Adults', 'All Levels', "Competition", "Open Mat", "Fundamentals"]).withMessage('Invalid class type'),
    body('professorId').isInt().withMessage('Professor ID must be an integer').optional(),
    body('gymId').isInt().withMessage('Gym ID must be an integer'),
];

// Create a new class
router.post('/', classValidationRules, handleValidationErrors, async (req, res) => {
    try {
        const classData = await db.Class.create(req.body);
        res.status(201).json(classData);
    } catch (error) {
        handleServerError(res, error, 'Failed to create class');
    }
});

// Get all classes
router.get('/', async (req, res) => {
    try {
        const classes = await db.Class.findAll({
            include: [
                { model: db.Professor, attributes: ['id', 'name'] },
                { model: db.Gym, attributes: ['id', 'name']},
                { model: db.Student, attributes: ['id', 'name'], through: { attributes: [] } } // Include students, exclude join table attributes
            ]
        });
        res.json(classes);
    } catch (error) {
        handleServerError(res, error, 'Failed to retrieve classes');
    }
});

// Get a specific class by ID
router.get('/:id', async (req, res) => {
    try {
        const classData = await db.Class.findByPk(req.params.id, {
            include: [
              { model: db.Professor, attributes: ['id', 'name'] },
              { model: db.Gym, attributes: ['id', 'name']},
              { model: db.Student, attributes: ['id', 'name'], through: { attributes: [] } }
            ]
        });
        if (!classData) {
            return res.status(404).json({ message: 'Class not found' });
        }
        res.json(classData);
    } catch (error) {
        handleServerError(res, error, 'Failed to retrieve class');
    }
});

// Update a class
router.put('/:id', classValidationRules, handleValidationErrors, async (req, res) => {
    try {
        const classData = await db.Class.findByPk(req.params.id);
        if (!classData) {
            return res.status(404).json({ message: 'Class not found' });
        }
        await classData.update(req.body);
        res.json(classData);
    } catch (error) {
        handleServerError(res, error, 'Failed to update class');
    }
});

// Delete a class
router.delete('/:id', async (req, res) => {
    try {
        const classData = await db.Class.findByPk(req.params.id);
        if (!classData) {
            return res.status(404).json({ message: 'Class not found' });
        }
        await classData.destroy();
        res.status(204).send();
    } catch (error) {
        handleServerError(res, error, 'Failed to delete class');
    }
});

// Add a student to a class
router.post('/:classId/students/:studentId', async (req, res) => {
    try {
        const classData = await db.Class.findByPk(req.params.classId);
        const student = await db.Student.findByPk(req.params.studentId);

        if (!classData || !student) {
            return res.status(404).json({ message: 'Class or Student not found' });
        }

        await classData.addStudent(student);
        res.status(200).json({ message: 'Student added to class' });
    } catch (error) {
        handleServerError(res, error, 'Failed to add student to class');
    }
});

// Remove a student from a class
router.delete('/:classId/students/:studentId', async (req, res) => {
    try {
        const classData = await db.Class.findByPk(req.params.classId);
        const student = await db.Student.findByPk(req.params.studentId);

        if (!classData || !student) {
            return res.status(404).json({ message: 'Class or Student not found' });
        }

        await classData.removeStudent(student);
        res.status(200).json({ message: 'Student removed from class' });

    } catch (error) {
        handleServerError(res, error, 'Failed to remove student from class');
    }
});

module.exports = router;