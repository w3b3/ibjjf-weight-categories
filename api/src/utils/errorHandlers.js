const { validationResult } = require('express-validator');

// Middleware to handle validation errors
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

// Generic server error handler
const handleServerError = (res, error, message) => {
    console.error(error); // Log the full error for debugging
    res.status(500).json({ message: message || 'Internal Server Error' });
}
module.exports = {
    handleValidationErrors,
    handleServerError
}