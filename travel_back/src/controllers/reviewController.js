
import Tour from "../models/Tour.js"
import Review from "../models/Review.js"


export const createReview = async (req, res) => {

    const { tourId, username, reviewText, rating } = req.body;
    const newReview = new Review(
        {
            tourId,
            username,
            reviewText,
            rating
        })

    try {
        const savedReview = await newReview.save()
        // //after creating a new review now update the review array
        await Tour.findByIdAndUpdate(tourId, {
            $push: { reviews: {
                reviewId : savedReview._id ,
                reviewRating : rating
            }}

        })
        res.status(200).json({ success: true, message: "review submited", data: savedReview })


    } catch (err) {
        res.status(500).json({ success: false, message: "failto submit", error: err.message })

    }
}

export const getAllReviews = async (req, res) => {
    try {
        const id = req.params.id;
        const allReviews = await Review.find({ tourId: id })

        res.status(200).json({ success: true, message: "successfully fetched reviews", data: allReviews })
    } catch (error) {
        res.status(500).json({ success: false, message: "fail to fetched", error: err.message })
    }
}