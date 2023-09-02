import express from "express";
import { PORT, mongoDbUrl } from "./config.js"
import mongoose from "mongoose";
import BooksRoute from './routes/Booksroute.js'
import cors from "cors"
const app = express()

app.use(express.json())
app.use(cors())
// app.use(cors({
//     origin: "http://localhost:3000",
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     allowedHeaders: ["Content-Type"]
// }))
app.use('/books', BooksRoute)

app.get('/', (req, res) => {
    return res.status(200).send("WELCOME TO MERN STACK BOOK ")
})



mongoose.connect(mongoDbUrl).then(() => {
    console.log("MongoDB Connected")
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`)
    })
}).catch((err) => {
    console.log(err)
})