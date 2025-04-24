import Tour from '../models/Tour.js'

//create tour
export const createTour = async (req, res) => {
    try {
        const newTour = new Tour({
            ...req.body,
            remainingSlots: req.body.maxGroupSize,
            reviews: []
        });
        console.log(newTour);
        const savedTour = await newTour.save();
        res.status(200).json({ success: true, message: "Successfully created", data: savedTour });
    }
    catch (error) {
        console.error("Error creating tour:", error);
        res.status(500).json({ success: false, message: "Failed to create tour. Please try again later." });
    }

}

//update tour 
export const updateTour = async (req, res) => {
    const id = req.params.id
    const { title, city, address, desc, maxGroupSize, bookedPersonCount, remainingSlots, availableDate, photo, pricePerDay, featured, reviews } = req.body;
    try {
        const updatedTour = await Tour.findByIdAndUpdate(
            id,
            {
                $set: {
                    title: title,
                    city: city,
                    address: address,
                    desc: desc,
                    maxGroupSize: maxGroupSize,
                    bookedPersonCount: bookedPersonCount,
                    remainingSlots: remainingSlots,
                    availableDate: availableDate,
                    photo: photo,
                    pricePerDay: pricePerDay,
                    featured: featured,
                    reviews: reviews
                }
            },
            {
                new: true
            });

        res.status(200).json({ success: true, message: "successfully updated", data: updatedTour });
    } catch (err) {
        res.status(500).json({ success: false, message: "fail to update" });
    }
};

//delete tour
export const deleteTour = async (req, res) => {
    const id = req.params.id
    try {
        await Tour.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: "successfully deleted" });
    } catch (err) {
        res.status(500).json({ success: false, message: "fail to delete" });
    }
};

//getsingletour
export const getSingleTour = async (req, res) => {
    const id = req.params.id
    try {
        const tour = await Tour.findById(id).populate("reviews");
        res.status(200).json({ success: true, message: "successfully ", data: tour });
    } catch (err) {
        res.status(404).json({ success: false, message: "not found" });
    }
};

//getall tour
export const getAllTour = async (req, res) => {
    const page = parseInt(req.query.page) || 0;
    try {
        const tours = await Tour.find({}).populate("reviews").skip(page * 8).limit(8)

        res.status(200).json({
            success: true,
            count: tours.length,
            message: "Successful",
            data: tours,
        })
    } catch (err) {
        res.status(404).json({ success: false, message: "not found" });

    }
};

export const adminPageTour = async (req, res) => {
    const page = parseInt(req.query.page);
    try {
        const tours = await Tour.find({}).populate("reviews").skip(page * 6).limit(6);

        res.status(200).json({
            success: true,
            count: tours.length,
            message: "Successful",
            data: tours,
        });
    } catch (err) {
        console.error("Error fetching tours:", err);
        res.status(404).json({ success: false, message: "Not found" });
    }
};



//get tour by search
export const getTourBySearch = async (req, res) => {
    const city = new RegExp(req.query.city, 'i'); // i=case insensitive
    const distance = parseInt(req.query.distance);
    const maxGroupSize = parseInt(req.query.maxGroupSize);

    try {
        // gte == greater than or equal to
        const tours = await Tour.find({
            city,
            distance: { $gte: distance },
            maxGroupSize: { $gte: maxGroupSize },
        }).populate("reviews")

        res.status(200).json({
            success: true,
            message: "Successful",
            data: tours,
        });
    } catch (error) {
        console.error(error);
        res.status(404).json({ success: false, message: "Not found" });
    }
};

//get feature tour
export const getFeaturetour = async (req, res) => {
    try {
        const tours = await Tour.find({ featured: true }).populate("reviews").limit(8);
        res.status(200).json({ success: true, message: "Successful", data: tours, })
    } catch (err) {
        res.status(404).json({ success: false, message: "not found" });

    }
};

//get tour count
export const getTourCount = async (req, res) => {
    try {
        const tourCount = await Tour.estimatedDocumentCount();
        res.status(200).json({
            success: true,
            data: tourCount
        })
    } catch (err) {
        res.status(500).json({ success: false, message: "fail to fetch" })

    }
}