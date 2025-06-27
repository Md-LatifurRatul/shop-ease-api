import cors from "cors"
import 'dotenv'
import express from "express"


const app = express()

const port = process.env.PORT || 4000

app.use(express.json())

app.use(cors())


app.get("/", (req, res)=>{

res.send("API working")

})

app.listen(port, ()=> console.log("server started on PORT: "+port));