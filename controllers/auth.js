const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const User = require('../models/User');

// Register User (POST METHOD) (/api/v1/auth/register)
// Public route
exports.register = asyncHandler(async (req, res, next) => {
    res.status(200).json({
        success: true
    })
})