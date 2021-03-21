const Bootcamp = require('../models/Bootcamp');

// All middleware functions require 3 parameters req, res and next.
// Get all bootcamps (GET METHOD) (/api/v1/bootcamps)
// Public route
exports.getBootcamps = (req, res, next) => {
    res.status(200).json({ success: true, msg: 'Show all bootcamps' });
}

// Get a single bootcamp (GET METHOD) (/api/v1/bootcamps/:id)
// Public route
exports.getBootcamp = (req, res, next) => {
    res.status(200).json({ success: true, msg: `Show bootcamp ${req.params.id}`});
}

// Create a single bootcamp (POST METHOD) (/api/v1/bootcamps)
// Private route
exports.createBootcamp = async (req, res, next) => {
    
    try {
        const bootcamp = await Bootcamp.create(req.body);
    
        res.status(201).json({
            success: true,
            data: bootcamp
        })
    } catch (err) {
        res.status(400).json({
            success: false
        })
    }


}

// Update a single bootcamp (PUT METHOD) (/api/v1/bootcamps/:id)
// Private route
exports.updateBootcamp = (req, res, next) => {
    res.status(200).json({ success: true, msg: `Update bootcamp ${req.params.id}`});
}

// Delete a single bootcamp (DELETE METHOD) (/api/v1/bootcamps/:id)
// Private route
exports.deleteBootcamp = (req, res, next) => {
    res.status(200).json({ success: true, msg: `Delete bootcamp ${req.params.id}`});
}