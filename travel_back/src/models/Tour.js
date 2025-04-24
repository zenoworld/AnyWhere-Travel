import mongoose from "mongoose";

const tourSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    city: { type: String, required: true },
    address: { type: String, required: true },
    desc: { type: String, required: true },
    maxGroupSize: { type: Number, required: true },
    bookedPersonCount:{type:Number,default:0},
    remainingSlots:{type:Number,default:0},
    availableDate: { type: String, required: true },
    pricePerDay: { type: Number, required: true },
    photo: { type: String, required: true },
    featured: { type: Boolean, default: false },
    reviews: { type: Array, default: [] },
  },
  { timestamps: true }
);

export default mongoose.model("Tour", tourSchema);
