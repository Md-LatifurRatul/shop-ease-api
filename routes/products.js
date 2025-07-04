
import express from "express";
import streamifier from 'streamifier';
import cloudinary from "../config/cloudinary.js";
import Product from "../models/product.js";
import upload from "../multer.js";
const router = express.Router();




function streamUpload(buffer) {
    return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
            { folder: "shop_ease/products" },
            (error, result) => {
                if (result) resolve(result);
                else reject(error);
            }
        );
        streamifier.createReadStream(buffer).pipe(stream);
    });
};



router.post("/add", upload.single("image"), async (req, res) => {



    try {

        const { name, price, rating, description } = req.body;
        const file = req.file;
        if (!file) {
            return res.status(400).json({ message: "Please upload an image" });

        }

        const result = await streamUpload(req.file.buffer);

        const newProduct = new Product({
            name,
            price,
            rating,
            description,
            imageUrl: result.secure_url,


        });

        await newProduct.save();

        res.status(201).json({
            message: 'Product added successfully',
            product: newProduct,
        });


    } catch (err) {
        res.status(500).json({ error: err.message });
    }


});


router.get("/", async (req, res) => {

    try {

        const products = await Product.find();
        res.status(200).json(products);

    } catch (err) {
        res.status(500).json({ error: err.message });

    }


});

router.get("/:id", async (req, res) => {

    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json(product);

    } catch (err) {
        res.status(500).json({ error: err.message });

    }




});



router.put("/update/:id", upload.single("image"), async (req, res) => {


    try {

        const { name, price, rating, description } = req.body;
        const productId = req.params.id;


        const existingProduct = await Product.findById(productId);

        if (!existingProduct) {
            return res.status(404).json({ message: "Product not found" });
        }



        const updateData = {

            name: name || existingProduct.name,
            price: price || existingProduct.price,
            rating: rating || existingProduct.rating,
            description: description || existingProduct.description,


        };


        if (req.file) {

            const result = await streamUpload(req.file.buffer);
            updateData.imageUrl = result.secure_url;
        }



        const updatedProduct = await Product.findByIdAndUpdate(productId, updateData, { new: true, runValidators: true });

        res.status(200).json({
            message: 'Product updated successfully',
            product: updatedProduct,
        });



    } catch (err) {
        res.status(500).json({ error: err.message });


    }


})


router.delete("/delete/:id", async (req, res) => {

    try {

        const productId = req.params.id;
        const deletedProduct = await Product.findByIdAndDelete(productId);


        if (!deletedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }


        res.status(200).json({
            message: 'Product deleted successfully',
            product: deletedProduct,
        });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }



})




export default router;





