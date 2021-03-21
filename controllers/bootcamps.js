const Bootcamp = require('../models/Bootcamp');

// All middleware functions require 3 parameters req, res and next.
// Get all bootcamps (GET METHOD) (/api/v1/bootcamps)
// Public route
exports.getBootcamps = async (req, res, next) => {
    
    try {
        const bootcamp = await Bootcamp.find();

        res.status(200).json({
            success: true,
            count: bootcamps.length,
            data: bootcamp
        })
    } catch (err) {
        res.status(400).json({
            success: false
        })
    }

}

// Get a single bootcamp (GET METHOD) (/api/v1/bootcamps/:id)
// Public route
exports.getBootcamp = async (req, res, next) => {

    try {
        const bootcamp = await Bootcamp.findById(req.params.id);

        if(!bootcamp) {
            return res.status(400).json({
                success: false
            })
        }

        res.status(200).json({
            success:true,
            data: bootcamp
        })
    } catch (err) {
        res.status(400).json({
            success: false
        })
    }

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
exports.updateBootcamp = async (req, res, next) => {
    
    try {

        const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
    
        if(!bootcamp) {
            return res.status(400).json({
                success: false
            });
        }
    
        res.status(200).json({
            success: true,
            data: bootcamp
        })
        
    } catch (err) {
        res.status(400).json({
            success: false
        });
    }

}

// Delete a single bootcamp (DELETE METHOD) (/api/v1/bootcamps/:id)
// Private route
exports.deleteBootcamp = async (req, res, next) => {
    
    try {

        const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id);
    
        if(!bootcamp) {
            return res.status(400).json({
                success: false
            });
        }
    
        res.status(200).json({
            success: true,
            data: "Bootcamp has been deleted."
        })
        
    } catch (err) {
        res.status(400).json({
            success: false
        });
    }
    
}