import cors from "cors";
import 'dotenv';
import { configDotenv } from "dotenv";
import express from "express";
import connectDB from "./config/db.js";
import bannerRoutes from './routes/banners.js';
import productRoutes from './routes/products.js';

configDotenv();

const app = express();
const port = process.env.PORT || 4000;


connectDB();

// Middleware
app.use(express.json());  // Parse incoming JSON requests
app.use(cors());

// Routes
app.use('/api/products', productRoutes);  // Product routes
app.use('/api/banners', bannerRoutes);    // Banner routes

// Default route
app.get('/', (req, res) => {
    res.send('API working');
});

// Start server
app.listen(port, () => {
    console.log(`Server started on PORT: ${port}`);
});
