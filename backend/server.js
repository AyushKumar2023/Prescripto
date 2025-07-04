import express, { application } from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js'
import connetCloudinary from './config/cloudinary.js'
import adminRouter from './routes/adminRoute.js'
import doctorRouter from './routes/doctorRoute.js'
import userRouter from './routes/userRoute.js'

// app config
const app=express()
const port=process.env.PORT || 4000
connectDB()
connetCloudinary()

// middleware
app.use(express.json())
app.use(cors())

// api endpoints
app.use('/api/admin', adminRouter)
app.use('/api/doctor', doctorRouter)
app.use('/api/user', userRouter)

app.get("/", (req,res)=>{
    res.send("API working fine")
})

app.listen(port, ()=>{
    console.log("Server started", port);
    
})