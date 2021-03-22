const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Bootcamp = require('../models/Bootcamp');

// All middleware functions require 3 parameters req, res and next.
// Get all bootcamps (GET METHOD) (/api/v1/bootcamps)
// Public route
exports.getBootcamps = asyncHandler(async (req, res, next) => {
    
    const bootcamp = await Bootcamp.find();

    res.status(200).json({
        success: true,
        count: bootcamps.length,
        data: bootcamp
    })
});

// Get a single bootcamp (GET METHOD) (/api/v1/bootcamps/:id)
// Public route
exports.getBootcamp = asyncHandler(async (req, res, next) => {

    const bootcamp = await Bootcamp.findById(req.params.id);

    if(!bootcamp) {
        return next(new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404));
    }

    res.status(200).json({
        success:true,
        data: bootcamp
    })

});

// Create a single bootcamp (POST METHOD) (/api/v1/bootcamps)
// Private route
exports.createBootcamp = asyncHandler(async (req, res, next) => {

    const bootcamp = await Bootcamp.create(req.body);

    res.status(201).json({
        success: true,
        data: bootcamp
    })

});

// Update a single bootcamp (PUT METHOD) (/api/v1/bootcamps/:id)
// Private route
exports.updateBootcamp = asyncHandler(async (req, res, next) => {
    
    const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });

    if(!bootcamp) {
        return next(new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404));
    }

    res.status(200).json({
        success: true,
        data: bootcamp
    })

})

// Delete a single bootcamp (DELETE METHOD) (/api/v1/bootcamps/:id)
// Private route
exports.deleteBootcamp = asyncHandler(async (req, res, next) => {

    const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id);

    if(!bootcamp) {
        return next(new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404));
    }

    res.status(200).json({
        success: true,
        data: "Bootcamp has been deleted."
    })

});