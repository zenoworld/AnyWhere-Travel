import mongoose from "mongoose";
 import { DB_NAME } from "../constants.js";

const connectDb = async ()=> {
    try {
        await mongoose.connect(`${process.env.MONGO_URI}`) ;
        console.log(`MONGODB CONNECTED!! HOST IS : ${DB_NAME}`);    
    } 
    catch (error) {
        console.log("MONGODB NOT CONNECTED : " , error);
        process.exit(1) 
    }
} 
export default connectDb