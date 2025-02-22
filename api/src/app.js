require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
// const db = require('./models');
const apiKeyAuth = require('./middleware/auth');

// Import routes
const studentRoutes = require('./routes/students');
const professorRoutes = require('./routes/professors');
const classRoutes = require('./routes/classes');
const gymRoutes = require('./routes/gyms');
const checkinRoutes = require('./routes/checkins');

const app = express();

// --- Middleware ---

// Enable CORS for all origins (for development; configure more restrictively in production)
app.use(cors());

// Set various HTTP headers for security
app.use(helmet());

// Parse JSON request bodies
app.use(express.json());

// Parse URL-encoded request bodies
app.use(express.urlencoded({ extended: true }));

// Rate limiting (limit to 100 requests per 15 minutes per IP)
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100,
    message: 'Too many requests from this IP, please try again after 15 minutes',
});
app.use(limiter);

// API Key Authentication (for all routes)
app.use(apiKeyAuth);

// --- Routes ---
app.use('/api/students', studentRoutes);
app.use('/api/professors', professorRoutes);
app.use('/api/classes', classRoutes);
app.use('/api/gyms', gymRoutes);
app.use('/api/checkins', checkinRoutes);

// --- Error Handling (Catch-all) ---

// 404 Not Found Handler
app.use((req, res, next) => {
    res.status(404).json({ message: 'Not Found' });
});

// General Error Handler (must have 4 arguments)
app.use((err, req, res, next) => {
    console.error(err.stack); // Log error stack for debugging
    res.status(500).json({ message: 'Internal Server Error' });
});

// --- Start the Server ---

const PORT = process.env.PORT || 3000;

// db.sequelize.sync()  // Already handled inside models/index.js
//   .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
//   });