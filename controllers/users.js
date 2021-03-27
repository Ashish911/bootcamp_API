const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const User = require('../models/User');

// Get all Users (GET METHOD) (/api/v1/auth/users)
// Private/Admin route
exports.getUsers = asyncHandler(async (req, res, next) => {
    
    res.status(200).json(res.advancedResults);
    
})

// Get single User (GET METHOD) (/api/v1/auth/users/:id)
// Private/Admin route
exports.getUser = asyncHandler(async (req, res, next) => {
    
    const user = await User.findById(req.params.id);

    res.status(200).json({
        success: true,
        data: user
    });

})

// Create User (POST METHOD) (/api/v1/auth/users/)
// Private/Admin route
exports.createUser = asyncHandler(async (req, res, next) => {
    
    const user = await User.create(req.body);

    res.status(201).json({
        success: true,
        data: user
    });

})

// Update User (PUT METHOD) (/api/v1/auth/users/:id)
// Private/Admin route
exports.updateUser = asyncHandler(async (req, res, next) => {
    
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });

    res.status(200).json({
        success: true,
        data: user
    });

})

// Delete User (DELETE METHOD) (/api/v1/auth/users/:id)
// Private/Admin route
exports.deleteUser = asyncHandler(async (req, res, next) => {
    
    await User.findByIdAndDelete(req.params.id);

    res.status(200).json({
        success: true,
        data: {}
    });

})
