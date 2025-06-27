import mongoose from "mongoose";

const bannerScema = new mongoose.Schema({

    title: { type: String, required: true },
    imageUrl: { type: String, required: true },




});


const Banner = mongoose.model("Banner", bannerScema);

export default Banner;