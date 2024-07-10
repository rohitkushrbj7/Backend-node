import express from "express";
import cors from "cors";
import cookieParser from 'cookie-parser';   


const app =  express()

app.use(cors ({
    origin: process.env.CORS_ORIGIN,
    credentials: true,

}))

//settings for data it can json strin or anything 
app.use(express.json({limit:"16kb"}))  // does not required body parser
app.use(express.urlencoded({extended: true, limit:"16kb"})) //to encode url on browser
app.use(express.static("public"))
app.use(cookieParser())

// routes imports

import userRouter from './routes/user.routes.js'


//router declaration
app.use("/api/v1/user", userRouter)

//example  : localhost:8000/user/register

export {app}