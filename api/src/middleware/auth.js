const apiKeyAuth = (req, res, next) => {
    const apiKey = req.header('X-API-Key'); // Get API key from header

    if (!apiKey) {
        return res.status(401).json({ message: 'Unauthorized: API key missing' });
    }

    if (apiKey !== process.env.API_KEY) {
        return res.status(403).json({ message: 'Forbidden: Invalid API key' });
    }

    next(); // Proceed to the next middleware/route handler
};

module.exports = apiKeyAuth;