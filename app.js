const express = require("express")
const dotenv = require("dotenv");
const {connectDB} = require("./database/connection");

dotenv.config();

const app = express()
const PORT = process.env.PORT || 3000
connectDB()

app.use(express.json())

app.get('/api/new', (req,res)=>{
    console.log(req)
    res.send(req.baseUrl)
})

app.listen(PORT, ()=>{
    console.log(`App is running on port : ${PORT}`)
})