const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const User = require('../models/User');

// Register User (POST METHOD) (/api/v1/auth/register)
// Public route
exports.register = asyncHandler(async (req, res, next) => {
    
    const { name, email, password, role } = req.body;

    // Create User
    const user = await User.create({
        name,
        email,
        password,
        role
    });

    sendTokenResponse(user, 200, res);

})

// Login User (POST METHOD) (/api/v1/auth/login)
// Public route
exports.login = asyncHandler(async (req, res, next) => {
    
    const { email, password } = req.body;

    // Validate Email & password
    if(!email || !password) {
        return next(new ErrorResponse('Please provide an email and password', 400));
    }

    // Check for user
    const user = await User.findOne({ email }).select('+password');

    if(!user) {
        return next(new ErrorResponse('Invalid Credentials', 401));
    }

    // Check if password matches
    const isMatch = await user.matchPassword(password);

    if(!isMatch){
        return next(new ErrorResponse('Invalid Credentials', 401));
    }

    sendTokenResponse(user, 200, res);

})

// Get current logged in User (GET METHOD) (/api/v1/auth/me)
// Private route
exports.getMe = asyncHandler(async (req, res, next) => {
    const user = await User.findById(req.user.id);

    res.status(200).json({
        success: true,
        data: user
    })
})

// Forgot Password (POST METHOD) (/api/v1/auth/forgotpassword)
// Public route
exports.forgotPassword = asyncHandler(async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email });

    if(!user) {
        return next(new ErrorResponse(`No user found with email ${req.body.email}`, 404));
    }

    // Get reset token
    const resetToken = user.getResetPasswordToken();

    await user.save({ validateBeforeSave: false});

    res.status(200).json({
        success: true,
        data: user
    })
})

// Get token from model, create cookie and send response
const sendTokenResponse = (user, statusCode, res) => {

    // Create token 
    const token = user.getSignedJwtToken();

    const options = {
        expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000 ),
        httpOnly: true
    };

    if(process.env.NODE_ENV === 'production') {
        options.secure = true
    }

    res
        .status(statusCode)
        .cookie('token', token, options)
        .json({ 
            success: true,
            token
        });
}