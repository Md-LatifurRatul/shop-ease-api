# Shop-Ease Backend API

A custom Node.js REST API backend for the **Shop-Ease e-commerce platform**. Handles **Products** and **Banners** management with full CRUD operations, image uploads via Cloudinary, and database management using MongoDB.

---

## Features
- REST API endpoints for **Products** and **Banners**  
- Full **CRUD operations** with proper error handling  
- **Image uploads** using `multer` + Cloudinary  
- Database management with **MongoDB** via Mongoose  
- Environment configuration using `.env`  

---

## Tech Stack
- **Backend:** Node.js, Express.js  
- **Database:** MongoDB  
- **Cloud Storage:** Cloudinary  
- **File Upload:** Multer  
- **Environment Management:** dotenv  
- **Other:** Streamifier, Async/Await  

---

## API Endpoints

### Banners
- `POST /api/banners/add` → Add new banner (title + image)  
- `GET /api/banners/` → Get all banners  
- `GET /api/banners/:id` → Get banner by ID  
- `PUT /api/banners/update/:id` → Update banner (title/image)  
- `DELETE /api/banners/delete/:id` → Delete banner  

### Products
- `POST /api/products/add` → Add new product (name, price, rating, description, image)  
- `GET /api/products/` → Get all products  
- `GET /api/products/:id` → Get product by ID  
- `PUT /api/products/update/:id` → Update product (details/image)  
- `DELETE /api/products/delete/:id` → Delete product  

---

### Project Structure
```
├── config/
│   ├── cloudinary.js      # Cloudinary configuration
│   └── db.js              # MongoDB connection
├── models/
│   ├── product.js         # Product schema
│   └── banner.js          # Banner schema
├── routes/
│   ├── products.js        # Product routes (CRUD + Cloudinary)
│   └── banners.js         # Banner routes (CRUD + Cloudinary)
├── multer.js              # Multer file upload setup
├── server.js              # Entry point
└── package.json


```


## Getting Started

```bash
1. Install dependencies: npm install
2. Create a .env file and add your environment variables:
PORT=4000
MONGO_URI=your_mongo_uri
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
3. Start the server: npm start



