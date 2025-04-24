import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors'
const app = express()

// app.use(express.urlencoded({extended:true,limit:"16kb"}))
// app.use(express.static("public"))


//import routes
import tourRouter from './routes/tour.js'
import reviewRouter from './routes/reviews.js'
import bookingRouter from './routes/bookings.js'
import userRouter from './routes/users.js'

app.use(express.json()) //set the limit of the json type data
app.use(cookieParser())
app.use(cors({
    origin:true,
    credentials:true
}))

//routes declaration
app.use('/api/v1/tour',tourRouter)
app.use('/api/v1/review',reviewRouter)
app.use('/api/v1/booking',bookingRouter)
app.use('/api/v1/user',userRouter)


export {app}