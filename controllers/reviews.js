const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Review = require('../models/Review');
const Bootcamp = require('../models/Bootcamp');

// Get reviews (GET METHOD) (/api/v1/reviews) (/api/v1/bootcamps/:bootcampId/reviews)
// Public route

exports.getReviews = asyncHandler(async (req, res, next) => {

    if(req.params.bootcampId) {
        const reviews = await Review.find({ bootcamp: req.params.bootcampId });
    
        return res.status(200).json({
            success: true,
            count: reviews.length,
            data: reviews
        })
    } else {
        res.status(200).json(res.advancedResults);
    }

})