const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const db = require('../models');
const {handleValidationErrors, handleServerError} = require('../utils/errorHandlers')

const checkinValidationRules = [
    body('studentId').isInt().withMessage('Student ID must be an integer'),
    body('classId').isInt().withMessage('Class ID must be an integer'),
];

// Create a new checkin
router.post('/', checkinValidationRules, handleValidationErrors, async (req, res) => {
    try {
        const checkin = await db.Checkin.create(req.body);
        res.status(201).json(checkin);
    } catch (error) {
       handleServerError(res, error, 'Failed to create check-in')
    }
});

// Get all checkins
router.get('/', async (req, res) => {
    try {
        const checkins = await db.Checkin.findAll({
          include: [
            {model: db.Student, attributes: ['id', 'name']},
            {model: db.Class, attributes: ['id', 'name']}
          ]
        });
        res.json(checkins);
    } catch (error) {
        handleServerError(res, error, 'Failed to retrieve check-ins');
    }
});

// Get checkins for a specific student
router.get('/student/:studentId', async (req, res) => {
    try {
        const checkins = await db.Checkin.findAll({
            where: { studentId: req.params.studentId },
            include: [
                { model: db.Student, attributes: ['id', 'name'] },
                { model: db.Class, attributes: ['id', 'name'] }
            ]
        });
        res.json(checkins);
    } catch (error) {
      handleServerError(res, error, 'Failed to retrieve check-ins by student');
    }
});

// Get checkins for a specific class
router.get('/class/:classId', async(req, res) => {
    try {
        const checkins = await db.Checkin.findAll({
            where: { classId: req.params.classId},
            include: [
                { model: db.Student, attributes: ['id', 'name']},
                { model: db.Class, attributes: ['id', 'name']}
            ]
        });
        res.json(checkins);
    } catch(error) {
        handleServerError(res, error, 'Failed to retrieve check-ins by class');
    }
});

// Get a specific checkin by ID
router.get('/:id', async (req, res) => {
    try {
        const checkin = await db.Checkin.findByPk(req.params.id, {
            include: [
                { model: db.Student, attributes: ['id', 'name'] },
                { model: db.Class, attributes: ['id', 'name'] }
            ]
        });
        if (!checkin) {
            return res.status(404).json({ message: 'Checkin not found' });
        }
        res.json(checkin);
    } catch (error) {
        handleServerError(res, error, 'Failed to retrieve check-in');
    }
});

// Delete a check-in  (Usually you wouldn't delete check-ins, but I'll include it for completeness)
router.delete('/:id', async (req, res) => {
    try {
        const checkin = await db.Checkin.findByPk(req.params.id);
        if (!checkin) {
            return res.status(404).json({ message: 'Checkin not found' });
        }
        await checkin.destroy();
        res.status(204).send();
    } catch (error) {
        handleServerError(res, error, 'Failed to delete check-in');
    }
});

module.exports = router;