import cors from "cors"
import 'dotenv/config'
import express from "express"
import connectCloudinary from "./config/cloudinary.js"
import connectDB from "./config/db.js"


const app = express()

const port = process.env.PORT || 4000
connectDB()
connectCloudinary()

app.use(express.json())

app.use(cors())


app.get("/", (req, res) => {

    res.send("API working")

})

app.listen(port, () => console.log("server started on PORT: " + port));