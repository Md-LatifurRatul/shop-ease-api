import express from "express";
import streamifier from 'streamifier';
import cloudinary from "../config/cloudinary.js";
import Banner from "../models/banner.js";
import upload from "../multer.js";

const router = express.Router();



function streamUpload(buffer) {
    return new Promise((resolve, reject) => {

        const stream = cloudinary.uploader.upload_stream(

            { folder: "shop_ease/banners" },
            (error, result) => {
                if (result) {
                    resolve(result);
                }
                else {
                    reject(error);
                }
            }

        );

        streamifier.createReadStream(buffer).pipe(stream);


    });



};


router.post("/add", upload.single("image"), async (req, res) => {
    try {

        const { title } = req.body;
        const file = req.file;

        if (!file) {

            return res.status(400).json({ message: 'Please upload an image.' });

        }


        const result = await streamUpload(file.buffer);

        const newBanner = new Banner({
            title,
            imageUrl: result.secure_url,
        });

        await newBanner.save();
        res.status(201).json({
            message: 'Banner added successfully',
            banner: newBanner,
        });


    } catch (err) {
        res.status(500).json({ error: err.message });

    }


});


router.get('/', async (req, res) => {
    try {
        const banners = await Banner.find();
        res.status(200).json(banners);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


// Route to get a specific banner by ID
router.get('/:id', async (req, res) => {
    try {
        const banner = await Banner.findById(req.params.id);
        if (!banner) {
            return res.status(404).json({ message: 'Banner not found' });
        }
        res.status(200).json(banner);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


router.put('/update/:id', upload.single('image'), async (req, res) => {
    try {
        const { title } = req.body;
        const bannerId = req.params.id;


        const existingBanner = await Banner.findById(bannerId);
        if (!existingBanner) {
            return res.status(404).json({ message: 'Banner not found' });
        }


        const updateData = {};
        if (title) updateData.title = title;


        if (req.file) {


            const result = await streamUpload(req.file.buffer);
            updateData.imageUrl = result.secure_url;
        }


        const updatedBanner = await Banner.findByIdAndUpdate(
            bannerId,
            updateData,
            { new: true, runValidators: true }
        );

        res.status(200).json({
            message: 'Banner updated successfully',
            banner: updatedBanner,
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.delete('/delete/:id', async (req, res) => {
    try {
        const bannerId = req.params.id;
        const deletedBanner = await Banner.findByIdAndDelete(bannerId);

        if (!deletedBanner) {
            return res.status(404).json({ message: 'Banner not found' });
        }

        res.status(200).json({
            message: 'Banner deleted successfully',
            banner: deletedBanner,
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});



export default router;






